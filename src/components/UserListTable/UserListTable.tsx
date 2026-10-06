import { useTeamUsers } from "@/hooks/user/useTeamUsers";
import { DataTable } from "../ui/DataTable";
import { columns } from "./columns";
import Loader from "../ui/Loader";
import FormDialog from "../FormDialog/FormDialog";
import { useState } from "react";
import { UserState } from "@/types/types";
import { Row } from "@tanstack/react-table";
import UserForm from "../UserForm/UserForm";
import { useGuestMode } from "@/demo/session";

function UserListTable() {
  const { users, isFetching, isLoading, refetch } = useTeamUsers();
  const isGuest = useGuestMode();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<Row<UserState> | null>(
    null,
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
        columns={
          isGuest
            ? columns(handleOpenDialog).filter(
                (column) => column.id !== "updateUser",
              )
            : columns(handleOpenDialog)
        }
        data={users!}
        header="Player List"
      />
      {!isGuest && (
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
      )}
    </>
  );
}

export default UserListTable;
