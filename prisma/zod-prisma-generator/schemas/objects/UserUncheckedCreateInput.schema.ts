import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    email: z.string(),
    name: z.string(),
    followers: z.number().optional(),
    isActive: z.boolean().optional(),
    registeredAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    positionId: z.number().optional().nullable(),
  })
  .strict();

export const UserUncheckedCreateInputObjectSchema = Schema;
