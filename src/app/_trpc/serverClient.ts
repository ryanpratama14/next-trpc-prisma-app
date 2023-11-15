import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@/server/api";
import { getUrl } from "@/server/helper";

export const api = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: getUrl(),
    }),
  ],
});
