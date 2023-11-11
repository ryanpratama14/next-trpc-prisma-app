import * as z from "zod"

export const ProductModel = z.object({
  id: z.number().int(),
  name: z.string(),
  price: z.number(),
  registeredAt: z.date(),
})
