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
import Loader from "../ui/Loader";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { FlexBox } from "../ui/FlexBox";
import { useUser } from "@/hooks/user/useUser";

function Navbar() {
  const { logout, isPending } = useLogout();
  const { isAuthenticated, isLoading, isFetching } = useAuthUser();
  const { user } = useUser();
  const userInitials = user?.full_name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (isPending || isLoading || isFetching) return <Loader />;

  return (
    <header className="flex items-center justify-between flex-shrink-0 px-6 py-3 font-semibold transition-all max-h-28 text-textBase">
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
                <DropdownMenuItem onClick={() => logout()} disabled={isPending}>
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
    </header>
  );
}

export default Navbar;
