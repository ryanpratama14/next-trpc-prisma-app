import { z } from "zod";
import { getZodEnum } from "@/server/helper";
import { UserModel } from "#/prisma/zod";

export const pagination = z.object({
  page: z.number().min(1),
  limit: z.number().min(1).optional(),
});

export const sorting = <K extends string>(obj: Record<K, unknown>) => {
  return z
    .object({
      sortBy: z.enum(["asc", "desc"]).optional(),
      orderBy: getZodEnum(obj).optional(),
    })
    .optional()
    .refine(
      (value) => {
        const hasSortBy = value?.sortBy !== undefined;
        const hasOrderBy = value?.orderBy !== undefined;
        return !(hasSortBy !== hasOrderBy);
      },
      {
        message: "Both sortBy and orderBy must be provided together or left empty.",
        path: ["sortBy", "orderBy"],
      },
    );
};

export class schema {
  static user = class {
    static list = z.object({
      pagination,
      sorting: sorting(UserModel.shape),
      params: z
        .object({
          id: z.number().int().optional(),
          email: z.string().optional(),
          name: z.string().optional(),
          followers: z.number().int().optional(),
          isActive: z.boolean().optional(),
          registeredAt: z.string().optional(),
          positionName: z.string().optional(),
        })
        .optional(),
    });

    static create = z.object({
      name: z.string().min(4),
      email: z.string().email(),
      positionId: z.number().nullish(),
      registeredAt: z.string(),
    });

    static detail = z.object({
      id: z.number(),
    });

    static update = z.object({
      id: this.detail.shape.id,
      body: this.create,
    });
  };

  static position = class {
    static list = z
      .object({
        params: z.object({
          search: z.string().optional(),
        }),
      })
      .optional();

    static create = z.object({
      name: z.string().min(1),
    });

    static detail = z.object({
      id: z.number(),
    });

    static update = z.object({
      id: this.detail.shape.id,
      body: this.create,
    });
  };
}

const { user, position } = schema;

export type TPagination = z.infer<typeof pagination>;
export type UserType = z.infer<typeof user.create>;
export type PositionType = z.infer<typeof position.create>;
