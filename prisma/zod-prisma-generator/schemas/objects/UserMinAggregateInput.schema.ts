import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    email: z.literal(true).optional(),
    name: z.literal(true).optional(),
    followers: z.literal(true).optional(),
    isActive: z.literal(true).optional(),
    registeredAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    positionId: z.literal(true).optional(),
  })
  .strict();

export const UserMinAggregateInputObjectSchema = Schema;
