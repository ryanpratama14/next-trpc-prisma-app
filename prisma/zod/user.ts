import * as z from "zod"
import { CompletePosition, RelatedPositionModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  email: z.string(),
  name: z.string(),
  followers: z.number().int(),
  isActive: z.boolean(),
  registeredAt: z.date(),
  updatedAt: z.date(),
  positionId: z.number().int().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  position?: CompletePosition | null
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  position: RelatedPositionModel.nullish(),
}))
