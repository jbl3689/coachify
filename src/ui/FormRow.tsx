import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  gap: 5px;
  align-items: center;

  padding: 0.7rem;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-top: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface FormRowProps {
  label?: string;
  error?: string;
  children: React.ReactElement;
}

function FormRow({ label, error, children }: FormRowProps) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
