import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PositionMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    name: z.literal(true).optional(),
    registeredAt: z.literal(true).optional(),
  })
  .strict();

export const PositionMinAggregateInputObjectSchema = Schema;
