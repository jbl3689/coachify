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
      <Card className="w-full h-full">
        <CardHeader>Account</CardHeader>
        <CardContent>
          <Carousel className="w-full max-w-xs  mx-auto">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-10">
                        <span className="text-4xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>
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
