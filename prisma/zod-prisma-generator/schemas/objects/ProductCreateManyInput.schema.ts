import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.ProductCreateManyInput> = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    price: z.number().optional(),
    registeredAt: z.coerce.date().optional(),
  })
  .strict();

export const ProductCreateManyInputObjectSchema = Schema;
