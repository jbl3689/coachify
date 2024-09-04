import { FlexBox } from "../ui/FlexBox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Button } from "../ui/button";
import { useUserTeams } from "@/hooks/teams/useUserTeams";
import { getSelectedTeam, setSelectedTeam } from "@/context/teamSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiSelector } from "react-icons/hi";
import DashboardCard from "../AdminDashboard/DashboardCard";
import { useTeamUsers } from "@/hooks/user/useTeamUsers";

function DashboardHeader() {
  const { teams } = useUserTeams();
  const { users } = useTeamUsers();

  // THIS IS GIVING TEAMS * 2, SECOND SHOULD BE USERS
  console.log(teams, users);

  const selectedTeamId = useSelector(getSelectedTeam());
  const selectedTeam = teams?.find((team) => team.id === selectedTeamId);
  const dispatch = useDispatch();

  function handleUpdateTeam(value: string) {
    dispatch(setSelectedTeam(parseInt(value)));
  }

  return (
    <FlexBox container flexDirection="column" className="gap-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="w-96 mx-auto py-8">
            {teams &&
              teams.find((team) => team.id === selectedTeamId)?.team_name}
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
                className={`hover:cursor-pointer text-md ${team.id === selectedTeamId && "border-red text-textBase"}`}
              >
                {team.team_name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="grid grid-cols-4 gap-4">
        <DashboardCard>24km ran this week</DashboardCard>
        <DashboardCard>Upcoming Training: 5th Sep 18:00</DashboardCard>
        <DashboardCard>Upcoming Game: 9th Sep 14:00</DashboardCard>
        <DashboardCard>32 Members </DashboardCard>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <DashboardCard>
          <img
            className="rounded-2xl"
            src={selectedTeam?.logo}
            alt={selectedTeam?.team_name}
          ></img>
        </DashboardCard>
        <DashboardCard>ABC</DashboardCard>
        <DashboardCard>ABC</DashboardCard>
      </div>
    </FlexBox>
  );
}

export default DashboardHeader;
