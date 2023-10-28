import { getData } from "./handler";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  getUsers: publicProcedure
    .input(
      z
        .object({
          limit: z.number().optional(),
        })
        .optional()
    )
    .query((option) => {
      return getData("/users", option.input);
    }),
});

export type AppRouter = typeof appRouter;
