import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/api";
import { LOCALE_TAG } from "@/server/helper";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
    onError: ({ error }) => {
      console.log(
        `${new Date().toLocaleTimeString(LOCALE_TAG, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })} ${error}`,
      );
    },
  });

export { handler as GET, handler as POST };
