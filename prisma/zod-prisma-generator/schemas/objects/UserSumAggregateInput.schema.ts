import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserSumAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    followers: z.literal(true).optional(),
    positionId: z.literal(true).optional(),
  })
  .strict();

export const UserSumAggregateInputObjectSchema = Schema;
