import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const PositionModel = z.object({
  id: z.string(),
  name: z.string(),
  registeredAt: z.date(),
})

export interface CompletePosition extends z.infer<typeof PositionModel> {
  User: CompleteUser[]
}

/**
 * RelatedPositionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPositionModel: z.ZodSchema<CompletePosition> = z.lazy(() => PositionModel.extend({
  User: RelatedUserModel.array(),
}))
