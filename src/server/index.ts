import { TRPCError } from "@trpc/server";
import { db } from "../../prisma/client";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { schema } from "./schema";

export const appRouter = router({
  createUser: publicProcedure
    .input(schema.putUser)
    .mutation(async ({ input }) => {
      const isUserExists = await db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (isUserExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });
      }

      const newUser = await db.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });

      return newUser;
    }),

  getUsers: publicProcedure
    .input(
      z
        .object({
          params: schema.getUser,
        })
        .optional()
    )
    .query(async ({ input }) => {
      const limit = input?.params.limit ?? 1;
      const page = input?.params.page ?? 1;

      const pagination = {
        skip: (page - 1) * limit,
        take: limit,
      };

      const optionalQueries = {
        where: {
          name: {
            contains: input?.params.search,
          },
        },
      };

      const res = await db.user.findMany({
        ...pagination,
        ...optionalQueries,
      });

      const totalData = (
        await db.user.findMany({
          ...optionalQueries,
        })
      ).length;

      return {
        data: res,
        limit: limit,
        page: page,
        totalData: totalData,
        totalPage: Math.ceil(totalData / limit) || 1,
      };
    }),

  getUserById: publicProcedure
    .input(
      z.object({
        userId: z.number().min(1).max(10),
      })
    )
    .query(async ({ input }) => {
      const res = await db.user.findUnique({
        where: {
          id: input.userId,
        },
      });

      if (!res) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return res;
    }),

  putUserById: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        body: schema.putUser,
      })
    )
    .mutation(async ({ input }) => {
      const { userId, body } = input;
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const updatedUser = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          name: body.name,
          email: body.email,
        },
      });

      return updatedUser;
    }),
});

export type AppRouter = typeof appRouter;
