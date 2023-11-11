import { z } from "zod";
import { PositionWhereUniqueInputObjectSchema } from "./objects/PositionWhereUniqueInput.schema";

export const PositionDeleteOneSchema = z.object({ where: PositionWhereUniqueInputObjectSchema });
