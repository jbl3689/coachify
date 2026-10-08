import styled from "styled-components";
import AccountDetails from "@/components/AccountDetails/AccountDetails";

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  min-height: 80vh;
  padding: 1rem 0;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

function Account() {
  return (
    <AccountContainer>
      <AccountDetails />
    </AccountContainer>
  );
}

export default Account;
