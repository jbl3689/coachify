import { HiSelector } from "react-icons/hi";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Alert, AlertDescription, AlertTitle } from "../ui/Alert";

interface TeamSelectDropdownProps {
  teams: any[] | null | undefined;
  selectedTeamId: number;
  handleUpdateTeam: (value: string) => void;
}

function TeamSelectDropdown({
  teams,
  selectedTeamId,
  handleUpdateTeam,
}: TeamSelectDropdownProps) {
  // const selectedTeam = teams?.find((team) => team.id === selectedTeamId);

  const isTeamListEmpty = !teams || teams.length === 0;

  return teams && teams.length > 0 ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="font-semibold">
          {isTeamListEmpty
            ? "Assign yourself to a team"
            : teams?.find((team) => team.id === selectedTeamId)?.team_name}
          <span>
            <HiSelector />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Selected Team</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedTeamId.toString()}
          onValueChange={handleUpdateTeam}
        >
          {teams?.map((team) => (
            <DropdownMenuRadioItem
              value={team.id.toString()}
              className={`hover:cursor-pointer text-md ${team.id === selectedTeamId && "border-red font-semibold"}`}
              key={team.id}
            >
              {team.team_name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Alert variant="destructive">
      <AlertTitle>
        You must assign yourself to a team before you use the app
      </AlertTitle>
      <AlertDescription>
        Contact an admin to assign you to a team OR create a new team{" "}
        <a href="" className="text-blue-500">
          here
        </a>
      </AlertDescription>
    </Alert>
  );
}

export default TeamSelectDropdown;
