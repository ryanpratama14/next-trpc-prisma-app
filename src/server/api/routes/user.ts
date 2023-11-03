import { TRPCError } from "@trpc/server";
import { privateProcedure, publicProcedure, router } from "@/server/trpc";
import { db } from "#/prisma/client";
import { schema } from "@/server/schema";
import {
  generateEndDate,
  generateNewDate,
  generateStartDate,
} from "@/lib/utils";
import { MESSAGES_LIST } from "@/server/helper";
import { RouterInput, RouterOutput } from "..";

const getUserById = async (id: number) => {
  const data = await db.user.findUnique({
    where: {
      id,
    },
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
  create: publicProcedure
    .input(schema.user.create)
    .mutation(async ({ input }) => {
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
    const limit = input.limit ?? 1;
    const page = input.page ?? 1;

    const pagination = {
      skip: (page - 1) * limit,
      take: limit,
    };

    const optionalQueries = {
      include: {
        position: true,
      },
      where: {
        name: {
          contains: input?.params?.name,
        },
        isActive: input?.params?.isActive,
        registeredAt: {
          gte:
            input.params?.registeredAt &&
            generateStartDate(input.params.registeredAt),
          lte:
            input?.params?.registeredAt &&
            generateEndDate(input.params.registeredAt),
        },
        email: {
          contains: input?.params?.email,
        },
        followers: {
          gte: input?.params?.followers,
        },
        position: {
          name: {
            contains: input?.params?.positionName,
          },
        },
      },
    };

    const data = await db.user.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      ...pagination,
      ...optionalQueries,
    });

    const totalData = (
      await db.user.findMany({
        ...optionalQueries,
      })
    ).length;

    const totalPages = Math.ceil(totalData / limit) || 1;

    return {
      data,
      limit,
      page,
      totalData,
      totalPages,
    };
  }),

  detailPrivate: privateProcedure
    .input(schema.user.detail)
    .query(async (opts) => {
      return getUserById(opts.input.id);
    }),

  detail: publicProcedure.input(schema.user.detail).query(async ({ input }) => {
    return getUserById(input.id);
  }),

  update: publicProcedure
    .input(schema.user.update)
    .mutation(async ({ input }) => {
      const { id, body } = input;
      await getUserById(id);
      const updatedData = await db.user.update({
        where: {
          id,
        },
        data: {
          name: body.name,
          email: body.email,
          positionId: body.positionId,
          updatedAt: generateNewDate(),
        },
      });

      return updatedData;
    }),

  delete: publicProcedure
    .input(schema.user.detail)
    .mutation(async ({ input }) => {
      await getUserById(input.id);
      await db.user.delete({
        where: {
          id: input.id,
        },
      });

      return {
        message: MESSAGES_LIST["DELETED"],
      };
    }),
});

export type UserRouter = typeof userRouter;
export type UserList = RouterOutput["user"]["list"];
export type UserListInput = RouterInput["user"]["list"];
