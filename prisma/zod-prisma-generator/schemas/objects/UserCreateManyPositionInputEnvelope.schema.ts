import { z } from "zod";
import { UserCreateManyPositionInputObjectSchema } from "./UserCreateManyPositionInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserCreateManyPositionInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => UserCreateManyPositionInputObjectSchema),
      z.lazy(() => UserCreateManyPositionInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserCreateManyPositionInputEnvelopeObjectSchema = Schema;
