import { UserList } from "@/server/api/routes/user";

type TProps = {
  data: UserList;
};

export default function Props({ data }: TProps) {
  return (
    <div>
      {data?.map((item) => (
        <></>
      ))}
    </div>
  );
}
