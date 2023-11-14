import { db } from "#/prisma/client";
import {
  MESSAGES_LIST,
  prismaExclude,
  throwDataExistsError,
  throwNotFoundError,
} from "@/server/helper";
import { schema } from "@/server/schema/schema";
import { publicProcedure, router } from "@/server/api/trpc";

const getPositionById = async (id: number) => {
  const data = await db.position.findUnique({
    where: { id },
    select: prismaExclude("Position", ["registeredAt", "id"]),
  });

  throwNotFoundError(data);
  return data;
};

export const positionRouter = router({
  create: publicProcedure.input(schema.position.create).mutation(async ({ input }) => {
    const data = await db.position.findUnique({
      where: { name: input.name },
    });
    throwDataExistsError(data);
    const newData = await db.position.create({
      data: { name: input.name },
    });

    return newData;
  }),

  list: publicProcedure.query(async () => {
    return await db.position.findMany({
      select: prismaExclude("Position", ["registeredAt"]),
      orderBy: { name: "asc" },
    });
  }),

  detail: publicProcedure.input(schema.position.detail).query(async ({ input }) => {
    return await getPositionById(input.id);
  }),

  update: publicProcedure.input(schema.position.update).mutation(async ({ input }) => {
    await getPositionById(input.id);
    const updatedData = await db.position.update({
      where: { id: input.id },
      data: { name: input.body.name },
    });

    return updatedData;
  }),

  delete: publicProcedure.input(schema.position.detail).mutation(async ({ input }) => {
    await getPositionById(input.id);
    await db.position.delete({
      where: { id: input.id },
    });

    return {
      message: MESSAGES_LIST["DELETED"],
    };
  }),
});

export type PositionRouter = typeof positionRouter;
