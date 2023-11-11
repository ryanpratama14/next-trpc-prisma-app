import { z } from "zod";
import { PositionCreateWithoutUserInputObjectSchema } from "./PositionCreateWithoutUserInput.schema";
import { PositionUncheckedCreateWithoutUserInputObjectSchema } from "./PositionUncheckedCreateWithoutUserInput.schema";
import { PositionCreateOrConnectWithoutUserInputObjectSchema } from "./PositionCreateOrConnectWithoutUserInput.schema";
import { PositionUpsertWithoutUserInputObjectSchema } from "./PositionUpsertWithoutUserInput.schema";
import { PositionWhereUniqueInputObjectSchema } from "./PositionWhereUniqueInput.schema";
import { PositionUpdateWithoutUserInputObjectSchema } from "./PositionUpdateWithoutUserInput.schema";
import { PositionUncheckedUpdateWithoutUserInputObjectSchema } from "./PositionUncheckedUpdateWithoutUserInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PositionUpdateOneWithoutUserNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => PositionCreateWithoutUserInputObjectSchema),
        z.lazy(() => PositionUncheckedCreateWithoutUserInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => PositionCreateOrConnectWithoutUserInputObjectSchema).optional(),
    upsert: z.lazy(() => PositionUpsertWithoutUserInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => PositionWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => PositionUpdateWithoutUserInputObjectSchema),
        z.lazy(() => PositionUncheckedUpdateWithoutUserInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const PositionUpdateOneWithoutUserNestedInputObjectSchema = Schema;
