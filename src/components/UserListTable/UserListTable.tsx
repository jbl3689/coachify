import { useTeamUsers } from "@/hooks/user/useTeamUsers";
import { DataTable } from "../ui/DataTable";
import { columns } from "./columns";
import Loader from "../ui/Loader";
import FormDialog from "../FormDialog/FormDialog";
import { useState } from "react";
import { UserState } from "@/types/types";
import { Row } from "@tanstack/react-table";
import UserForm from "../UserForm/UserForm";

function UserListTable() {
  const { users, isFetching, isLoading, refetch } = useTeamUsers();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<Row<UserState> | null>(
    null
  );

  const handleOpenDialog = (row: Row<UserState>) => {
    setSelectedRowData(row);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (dataUpdated: boolean) => {
    setIsDialogOpen(false);
    setSelectedRowData(null);

    if (dataUpdated) refetch();
  };

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <>
      <DataTable
        columns={columns(handleOpenDialog)}
        data={users!}
        header="Player List"
      />
      <FormDialog
        Title={
          <div>
            <h2>Update User Details</h2>
          </div>
        }
        isOpen={isDialogOpen}
        onClose={() => handleCloseDialog(false)}
      >
        <UserForm
          {...selectedRowData?.original}
          onFormClose={() => handleCloseDialog(true)}
        />
      </FormDialog>
    </>
  );
}

export default UserListTable;
