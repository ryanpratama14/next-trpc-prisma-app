import { z } from "zod";

export class schema {
  static user = class {
    static list = z.object({
      page: z.number().min(1),
      limit: z.number().min(1),
      search: z.string().optional(),
    });

    static mutation = z.object({
      name: z.string().min(4),
      email: z.string().email(),
    });

    static detail = z.object({
      userId: z.number(),
    });
  };
}
