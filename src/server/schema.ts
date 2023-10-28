import { z } from "zod";

export class schema {
  static getUser = z.object({
    page: z.number().min(1),
    limit: z.number().min(1),
    search: z.string().optional(),
  });

  static putUser = z.object({
    name: z.string().min(4),
    email: z.string().email(),
  });
}

export type getUserType = z.infer<typeof schema.getUser>;