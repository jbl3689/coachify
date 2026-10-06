import Heading from "../components/ui/Heading";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import SignupForm from "@/components/SignupForm/SignupForm";
import { BREAKPOINTS } from "@/types/types";
import useBreakpoint from "use-breakpoint";
import { enterGuestMode } from "@/demo/session";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

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
  const navigate = useNavigate();
  const [isStartingDemo, setIsStartingDemo] = useState(false);

  async function handleExploreDemo() {
    setIsStartingDemo(true);
    try {
      await enterGuestMode();
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("The demo could not be started. Please try again.");
      console.error(error);
      setIsStartingDemo(false);
    }
  }

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
      <Button
        variant="outline"
        className="justify-self-center"
        onClick={handleExploreDemo}
        disabled={isStartingDemo}
      >
        {isStartingDemo ? "Starting demo…" : "Explore demo"}
      </Button>
    </SignupLayout>
  );
}

export default Signup;
