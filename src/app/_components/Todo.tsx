import { serverClient } from "@/app/_trpc/serverClient";

export default async function Todo() {
  const data = await serverClient.getUsers();
  console.log(data);
  return <article>Todo</article>;
}
