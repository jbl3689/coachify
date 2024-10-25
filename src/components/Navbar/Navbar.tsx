import { Link, useLocation } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { useLogout } from "@/hooks/auth/useLogout";
import { useAuthUser } from "@/hooks/auth/useAuthUser";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { FlexBox } from "../ui/FlexBox";
import { useUser } from "@/hooks/user/useUser";
import { Skeleton } from "../ui/Skeleton";
import useBreakpoint from "use-breakpoint";
import { BREAKPOINTS } from "@/types/types";
import { HiMenu } from "react-icons/hi";

function Navbar() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const currentUrl = useLocation().pathname;

  const { logout, isPending } = useLogout();
  const { isAuthenticated, isLoading, isFetching } = useAuthUser();
  const { user } = useUser();
  const userInitials = user?.full_name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const isLoadingData = isLoading || isFetching || isPending;

  return (
    <header className="flex items-center justify-between flex-shrink-0 px-6 py-3 font-semibold transition-all max-h-28 text-textBase">
      {isLoadingData ? (
        <>
          <Skeleton className="w-32 h-10" />
          <div className="flex gap-10 text-xl">
            <div className="flex items-center gap-2">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
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
            className="flex text-xl"
          >
            {isAuthenticated ? (
              <>
                <Link to="/calendar" className="my-auto">
                  {breakpoint === "mobile" || breakpoint === "mobileLarge" ? (
                    <HiMenu className="text-5xl" />
                  ) : (
                    "Calendar"
                  )}
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <FlexBox container alignItems="center" gap="10px">
                      <Avatar>
                        <AvatarImage src={"https://github.com/shadcn.png"} />
                        <AvatarImage src={user?.avatar_url} />
                        <AvatarFallback>{userInitials}</AvatarFallback>
                      </Avatar>
                    </FlexBox>

                    {/* {user?.user_metadata ? user.user_metadata.full_name : "User"} */}
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
            ) : (
              <>
                {currentUrl === "/login" ? (
                  <Link
                    to="/signup"
                    className="text-primary hover:cursor-pointer hover:text-primaryLight"
                  >
                    signup
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="text-primary hover:cursor-pointer hover:text-primaryLight"
                  >
                    login
                  </Link>
                )}
              </>
            )}
          </FlexBox>
        </>
      )}
    </header>
  );
}

export default Navbar;
