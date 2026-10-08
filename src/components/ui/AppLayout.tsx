import { Outlet } from "react-router-dom";

import styled from "styled-components";
import { Navbar } from "../Navbar";

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: var(--background);
`;

const StyledMainWrapper = styled.div`
  flex-grow: 1;
  min-height: 0;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Navbar />
      <StyledMainWrapper>
        <main className="mx-auto w-full max-w-screen-2xl px-3 text-base sm:px-6 sm:text-lg">
          <Outlet />
        </main>
      </StyledMainWrapper>
    </StyledAppLayout>
  );
}

export default AppLayout;
