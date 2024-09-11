import { useTeamUsers } from "@/hooks/user/useTeamUsers";
import { DataTable } from "../ui/DataTable";
import { columns, Player } from "./columns";
import Loader from "../ui/Loader";

const dummyData = [
  {
    id: "1",
    fullName: "John Doe",
    primaryPosition: "ST",
    secondaryPosition: "GK",
    email: "john@mail.com",
  },
  {
    id: "2",
    fullName: "Jane Doe",
    primaryPosition: "CF",
    secondaryPosition: "CM",
    email: "jane@mail.com",
  },
  {
    id: "3",
    fullName: "Alice Doe",
    primaryPosition: "GK",
    secondaryPosition: "CB",
    email: "alice@maik.com",
  },
  {
    id: "1",
    fullName: "John Doe",
    primaryPosition: "ST",
    secondaryPosition: "GK",
    email: "john@mail.com",
  },
  {
    id: "2",
    fullName: "Jane Doe",
    primaryPosition: "CF",
    secondaryPosition: "CM",
    email: "jane@mail.com",
  },
  {
    id: "3",
    fullName: "Alice Doe",
    primaryPosition: "GK",
    secondaryPosition: "CB",
    email: "alice@maik.com",
  },
  {
    id: "1",
    fullName: "John Doe",
    primaryPosition: "ST",
    secondaryPosition: "GK",
    email: "john@mail.com",
  },
  {
    id: "2",
    fullName: "Jane Doe",
    primaryPosition: "CF",
    secondaryPosition: "CM",
    email: "jane@mail.com",
  },
  {
    id: "3",
    fullName: "Alice Doe",
    primaryPosition: "GK",
    secondaryPosition: "CB",
    email: "alice@maik.com",
  },
  {
    id: "1",
    fullName: "John Doe",
    primaryPosition: "ST",
    secondaryPosition: "GK",
    email: "john@mail.com",
  },
  {
    id: "2",
    fullName: "Jane Doe",
    primaryPosition: "CF",
    secondaryPosition: "CM",
    email: "jane@mail.com",
  },
  {
    id: "3",
    fullName: "Alice Doe",
    primaryPosition: "GK",
    secondaryPosition: "CB",
    email: "alice@maik.com",
  },
  {
    id: "1",
    fullName: "John Doe",
    primaryPosition: "ST",
    secondaryPosition: "GK",
    email: "john@mail.com",
  },
  {
    id: "2",
    fullName: "Jane Doe",
    primaryPosition: "CF",
    secondaryPosition: "CM",
    email: "jane@mail.com",
  },
  {
    id: "3",
    fullName: "Alice Doe",
    primaryPosition: "GK",
    secondaryPosition: "CB",
    email: "alice@maik.com",
  },
] as Player[];

function UserListTable() {
  const { users, isFetching, isLoading } = useTeamUsers();

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return <DataTable columns={columns} data={dummyData} header="User List" />;
}

export default UserListTable;
