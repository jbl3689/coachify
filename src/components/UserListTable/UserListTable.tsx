import { useTeamUsers } from "@/hooks/user/useTeamUsers";
import { DataTable } from "../ui/DataTable";
import { columns } from "./columns";
import Loader from "../ui/Loader";
import FormDialog from "../FormDialog/FormDialog";
import { useState } from "react";
import { UserState } from "@/types/types";
import { Row } from "@tanstack/react-table";

function UserListTable() {
  const { users, isFetching, isLoading } = useTeamUsers();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<Row<UserState> | null>(
    null
  );

  const handleOpenDialog = (row: Row<UserState>) => {
    setSelectedRowData(row);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRowData(null);
  };

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <>
      <DataTable
        columns={columns(handleOpenDialog)}
        data={users!}
        header="User List"
      />
      ;
      <FormDialog
        Title={
          <div>
            <h2>Update User Details</h2>
          </div>
        }
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      >
        {selectedRowData?.original.pos_primary}
        {/* <EventForm
            selectedDay={selectedDay}
            eventType={formEventType ?? ""}
            setFormEventType={setFormEventType}
          /> */}
      </FormDialog>
    </>
  );
}

export default UserListTable;
