import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";

function Header() {
  return (
    <header className="flex items-center justify-between flex-shrink-0 px-6 py-3 font-semibold max-h-28 text-textBase">
      <Link to="/" className="text-4xl text-accentBase">
        Coachify
      </Link>
      <div className="flex gap-10 text-xl">
        <DropdownMenu>
          <DropdownMenuTrigger>Calendar</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to="/calendar">Week View</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Month View</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Add New Event</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>Account</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to="/account">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
