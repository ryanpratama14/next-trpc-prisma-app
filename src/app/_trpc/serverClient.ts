import { httpBatchLink } from "@trpc/client";

import { appRouter } from "@/server/api";
import { getBaseUrl } from "@/lib/utils";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
