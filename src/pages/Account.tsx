import SignupForm from "@/components/SignupForm/SignupForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styled from "styled-components";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AccountDetails from "@/components/AccountDetails/AccountDetails";

const AccountContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  height: 80vh;
`;

function Account() {
  return (
    <AccountContainer>
      <AccountDetails />
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>Update account details</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </AccountContainer>
  );
}

export default Account;
