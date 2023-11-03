import { TRPCError, initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import { MESSAGES_LIST } from "./helper";

export const t = initTRPC.context().create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const user = {
    username: "Ryan",
    email: "ryanpratama.dev@gmail.com",
  };

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: MESSAGES_LIST["UNAUTHORIZED"],
    });
  }

  return opts.next({
    ctx: {
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
