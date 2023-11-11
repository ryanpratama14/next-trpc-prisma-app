import { z } from "zod";

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "email",
  "name",
  "followers",
  "isActive",
  "registeredAt",
  "updatedAt",
  "positionId",
]);
