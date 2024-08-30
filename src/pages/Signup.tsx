import Heading from "../components/ui/Heading";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SignupForm from "@/components/SignupForm/SignupForm";

export const SignupLayout = styled.main`
  min-height: 60vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
`;

function Login() {
  return (
    <SignupLayout>
      <div>
        <Heading as="h1">Create an account</Heading>
        <Heading as="h3" className="text-textAlt">
          or login{" "}
          <Link
            to="/login"
            className="text-primary hover:cursor-pointer hover:text-primaryLight"
          >
            here
          </Link>
        </Heading>
      </div>

      <SignupForm />
    </SignupLayout>
  );
}

export default Login;
