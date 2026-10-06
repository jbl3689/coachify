import { Link, useLocation } from "react-router-dom";
import useBreakpoint from "use-breakpoint";
import { useDispatch, useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { useLogout } from "@/hooks/auth/useLogout";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { FlexBox } from "../ui/FlexBox";
import { useUser } from "@/hooks/user/useUser";
import { Skeleton } from "../ui/Skeleton";
import { BREAKPOINTS } from "@/types/types";
import { ThemeToggle } from "../ThemeToggle";
import { useUserTeams } from "@/hooks/teams/useUserTeams";
import { getSelectedTeam, setSelectedTeam } from "@/context/teamSlice";
import TeamSelectDropdown from "../TeamSelectDropdown/TeamSelectDropdown";
import { useGuestMode } from "@/demo/session";
import { publicSignupEnabled } from "@/config/features";

function PublicNavbar() {
  const currentUrl = useLocation().pathname;
  return (
    <header className="flex items-center justify-between flex-shrink-0 px-6 py-3 font-semibold transition-all max-h-28">
      <Link to="/" className="text-4xl text-primary">
        Coachify
      </Link>
      <FlexBox container gap="24px" alignItems="center">
        {currentUrl === "/login" && publicSignupEnabled ? (
          <Link to="/signup" className="text-primary hover:text-primaryLight">
            Sign up
          </Link>
        ) : currentUrl === "/signup" ? (
          <Link to="/login" className="text-primary hover:text-primaryLight">
            Log in
          </Link>
        ) : null}
        <ThemeToggle />
      </FlexBox>
    </header>
  );
}

function SignedInNavbar() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const isGuest = useGuestMode();
  const { logout, isPending } = useLogout();
  const { user, isLoading, isFetching } = useUser();
  const { teams } = useUserTeams();
  const selectedTeamId = useSelector(getSelectedTeam());
  const dispatch = useDispatch();
  const userInitials = user?.full_name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  function handleUpdateTeam(value: string) {
    dispatch(setSelectedTeam(parseInt(value, 10)));
  }

  const isLoadingData = isLoading || isFetching || isPending;
  return (
    <header className="flex items-center justify-between flex-shrink-0 px-6 py-3 font-semibold transition-all max-h-28">
      {isLoadingData ? (
        <>
          <Link to="/" className="text-4xl text-primary">
            Coachify
          </Link>
          <div className="flex items-center gap-4">
            <Skeleton className="w-32 h-10" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        </>
      ) : (
        <>
          <Link to="/" className="text-4xl text-primary">
            Coachify
          </Link>
          <FlexBox
            container
            gap={
              breakpoint === "mobile" || breakpoint === "mobileLarge"
                ? "8px"
                : "24px"
            }
            alignItems="center"
          >
            {isGuest ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Guest demo
                </span>
                <button
                  className="text-primary hover:text-primaryLight"
                  onClick={() => logout()}
                >
                  Exit demo
                </button>
              </>
            ) : (
              <>
                <TeamSelectDropdown
                  teams={teams}
                  selectedTeamId={selectedTeamId}
                  handleUpdateTeam={handleUpdateTeam}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <FlexBox container alignItems="center" gap="10px">
                      <Avatar>
                        <AvatarImage src={user?.avatar_url} />
                        <AvatarFallback>{userInitials}</AvatarFallback>
                      </Avatar>
                    </FlexBox>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to="/account">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => logout()}
                      disabled={isPending}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            <ThemeToggle />
          </FlexBox>
        </>
      )}
    </header>
  );
}

export const Navbar = () => {
  const currentUrl = useLocation().pathname;
  return currentUrl === "/login" || currentUrl === "/signup" ? (
    <PublicNavbar />
  ) : (
    <SignedInNavbar />
  );
};
