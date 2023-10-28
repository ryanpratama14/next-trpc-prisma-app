import { TRPCError } from "@trpc/server";
import { db } from "../../prisma/client";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { schema } from "./schema";

export const appRouter = router({
  getUsers: publicProcedure
    .input(
      z
        .object({
          params: z.object({
            page: z.number().min(1),
            limit: z.number().min(1),
          }),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const limit = input?.params.limit ?? 1;
      const page = input?.params.page ?? 1;

      const res = await db.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });

      if (!res.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Not found",
        });
      }

      const totalData = await db.user.findMany();

      return {
        data: res,
        totalData: totalData.length,
        limit: limit,
        page: page,
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
