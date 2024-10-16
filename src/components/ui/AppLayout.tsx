import { Outlet } from "react-router-dom";

import styled from "styled-components";
import Navbar from "../Navbar/Navbar";

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--background);
`;

const StyledMainWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: none;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Navbar />
      <StyledMainWrapper>
        <main className="w-11/12 mx-auto my-6 text-xl text-center text-textBase">
          <Outlet />
        </main>
      </StyledMainWrapper>
    </StyledAppLayout>
  );
}

export default AppLayout;
