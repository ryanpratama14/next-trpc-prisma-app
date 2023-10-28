import { z } from "zod";

export class schema {
  static putUser = z.object({
    name: z.string().min(4),
    email: z.string().email(),
  });
}
