import { db } from "#/prisma/client";
import { schema } from "@/server/schema";
import { publicProcedure, router } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const positionRouter = router({
  create: publicProcedure
    .input(schema.position.create)
    .mutation(async ({ input }) => {
      const isExist = await db.position.findUnique({
        where: {
          name: input.name,
        },
      });
      if (isExist) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Position already exists",
        });
      }

      const newData = await db.position.create({
        data: {
          name: input.name,
        },
      });

      return newData;
    }),

  update: publicProcedure
    .input(schema.position.update)
    .mutation(async ({ input }) => {
      const data = await db.position.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const updatedData = await db.position.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.body.name,
        },
      });

      return updatedData;
    }),

  delete: publicProcedure
    .input(schema.position.detail)
    .mutation(async ({ input }) => {
      const isExist = await db.position.findUnique({
        where: {
          id: input.id,
        },
      });
      if (isExist) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Position not found",
        });
      }

      await db.position.delete({
        where: {
          id: input.id,
        },
      });

      return {
        message: `Position has been deleted`,
      };
    }),
});
