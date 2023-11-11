import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.ProductUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    price: z.number().optional(),
    registeredAt: z.coerce.date().optional(),
  })
  .strict();

export const ProductUncheckedCreateInputObjectSchema = Schema;
