import { router } from "@/server/trpc";
import { userRouter } from "@/server/api/routes/user";
import { positionRouter } from "@/server/api/routes/position";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const appRouter = router({
  user: userRouter,
  position: positionRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
