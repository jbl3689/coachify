import SignupForm from "@/components/SignupForm/SignupForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styled from "styled-components";
import AccountDetails from "@/components/AccountDetails/AccountDetails";
import UserForm from "@/components/UserForm/UserForm";

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
    </AccountContainer>
  );
}

export default Account;
