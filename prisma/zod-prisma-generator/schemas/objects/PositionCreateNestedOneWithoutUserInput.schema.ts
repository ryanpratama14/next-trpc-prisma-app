import { z } from "zod";
import { PositionCreateWithoutUserInputObjectSchema } from "./PositionCreateWithoutUserInput.schema";
import { PositionUncheckedCreateWithoutUserInputObjectSchema } from "./PositionUncheckedCreateWithoutUserInput.schema";
import { PositionCreateOrConnectWithoutUserInputObjectSchema } from "./PositionCreateOrConnectWithoutUserInput.schema";
import { PositionWhereUniqueInputObjectSchema } from "./PositionWhereUniqueInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PositionCreateNestedOneWithoutUserInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => PositionCreateWithoutUserInputObjectSchema),
        z.lazy(() => PositionUncheckedCreateWithoutUserInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => PositionCreateOrConnectWithoutUserInputObjectSchema).optional(),
    connect: z.lazy(() => PositionWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const PositionCreateNestedOneWithoutUserInputObjectSchema = Schema;
