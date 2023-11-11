import { z } from "zod";
import { PositionWhereUniqueInputObjectSchema } from "./objects/PositionWhereUniqueInput.schema";

export const PositionFindUniqueSchema = z.object({ where: PositionWhereUniqueInputObjectSchema });
