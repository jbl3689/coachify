import Heading from "../components/ui/Heading";
import LoginForm from "../components/LoginForm/LoginForm";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const LoginLayout = styled.main`
  min-height: 60vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
`;

function Login() {
  return (
    <LoginLayout>
      <div>
        <Heading as="h2">Log in to your account</Heading>
        <Heading as="h3" className="text-textAlt">
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
