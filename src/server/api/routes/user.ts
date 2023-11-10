import { TRPCError } from "@trpc/server";
import { privateProcedure, publicProcedure, router } from "@/server/api/trpc";
import { db } from "#/prisma/client";
import { schema } from "@/server/schema";
import { generateEndDate, generateNewDate, generateStartDate } from "@/lib/utils";
import {
  MESSAGES_LIST,
  getPagination,
  getPaginationData,
  prismaExclude,
  RouterInputs,
  RouterOutputs,
} from "@/server/helper";

const getUserById = async (id: number) => {
  const data = await db.user.findUnique({
    where: { id },
    include: {
      position: true,
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

export const userRouter = router({
  create: publicProcedure.input(schema.user.create).mutation(async ({ input }) => {
    const isExist = await db.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (isExist) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: MESSAGES_LIST["ALREADY_EXISTS"],
      });
    }

    const newData = await db.user.create({
      data: {
        name: input.name,
        email: input.email,
        positionId: input.positionId,
      },
    });

    return newData;
  }),

  list: publicProcedure.input(schema.user.list).query(async ({ input }) => {
    const { pagination, params, sorting } = input;
    const optionalQueries = {
      where: {
        name: {
          contains: params?.name,
        },
        isActive: params?.isActive,
        registeredAt: {
          gte: params?.registeredAt && generateStartDate(params.registeredAt),
          lte: params?.registeredAt && generateEndDate(params.registeredAt),
        },
        email: {
          contains: params?.email,
        },
        followers: {
          gte: params?.followers,
        },
        position: {
          name: {
            contains: params?.positionName,
          },
        },
      },
    };

    const [data, totalData] = await db.$transaction([
      db.user.findMany({
        orderBy: [sorting?.orderBy ? { [sorting.orderBy]: sorting.sortBy } : { updatedAt: "desc" }],
        select: {
          ...prismaExclude("User", ["positionId", "registeredAt"]),
          position: {
            select: prismaExclude("Position", ["registeredAt", "id"]),
          },
        },
        ...getPagination(pagination),
        ...optionalQueries,
      }),
      db.user.count(optionalQueries),
    ]);

    return {
      data,
      ...pagination,
      ...getPaginationData(totalData, pagination.limit),
    };
  }),

  detailPrivate: privateProcedure.input(schema.user.detail).query(async ({ input }) => {
    return getUserById(input.id);
  }),

  detail: publicProcedure.input(schema.user.detail).query(async ({ input }) => {
    return getUserById(input.id);
  }),

  update: publicProcedure.input(schema.user.update).mutation(async ({ input }) => {
    const { id, body } = input;
    await getUserById(id);
    const updatedData = await db.user.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        positionId: body.positionId,
        registeredAt: generateNewDate(body.registeredAt),
        updatedAt: generateNewDate(),
      },
    });
    return updatedData;
  }),

  delete: publicProcedure.input(schema.user.detail).mutation(async ({ input }) => {
    await getUserById(input.id);
    await db.user.delete({
      where: { id: input.id },
    });

    return {
      message: MESSAGES_LIST["DELETED"],
    };
  }),
});

export type UserRouter = typeof userRouter;
export type UserList = RouterOutputs["user"]["list"]["data"];
export type UserListInput = RouterInputs["user"]["list"];
