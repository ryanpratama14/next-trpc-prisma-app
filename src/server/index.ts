import { router } from "@/server/trpc";
import { userRouter } from "@/server/routes/user";
import { positionRouter } from "@/server/routes/position";

export const appRouter = router({
  user: userRouter,
  position: positionRouter,
});

export type AppRouter = typeof appRouter;
