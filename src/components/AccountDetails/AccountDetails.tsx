import { useUserTeams } from "@/hooks/teams/useUserTeams";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useAuthUser } from "@/hooks/auth/useAuthUser";

function AccountDetails() {
  const { user } = useAuthUser();
  const { teams } = useUserTeams();
  console.log(teams);
  return (
    <Card className="w-full h-full">
      <CardHeader className="font-semibold">
        {user?.user_metadata.full_name}'s Teams
      </CardHeader>
      <CardContent>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent className="border-none">
            {teams &&
              teams.map((team, index) => (
                <CarouselItem key={index}>
                  <div className="">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center gap-4 mt-2 aspect-square ">
                        {/* <div>{team.team_name}</div> */}
                        <img
                          src={team.logo}
                          alt={`${team.team_name}'s logo`}
                          className="rounded-md"
                        ></img>
                        <div>{team.team_name}</div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}

export default AccountDetails;
