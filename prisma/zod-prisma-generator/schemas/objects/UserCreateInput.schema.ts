import { z } from "zod";
import { PositionCreateNestedOneWithoutUserInputObjectSchema } from "./PositionCreateNestedOneWithoutUserInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    email: z.string(),
    name: z.string(),
    followers: z.number().optional(),
    isActive: z.boolean().optional(),
    registeredAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    position: z.lazy(() => PositionCreateNestedOneWithoutUserInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateInputObjectSchema = Schema;
