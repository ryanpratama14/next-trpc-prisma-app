import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserCreateWithoutPositionInput> = z
  .object({
    email: z.string(),
    name: z.string(),
    followers: z.number().optional(),
    isActive: z.boolean().optional(),
    registeredAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const UserCreateWithoutPositionInputObjectSchema = Schema;
