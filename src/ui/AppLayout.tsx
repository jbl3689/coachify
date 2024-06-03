import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="grid bg-bgDark h-screen grid-rows-[auto-1fr-auto]">
      <Header />
      <div className="my-10 overflow-auto">
        <main className="w-5/6 mx-auto text-xl text-center text-primaryColor">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
