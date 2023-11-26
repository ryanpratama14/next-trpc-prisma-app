import * as z from "zod"
import { CompletePosition, RelatedPositionModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  followers: z.number().int(),
  isActive: z.boolean(),
  registeredAt: z.date(),
  graduatedDate: z.date(),
  updatedAt: z.date(),
  positionId: z.string().nullish(),
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
