import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 max-h-28 text-gray-100 font-semibold">
      <Link to="/" className="text-4xl">
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
