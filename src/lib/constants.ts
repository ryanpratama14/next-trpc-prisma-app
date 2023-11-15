import { UserListInputSorting } from "@/server/api/routes/user";

export const userSorting: UserListInputSorting = [
  {
    title: "Name",
    slug: "name-desc",
    value: {
      name: "desc",
    },
  },
  {
    title: "Email",
    slug: "email-desc",
    value: {
      email: "desc",
    },
  },
  {
    title: "Date Joined",
    slug: "datejoined-desc",
    value: {
      registeredAt: "desc",
    },
  },
  {
    title: "Position",
    slug: "position-desc",
    value: {
      position: {
        name: "desc",
      },
    },
  },
];
