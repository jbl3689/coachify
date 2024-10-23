import { HiSelector } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

import { getSelectedTeam, setSelectedTeam } from "@/context/teamSlice";
import { useUserTeams } from "@/hooks/teams/useUserTeams";

import DashboardCard from "../ui/DashboardCard";
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
import { FlexBox } from "@/components/ui/FlexBox";
import Loader from "../ui/Loader";
import { Card, CardContent } from "../ui/card";

function PlayerDashboard() {
  const { teams, isLoading, isFetching } = useUserTeams();

  const selectedTeamId = useSelector(getSelectedTeam());
  // const selectedTeam = teams?.find((team) => team.id === selectedTeamId);
  const dispatch = useDispatch();

  function handleUpdateTeam(value: string) {
    dispatch(setSelectedTeam(parseInt(value)));
  }

  if (isLoading || isFetching || teams === undefined || teams === null) {
    return <Loader />;
  }

  const isTeamListEmpty = !teams || teams.length === 0;

  return (
    <FlexBox container flexDirection="column" gap="25px">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="py-8 mx-auto w-96">
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
                className={`hover:cursor-pointer text-md ${team.id === selectedTeamId && "border-red text-textBase"}`}
                key={team.id}
              >
                {team.team_name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {!isTeamListEmpty ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard>24km ran this week</DashboardCard>
            <DashboardCard>Upcoming Training: 5th Sep 18:00</DashboardCard>
            <DashboardCard>Upcoming Game: 9th Sep 14:00</DashboardCard>
            <DashboardCard>Manager: James Blake </DashboardCard>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
            {/* <DashboardCard>
              <img
                className="rounded-2xl"
                src={selectedTeam?.logo}
                alt={selectedTeam?.team_name}
              ></img>
            </DashboardCard> */}
            <DashboardCard className="col-span-2 lg:col-span-1">
              <FlexBox
                container
                flexDirection="column"
                justifyContent="space-between"
                height="auto"
              ></FlexBox>
            </DashboardCard>
            <Card className="col-span-2">
              <CardContent></CardContent>
            </Card>
          </div>
        </>
      ) : null}
    </FlexBox>
  );
}

export default PlayerDashboard;
