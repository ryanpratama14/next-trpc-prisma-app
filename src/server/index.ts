import { getData } from "./handler";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  getUsers: publicProcedure
    .input(
      z
        .object({
          params: z
            .object({
              limit: z.number().optional(),
            })
            .optional(),
        })
        .optional()
    )
    .query((option) => {
      return getData("/users", option.input?.params);
    }),
});

export type AppRouter = typeof appRouter;
