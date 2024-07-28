import styled from "styled-components";

export const CalendarContainer = styled.div`
  display: grid;
  height: 400px;
  grid-template-rows: repeat(4, 1fr);
  padding: 0.5rem;
  font-size: 2xl;
  transition: all;
  border-radius: 0.375rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-color: #fde68a;
  color: #d1d5db;
  &:hover {
    font-weight: 600;
  }
  background-color: var();
  width: 91.666667%;
  margin-left: auto;
  margin-right: auto;
`;

export const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;
`;

export const EventRow = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  margin: 0 auto;
  min-height: 6rem;
  &:nth-child(2) {
    border-bottom-width: 2px;
  }
`;

// Add more styled components as needed
