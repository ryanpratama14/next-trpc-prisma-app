import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "@/server/trpc";
import { db } from "#/prisma/client";
import { schema } from "@/server/schema";

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
          message: "User already exists",
        });
      }

      const newData = await db.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });

      return newData;
    }),

  list: publicProcedure.input(schema.user.list).query(async ({ input }) => {
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
        positionId: input?.params.positionId,
      },
    };

    const data = await db.user.findMany({
      ...pagination,
      ...optionalQueries,
      include: {
        position: true,
      },
    });

    const totalData = (
      await db.user.findMany({
        ...optionalQueries,
      })
    ).length;

    const totalPage = Math.ceil(totalData / limit) || 1;

    return {
      data,
      limit,
      page,
      totalData,
      totalPage,
    };
  }),

  detail: publicProcedure.input(schema.user.detail).query(async ({ input }) => {
    const data = await db.user.findUnique({
      where: {
        id: input.id,
      },
      include: {
        position: true,
      },
    });

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return data;
  }),

  update: publicProcedure
    .input(schema.user.update)
    .mutation(async ({ input }) => {
      const { id, body } = input;
      const data = await db.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const updatedData = await db.user.update({
        where: {
          id: id,
        },
        data: {
          name: body.name,
          email: body.email,
        },
      });

      return updatedData;
    }),

  delete: publicProcedure
    .input(schema.user.detail)
    .mutation(async ({ input }) => {
      const user = await db.user.findUnique({
        where: {
          id: input.id,
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
          id: input.id,
        },
      });

      return {
        message: `User has been deleted`,
      };
    }),
});

export type UserRouter = typeof userRouter;
