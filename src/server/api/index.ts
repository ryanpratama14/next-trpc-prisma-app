import { router } from "@/server/api/trpc";
import { userRouter } from "@/server/api/routes/user";
import { positionRouter } from "@/server/api/routes/position";

export const appRouter = router({
  user: userRouter,
  position: positionRouter,
});

export type AppRouter = typeof appRouter;
