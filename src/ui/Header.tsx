import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 font-semibold max-h-28 text-textBase">
      <Link to="/" className="text-4xl text-accentBase">
        Coachify
      </Link>
      <div className="flex gap-10 text-xl">
        <Link to="/calendar">
          <h3>Calendar</h3>
        </Link>
        <Link to="/user">
          <h3>Account</h3>
        </Link>
      </div>
    </header>
  );
}

export default Header;
