"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import EventDetailsBox from "@/components/EventDetailsBox/EventDetailsBox";
import { EventState } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FlexBox } from "@/components/ui/FlexBox";

// export type EventState = {
//   id: string;
//   event_type: string;
//   start_time: string;
//   session_number?: number;
// };

// const timeStringToDate = (timeString: string) => {
//   const [hours, minutes, seconds] = timeString.split(":").map(Number);
//   const date = new Date();
//   date.setHours(hours, minutes, seconds, 0);
//   return date;
// };

// const sortTimes = (
//   rowA: Row<EventState>,
//   rowB: Row<EventState>,
//   columnId: string
// ) => {
//   const timeA = timeStringToDate(rowA.getValue(columnId)).getTime();
//   const timeB = timeStringToDate(rowB.getValue(columnId)).getTime();
//   return timeA - timeB;
// };

export const columns: ColumnDef<EventState>[] = [
  {
    accessorKey: "event_type",
    header: "Events",
    cell: ({ row }) => (
      <EventDetailsBox event={row.original} sessionNumber={1} />
    ),
  },
  {
    accessorKey: "start_time",
    header: "Start time",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("start_time")}</div>
    ),
  },
];

const initialState = {
  columnVisibility: {
    start_time: false, // Hide the start_time column by default
  },
  sorting: {
    id: "start_time",
    desc: false,
  },
};

interface EventTableProps {
  events: EventState[] | undefined;
}

export function EventsTable({ events }: EventTableProps) {
  // const eventTableMapping = events?.map((event) => ({
  //   id: event.id.toString(),
  //   event_type: event.event_type,
  //   start_time: event.event_start_time,
  //   session_number: event.session_number,
  // }));

  const [sorting, setSorting] = React.useState<SortingState>([
    initialState.sorting,
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialState.columnVisibility);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: events ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="m-4">
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-0 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                <FlexBox container flexDirection="column" gap="10px">
                  Add an event
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    className="text-lg cursor-pointer text-successLight hover:text-secondaryLight"
                  />
                </FlexBox>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end py-4 space-x-2">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="default"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
}
