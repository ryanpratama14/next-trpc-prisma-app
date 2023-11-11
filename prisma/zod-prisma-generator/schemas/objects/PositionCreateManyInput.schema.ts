import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PositionCreateManyInput> = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    registeredAt: z.coerce.date().optional(),
  })
  .strict();

export const PositionCreateManyInputObjectSchema = Schema;
