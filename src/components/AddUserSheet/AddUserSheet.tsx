import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/Sheet";
import { Button } from "../ui/button";
import { useUsersNotInTeam } from "@/hooks/user/useUsersNotInTeam";
import Loader from "../ui/Loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FlexBox } from "../ui/FlexBox";
import { useAddPlayerToTeam } from "@/hooks/teams/useAddPlayerToTeam";
import { useSelector } from "react-redux";
import { getSelectedTeam } from "@/context/teamSlice";
import { useState } from "react";

function AddUserSheet() {
  const { users, isLoading } = useUsersNotInTeam();
  const { addPlayer } = useAddPlayerToTeam();
  const teamId = useSelector(getSelectedTeam());

  const [selectedUserId, setSelectedUserId] = useState<number>(users?.at(0).id);

  if (isLoading || users === undefined || users === null) {
    return <Loader />;
  }

  const handleAddPlayer = () => {
    addPlayer({ teamId, userId: selectedUserId });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="destructive">Add Users</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add user to the team</SheetTitle>
          <SheetDescription>
            Select a user from the dropdown list to add to the team. Can't find
            the user you're looking for? Click{" "}
            <span className="font-semibold text-blue-500 cursor-pointer">
              here
            </span>{" "}
            to register a new user.
          </SheetDescription>
        </SheetHeader>

        <FlexBox container flexDirection="column" gap="20px" margin="20px 0">
          <Select
            onValueChange={(value) => setSelectedUserId(Number(value))}
            value={selectedUserId?.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Users</SelectLabel>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.email}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <SheetFooter>
            <FlexBox container flexDirection="column" gap="8px">
              <SheetClose asChild>
                <Button type="submit" onClick={handleAddPlayer}>
                  Add to the team
                </Button>
              </SheetClose>
            </FlexBox>
          </SheetFooter>
        </FlexBox>
      </SheetContent>
    </Sheet>
  );
}

export default AddUserSheet;
