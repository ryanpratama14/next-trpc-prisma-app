"use client";

import { trpc } from "@/app/_trpc/client";
import { useState } from "react";
import { z } from "zod";

type Response = {
  limit: number;
  skip: number;
  total: number;
  users: User[];
};

export default function TodoClient() {
  const [filter, setFilter] = useState({
    limit: 5,
  });

  const { data, isLoading } = trpc.getUsers.useQuery<Response>({
    params: {
      limit: filter.limit,
    },
  });

  console.log(data?.limit);

  return (
    <article>
      {isLoading ? "Loading..." : ""}

      <button
        className="px-6 py-2 rounded-md text-white bg-blue-700"
        onClick={() =>
          setFilter((prev) => ({
            ...prev,
            limit: prev.limit + 5,
          }))
        }
      >
        Add Limit
      </button>
    </article>
  );
}
