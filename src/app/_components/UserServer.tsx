import { trpcServer } from "@/app/_trpc/serverClient";
import Props from "./Props";

export default async function Todo() {
  const data = await trpcServer.user.list({ page: 1 });

  return (
    <article>
      <Props data={data.data} />
    </article>
  );
}
