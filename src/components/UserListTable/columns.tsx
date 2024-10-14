import { UserState } from "@/types/types";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const columns = (
  handleOpenDialog: (row: Row<UserState>) => void
): ColumnDef<UserState>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "pos_primary",
    header: "Primary Pos",
  },
  {
    accessorKey: "pos_secondary",
    header: "Secondary Pos",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "updateUser",
    header: "Update User",
    cell: ({ row }) => (
      <>
        <Button variant="outline" onClick={() => handleOpenDialog(row)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </>

      // <Checkbox
      //   checked={row.getIsSelected()}
      //   onCheckedChange={(value) => row.toggleSelected(!!value)}
      //   aria-label="Select row"
      // />
    ),
    enableSorting: false,
    enableHiding: false,
    maxSize: 1,
  },
];

// TRYING TO DO IN-LINE EDITING THING
// export const columns: ColumnDef<UserState>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "full_name",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Name
//           <ArrowUpDown className="w-4 h-4 ml-2" />
//         </Button>
//       );
//     },
//     cell: ({ row, table }) => {
//       const isEditing = table.options.meta?.tableRowId === row.id;
//       const [name, setName] = useState(row.original.full_name);

//       return row.getIsSelected() ? (
//         <Input value={name} onChange={(e) => setName(e.target.value)} />
//       ) : (
//         row.original.full_name
//       );
//     },
//   },
//   {
//     accessorKey: "pos_primary",
//     header: "Primary Pos",
//     cell: ({ row }) => {
//       const [isEditing, setIsEditing] = useState<boolean>(false);
//       const [primaryPos, setPrimaryPos] = useState<PositionAcronym>(
//         row.original.pos_primary as PositionAcronym
//       );

//       return isEditing ? (
//         <Input
//           value={primaryPos}
//           onChange={(e) => setPrimaryPos(e.target.value as PositionAcronym)}
//         />
//       ) : (
//         row.original.pos_primary
//       );
//     },
//   },
//   {
//     accessorKey: "pos_secondary",
//     header: "Secondary Pos",
//     cell: ({ row }) => {
//       const [isEditing, setIsEditing] = useState(false);
//       const [secondaryPos, setSecondaryPos] = useState<PositionAcronym>(
//         row.original.pos_secondary as PositionAcronym
//       );

//       return isEditing ? (
//         <Input
//           value={secondaryPos}
//           onChange={(e) => setSecondaryPos(e.target.value as PositionAcronym)}
//         />
//       ) : (
//         row.original.pos_secondary
//       );
//     },
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     id: "update",
//     header: "Update User",
//     cell: ({ row, table }) => {
//       const isEditing = table.getState().editingRowId === row.id;
//       const [name, setName] = useState(row.original.full_name);
//       const [primaryPos, setPrimaryPos] = useState(row.original.pos_primary);
//       const [secondaryPos, setSecondaryPos] = useState(
//         row.original.pos_secondary
//       );
//       const updateUser = () => console.log("Update User");

//       const handleSave = () => {
//         updateUser();
//         table.setState({ ...table.getState(), editingRowId: null });
//       };

//       return isEditing ? (
//         <Button variant="outline" onClick={handleSave}>
//           <FontAwesomeIcon icon={faSave} />
//         </Button>
//       ) : (
//         <Button variant="outline" onClick={() => setIsEditing(true)}>
//           <FontAwesomeIcon icon={faPenToSquare} />
//         </Button>
//       );
//     },
//     enableSorting: false,
//     enableHiding: false,
//     maxSize: 1,
//   },
// ];
