"use client";

import * as React from "react";
import {
  ColumnDef,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";
import EventDetailsBox from "@/components/EventDetailsBox/EventDetailsBox";
import { EventState } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FlexBox } from "@/components/ui/FlexBox";
import { useIsUserAdmin } from "@/hooks/user/useIsUserAdmin";
import { useGuestMode } from "@/demo/session";

// export type EventState = {
//   id: string;
//   event_type: string;
//   start_time: string;
//   session_number?: number;
// };

const timeStringToDate = (timeString: string) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, seconds, 0);
  return date;
};

const sortTimes = (rowA: Row<EventState>, rowB: Row<EventState>) => {
  const timeA = timeStringToDate(rowA.original.event_start_time).getTime();
  const timeB = timeStringToDate(rowB.original.event_start_time).getTime();
  return timeA - timeB > 0 ? 1 : -1;
};

export const columns: ColumnDef<EventState>[] = [
  {
    accessorKey: "event_type",
    header: "Events",
    cell: ({ row }) => <EventDetailsBox event={row.original} />,
  },
  {
    accessorKey: "start_time",
    header: "Start time",
    cell: ({ row }) => <div>{row.original.event_start_time}</div>,
    sortingFn: sortTimes,
  },
];

const eventTableState = {
  columnVisibility: {
    start_time: false, // Hide the start_time column by default
  },
  sorting: [
    {
      id: "start_time",
      desc: false,
    },
  ],
};

interface EventTableProps {
  events: EventState[] | undefined;
  onRowClick: (sessionNumber: number) => void;
  handleOpenDialog: () => void;
}

export function EventsTable({
  events,
  onRowClick,
  handleOpenDialog,
}: EventTableProps) {
  const isUserAdmin = useIsUserAdmin();
  const isGuest = useGuestMode();

  const [sorting, setSorting] = React.useState<SortingState>(
    eventTableState.sorting,
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(eventTableState.columnVisibility);

  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: events ?? [],
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div>
        <Table>
          <TableBody>
            {events?.length === 0 && (
              <TableRow>
                <TableCell className="py-6 text-center text-xs text-muted-foreground">
                  No events scheduled
                </TableCell>
              </TableRow>
            )}
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                tabIndex={0}
                aria-label={`View ${row.original.event_type} at ${row.original.event_start_time.slice(0, 5)}`}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onRowClick(row.original.session_number);
                  }
                }}
                onClick={() => onRowClick(row.original.session_number)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-0 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {isUserAdmin && !isGuest && events && events.length < 3 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  <FlexBox container flexDirection="column" gap="4px">
                    Add an event
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      className="text-lg cursor-pointer text-successLight hover:text-secondaryLight"
                      onClick={handleOpenDialog}
                    />
                  </FlexBox>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
