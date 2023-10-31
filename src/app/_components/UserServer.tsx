import { serverClient } from "@/app/_trpc/serverClient";

export default async function Todo() {
  const data = await serverClient.user.list({ page: 1 });
  return <article>Todo</article>;
}
