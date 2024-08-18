import styled from "styled-components";
import React, { useEffect, useState } from "react";

const FadeInDiv = styled.div`
  opacity: 0;
  transition: opacity 1.5s ease-out;

  &.visible {
    opacity: 1;
  }
`;

interface FadeInContainerProps {
  children: React.ReactNode;
}

function FadeInContainer({ children }: FadeInContainerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <FadeInDiv className={isVisible ? "visible" : ""}>{children}</FadeInDiv>
  );
}

export default FadeInContainer;
