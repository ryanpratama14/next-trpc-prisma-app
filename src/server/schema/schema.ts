import { z } from "zod";
import { getEnumKeys } from "@/server/helper";
import { UserModel } from "@/server/schema/generated/zod-prisma";

const pagination = z.object({
  page: z.number().min(1),
  limit: z.number().min(1).optional(),
});

const order = z.enum(["asc", "desc"]).optional();

export class schema {
  static user = class {
    static sorting = z.array(
      z.object({
        title: z.string(),
        slug: z.string(),
        value: z.object({
          name: order,
          email: order,
          registeredAt: order,
          updatedAt: order,
          position: z
            .object({
              name: order,
            })
            .optional(),
        }),
      }),
    );

    static list = z.object({
      pagination,
      sorting: this.sorting,
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
export type SortBy = z.infer<typeof user.sorting>;
export const UserKeys = getEnumKeys(UserModel.shape);
