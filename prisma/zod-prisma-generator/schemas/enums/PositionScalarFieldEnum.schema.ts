import { z } from "zod";

export const PositionScalarFieldEnumSchema = z.enum(["id", "name", "registeredAt"]);
