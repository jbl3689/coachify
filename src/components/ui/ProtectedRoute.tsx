import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "./Loader";
import { useAuthUser } from "@/hooks/auth/useAuthUser";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, isFetching } = useAuthUser();
  // const isLoading = false;
  // const isFetching = false;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isFetching) navigate("/login");
  }, [isAuthenticated, isLoading, navigate, isFetching]);

  if (isLoading)
    return (
      <FullPage>
        <Loader />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
