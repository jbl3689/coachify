import { useUserTeams } from "@/hooks/teams/useUserTeams";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Loader from "../ui/Loader";
import { useUser } from "@/hooks/user/useUser";
import UserForm from "../UserForm/UserForm";
import { FlexBox } from "../ui/FlexBox";
import useBreakpoint from "use-breakpoint";
import { BREAKPOINTS } from "@/types/types";

function AccountDetails() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const { user } = useUser();
  const {
    teams,
    isLoading: isLoadingTeams,
    isFetching: isFetchingTeams,
  } = useUserTeams();

  return (
    <FlexBox
      container
      flexDirection={
        breakpoint === "mobileLarge" || breakpoint === "mobile"
          ? "column"
          : "row"
      }
      width="100%"
      gap="24px"
    >
      <Card className="w-full">
        <CardHeader className="font-semibold">
          {user?.full_name}'s Teams
        </CardHeader>
        {isLoadingTeams || isFetchingTeams ? (
          <Loader />
        ) : (
          <CardContent>
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent className="border-none">
                {teams?.map((team, index) => (
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
        )}
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Update account details</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm {...user} />
        </CardContent>
      </Card>
    </FlexBox>
  );
}

export default AccountDetails;
