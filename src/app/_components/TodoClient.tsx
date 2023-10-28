"use client";

import { trpc } from "@/app/_trpc/client";
import { useState } from "react";

type Response = {
  limit: number;
  skip: number;
  total: number;
  users: User[];
};

export default function TodoClient() {
  const [limit, setLimit] = useState(5);
  const { data, isLoading } = trpc.getTodos.useQuery<Response>({
    limit: limit,
  });

  console.log(data?.limit);
  return (
    <article>
      {isLoading ? "Loading..." : ""}

      <button
        className="px-6 py-2 rounded-md text-white bg-blue-700"
        onClick={() => setLimit((prev) => prev + 5)}
      >
        Add Limit
      </button>
    </article>
  );
}
