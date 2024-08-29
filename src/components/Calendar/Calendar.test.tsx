import { render } from "@testing-library/react";

import Calendar from "./CalendarWeek";

describe(Calendar, () => {
  it("renders without crashing", () => {
    render(<Calendar />);
  });
});
