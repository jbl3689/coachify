import Calendar from "./Calendar";
import { render } from "@testing-library/react";

describe(Calendar, () => {
  it("renders without crashing", () => {
    render(<Calendar />);
  });
});
