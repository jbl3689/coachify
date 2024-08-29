import Heading from "../ui/Heading";
import LoginForm from "./LoginForm/LoginForm";
import { LoginLayout } from "./Login.styles";

function Login() {
  return (
    <LoginLayout>
      <Heading as="h1">log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
