import styled from "styled-components";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "./Loader";
import { useAuthUser } from "@/hooks/auth/useAuthUser";
import { useUser } from "@/hooks/user/useUser";
import { useGuestMode } from "@/demo/session";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isGuest = useGuestMode();
  const { isAuthenticated, isLoading, isFetching } = useAuthUser();
  useUser(isAuthenticated || isGuest);
  // const isLoading = false;
  // const isFetching = false;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !isGuest && !isLoading && !isFetching)
      navigate("/login");
  }, [isAuthenticated, isGuest, isLoading, navigate, isFetching]);

  if (isGuest && location.pathname === "/account") {
    return <Navigate to="/" replace />;
  }

  if (isGuest) return children;

  if (!isGuest && isLoading)
    return (
      <FullPage>
        <Loader />
      </FullPage>
    );

  if (isAuthenticated || isGuest) return children;
}

export default ProtectedRoute;
