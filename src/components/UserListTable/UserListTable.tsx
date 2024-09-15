import { useTeamUsers } from "@/hooks/user/useTeamUsers";
import { DataTable } from "../ui/DataTable";
import { columns } from "./columns";
import Loader from "../ui/Loader";

function UserListTable() {
  const { users, isFetching, isLoading } = useTeamUsers();

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return <DataTable columns={columns} data={users!} header="User List" />;
}

export default UserListTable;
