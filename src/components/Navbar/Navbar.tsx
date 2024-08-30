import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { useLogout } from "./hooks/useLogout";
import { useUser } from "@/hooks/useUser";
import Loader from "../ui/Loader";

function Navbar() {
  const { logout, isPending } = useLogout();
  const { isAuthenticated, isLoading, isFetching, user } = useUser();

  if (isPending || isLoading || isFetching) return <Loader />;

  return (
    <header className="flex items-center justify-between flex-shrink-0 px-6 py-3 font-semibold max-h-28 text-textBase transition-all">
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
                Welcome{" "}
                {user?.user_metadata ? user.user_metadata.full_name : "User"}
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
