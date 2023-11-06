import { trpcServer } from "@/app/_trpc/serverClient";

export default async function Todo() {
  const data = await trpcServer.user.list({ page: 1 });

  return <article>Todo</article>;
}
