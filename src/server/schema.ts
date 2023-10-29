import { z } from "zod";

export class schema {
  static user = class {
    static list = z
      .object({
        params: z.object({
          page: z.number().min(1),
          limit: z.number().min(1),
          search: z.string().optional(),
        }),
      })
      .optional();

    static create = z.object({
      name: z.string().min(4),
      email: z.string().email(),
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
