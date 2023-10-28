import { TRPCError } from "@trpc/server";
import { db } from "../../prisma/client";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { schema } from "./schema";

export const appRouter = router({
  getUsers: publicProcedure.query(async ({ input }) => {
    const res = await db.user.findMany();
    if (!res) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Not found",
      });
    }

    return res;
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
