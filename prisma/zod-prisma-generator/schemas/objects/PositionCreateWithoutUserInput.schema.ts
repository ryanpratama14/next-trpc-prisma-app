import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PositionCreateWithoutUserInput> = z
  .object({
    name: z.string(),
    registeredAt: z.coerce.date().optional(),
  })
  .strict();

export const PositionCreateWithoutUserInputObjectSchema = Schema;
