import styled from "styled-components";
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
    </AccountContainer>
  );
}

export default Account;
