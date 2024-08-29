import Heading from "../components/ui/Heading";
import LoginForm from "../components/Login/LoginForm/LoginForm";
import styled from "styled-components";

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
      <Heading as="h1">log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
