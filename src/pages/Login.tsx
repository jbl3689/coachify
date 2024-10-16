import Heading from "../components/ui/Heading";
import LoginForm from "../components/LoginForm/LoginForm";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useBreakpoint from "use-breakpoint";
import { BREAKPOINTS } from "@/types/types";

export const LoginLayout = styled.main`
  min-height: 60vh;
  display: grid;
  grid-template-columns: 100%;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
`;

function Login() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  return (
    <LoginLayout>
      <div>
        <Heading as={breakpoint === "mobile" ? "h3" : "h2"}>
          Log in to your account
        </Heading>
        <Heading
          as={breakpoint === "mobile" ? "h4" : "h3"}
          className="text-textAlt"
        >
          or create one{" "}
          <Link
            to="/signup"
            className="text-primary hover:cursor-pointer hover:text-primaryLight"
          >
            here
          </Link>
        </Heading>
      </div>

      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
