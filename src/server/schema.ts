import { z } from "zod";
import { pagination, sorting } from "@/server/helper";
import { UserModel } from "#/prisma/zod";

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

export type UserType = z.infer<typeof user.create>;
export type PositionType = z.infer<typeof position.create>;
