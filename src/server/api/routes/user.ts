import { privateProcedure, publicProcedure, router } from "@/server/api/trpc";
import { db } from "#/prisma/client";
import { schema } from "@/server/schema/schema";
import { getEndDate, getNewDate, getStartDate } from "@/lib/utils";
import {
  MESSAGES_LIST,
  getPagination,
  getPaginationData,
  prismaExclude,
  RouterInputs,
  RouterOutputs,
  throwNotFoundError,
  throwDataExistsError,
} from "@/server/helper";

const getUserById = async (id: number) => {
  const data = await db.user.findUnique({
    where: { id },
    include: { position: true },
  });
  throwNotFoundError(data);
  return data;
};

export const userRouter = router({
  create: publicProcedure.input(schema.user.create).mutation(async ({ input }) => {
    const data = await db.user.findUnique({ where: { email: input.email } });
    throwDataExistsError(data);

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
        name: { contains: params?.name },
        isActive: params?.isActive,
        registeredAt: {
          gte: params?.registeredAt && getStartDate(params.registeredAt),
          lte: params?.registeredAt && getEndDate(params.registeredAt),
        },
        email: { contains: params?.email },
        followers: { gte: params?.followers },
        position: { name: { contains: params?.positionName } },
      },
    };

    const orderBy = sorting?.length ? sorting.map((item) => item.value) : [];
    orderBy.push({ updatedAt: "desc" });

    const [data, totalData] = await db.$transaction([
      db.user.findMany({
        orderBy,
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
      ...getPaginationData(totalData, pagination.limit, pagination.page),
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
        registeredAt: getNewDate(body.registeredAt),
        updatedAt: getNewDate(),
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
