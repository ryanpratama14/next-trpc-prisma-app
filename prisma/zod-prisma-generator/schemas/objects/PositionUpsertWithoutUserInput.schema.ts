import { z } from "zod";
import { PositionUpdateWithoutUserInputObjectSchema } from "./PositionUpdateWithoutUserInput.schema";
import { PositionUncheckedUpdateWithoutUserInputObjectSchema } from "./PositionUncheckedUpdateWithoutUserInput.schema";
import { PositionCreateWithoutUserInputObjectSchema } from "./PositionCreateWithoutUserInput.schema";
import { PositionUncheckedCreateWithoutUserInputObjectSchema } from "./PositionUncheckedCreateWithoutUserInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PositionUpsertWithoutUserInput> = z
  .object({
    update: z.union([
      z.lazy(() => PositionUpdateWithoutUserInputObjectSchema),
      z.lazy(() => PositionUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => PositionCreateWithoutUserInputObjectSchema),
      z.lazy(() => PositionUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const PositionUpsertWithoutUserInputObjectSchema = Schema;
