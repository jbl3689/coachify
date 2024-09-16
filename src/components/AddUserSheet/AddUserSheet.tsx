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
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
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

function AddUserSheet() {
  const { users, isLoading } = useUsersNotInTeam();

  if (isLoading || users === undefined || users === null) {
    return <Loader />;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="destructive">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add user to the team</SheetTitle>
          <SheetDescription>
            Select a user from the dropdown list to add to the team. Can't find
            the user you're looking for? Click the button below to create a new
            user.
          </SheetDescription>
        </SheetHeader>

        <FlexBox container flexDirection="column" gap="20px" margin="20px 0">
          <Select>
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
          {/* <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="name" className="text-right">
          Name
          </Label>
          <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="username" className="text-right">
          Username
          </Label>
          <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
          </div> */}
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Add to the team</Button>
            </SheetClose>
          </SheetFooter>
        </FlexBox>
      </SheetContent>
    </Sheet>
  );
}

export default AddUserSheet;
