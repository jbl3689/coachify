import { HiSelector } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

import { getSelectedTeam, setSelectedTeam } from "@/context/teamSlice";
import { useUserTeams } from "@/hooks/teams/useUserTeams";
import { useTeamUsers } from "@/hooks/user/useTeamUsers";

import DashboardCard from "../AdminDashboard/DashboardCard";
import { Button } from "../ui/button";
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
import { FlexBox } from "../ui/FlexBox";
import Heading from "../ui/Heading";
import Uploader from "@/data/Uploader";

function DashboardHeader() {
  const { teams } = useUserTeams();
  // const { users } = useTeamUsers();

  const selectedTeamId = useSelector(getSelectedTeam());
  const selectedTeam = teams?.find((team) => team.id === selectedTeamId);
  const dispatch = useDispatch();

  function handleUpdateTeam(value: string) {
    dispatch(setSelectedTeam(parseInt(value)));
  }

  return (
    <FlexBox container flexDirection="column" gap="30px">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="py-8 mx-auto w-96">
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
                key={team.id}
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
        <DashboardCard>Manager: James Blake </DashboardCard>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <DashboardCard>
          <img
            className="rounded-2xl"
            src={selectedTeam?.logo}
            alt={selectedTeam?.team_name}
          ></img>
        </DashboardCard>
        <DashboardCard>
          <FlexBox
            container
            flexDirection="column"
            justifyContent="space-between"
            height="auto"
          >
            <Heading as="h3">Admin Tools</Heading>
            <FlexBox
              container
              flexDirection="column"
              justifyContent="space-between"
              gap="16px"
              width="80%"
              margin="15px auto"
            >
              <Button variant="default">Add a Player</Button>
              <Button variant="default">Add a Coach</Button>
              <Button variant="default">Add a Manager</Button>

              <Uploader />
            </FlexBox>
          </FlexBox>
        </DashboardCard>
        <DashboardCard>ABC</DashboardCard>
      </div>
    </FlexBox>
  );
}

export default DashboardHeader;
