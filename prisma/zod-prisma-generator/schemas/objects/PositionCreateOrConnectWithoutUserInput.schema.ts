import { z } from "zod";
import { PositionWhereUniqueInputObjectSchema } from "./PositionWhereUniqueInput.schema";
import { PositionCreateWithoutUserInputObjectSchema } from "./PositionCreateWithoutUserInput.schema";
import { PositionUncheckedCreateWithoutUserInputObjectSchema } from "./PositionUncheckedCreateWithoutUserInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PositionCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => PositionWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => PositionCreateWithoutUserInputObjectSchema),
      z.lazy(() => PositionUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const PositionCreateOrConnectWithoutUserInputObjectSchema = Schema;
