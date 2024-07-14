import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="grid bg-bg1 h-screen grid-rows-[auto-1fr-auto]">
      <Header />
      <div className="my-10 overflow-auto">
        <main className="w-11/12 mx-auto text-xl text-center text-textBase">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
