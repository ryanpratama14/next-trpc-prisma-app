import { serverClient } from "@/app/_trpc/serverClient";

export default async function Todo() {
  const data = await serverClient.getUsers();
  return <article>Todo</article>;
}
