import { db } from "#/prisma/client";
import { MESSAGES_LIST } from "@/server/helper";
import { schema } from "@/server/schema";
import { publicProcedure, router } from "@/server/trpc";
import { TRPCError } from "@trpc/server";

const getPositionById = async (id: number) => {
  const data = await db.position.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: MESSAGES_LIST["NOT_FOUND"],
    });
  }

  return data;
};

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
          message: MESSAGES_LIST["ALREADY_EXISTS"],
        });
      }

      const newData = await db.position.create({
        data: {
          name: input.name,
        },
      });

      return newData;
    }),

  list: publicProcedure.query(async () => {
    return await db.position.findMany();
  }),

  update: publicProcedure
    .input(schema.position.update)
    .mutation(async ({ input }) => {
      await getPositionById(input.id);
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
      await getPositionById(input.id);
      await db.position.delete({
        where: {
          id: input.id,
        },
      });

      return {
        message: MESSAGES_LIST["DELETED"],
      };
    }),
});

export type PositionRouter = typeof positionRouter;
