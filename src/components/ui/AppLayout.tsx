import { Outlet } from 'react-router-dom';

import Header from './Header';

function AppLayout() {
  return (
    <div className="flex flex-col h-screen bg-bgPrimary">
      <Header />
      <div className="flex-grow overflow-y-scroll">
        <main className="w-11/12 mx-auto my-10 text-xl text-center text-textBase">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
