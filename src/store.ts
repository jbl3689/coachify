import { configureStore } from "@reduxjs/toolkit";

import calendarReducer from "./context/calendarSlice";
import teamReducer from "./context/teamSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    team: teamReducer,
  },
});
