import { configureStore } from "@reduxjs/toolkit";

import calendarReducer from "./features/calendar/context/calendarSlice";
import teamReducer from "./context/teamSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    team: teamReducer,
  },
});
