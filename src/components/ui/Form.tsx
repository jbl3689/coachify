import styled, { css } from "styled-components";

interface FormProps {
  type?: string;
}

const Form = styled.form<FormProps>`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 10px 4rem;

      /* Box */
      border: 1px solid var(--color-bgDark);
      border-radius: 10px;
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
