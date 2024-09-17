import { Link } from "react-router-dom";

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

function Navbar() {
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
            <div className="flex flex-col gap-2">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-20 h-6" />
            </div>
          </div>
        </>
      ) : (
        <>
          <Link to="/" className="text-4xl text-accentBase">
            Coachify
          </Link>
          <div className="flex gap-10 text-xl">
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>Calendar</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to="/calendar">Week View</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Month View</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Add New Event</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <FlexBox container alignItems="center" gap="10px">
                      Account{" "}
                      <Avatar>
                        {/* <AvatarImage src={"https://github.com/shadcn.png"} /> */}
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
                <Link to="/login">Login</Link>
                {/* <Separator /> */}
                <Link to="/signup">Create an account</Link>
              </>
            )}
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
