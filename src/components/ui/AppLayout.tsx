import { Outlet } from "react-router-dom";

import styled from "styled-components";
import { Navbar } from "../Navbar";

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: hsl(var(--background));
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
        <main className="mx-auto w-full max-w-screen-2xl px-4 py-6 text-base sm:px-8 sm:py-8">
          <Outlet />
        </main>
      </StyledMainWrapper>
    </StyledAppLayout>
  );
}

export default AppLayout;
