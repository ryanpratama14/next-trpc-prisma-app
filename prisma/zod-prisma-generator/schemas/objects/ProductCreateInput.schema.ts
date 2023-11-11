import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.ProductCreateInput> = z
  .object({
    name: z.string(),
    price: z.number().optional(),
    registeredAt: z.coerce.date().optional(),
  })
  .strict();

export const ProductCreateInputObjectSchema = Schema;
