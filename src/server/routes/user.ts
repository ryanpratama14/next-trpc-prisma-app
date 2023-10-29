import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "@/server/trpc";
import { db } from "#/prisma/client";
import { z } from "zod";
import { schema } from "@/server/schema";

export const userRouter = router({
  create: publicProcedure
    .input(schema.user.mutation)
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

  list: publicProcedure
    .input(
      z
        .object({
          params: schema.user.list,
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

  detail: publicProcedure.input(schema.user.detail).query(async ({ input }) => {
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

  update: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        body: schema.user.mutation,
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

  delete: publicProcedure
    .input(schema.user.detail)
    .mutation(async ({ input }) => {
      const user = await db.user.findUnique({
        where: {
          id: input.userId,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      await db.user.delete({
        where: {
          id: input.userId,
        },
      });

      return {
        message: `"${user.name}" has been deleted`,
      };
    }),
});

export type UserRouter = typeof userRouter;
