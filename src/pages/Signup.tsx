import Heading from "../components/ui/Heading";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SignupForm from "@/components/SignupForm/SignupForm";
import { BREAKPOINTS } from "@/types/types";
import useBreakpoint from "use-breakpoint";

export const SignupLayout = styled.div`
  min-height: 60vh;
  display: grid;
  grid-template-columns: 100%;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
`;

function Signup() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  return (
    <SignupLayout>
      <div>
        <Heading as={breakpoint === "mobile" ? "h3" : "h2"}>
          Create an account
        </Heading>
        <Heading
          as={breakpoint === "mobile" ? "h4" : "h3"}
          className="text-textAlt"
        >
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

export default Signup;
