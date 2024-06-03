import { configureStore } from "@reduxjs/toolkit";

import calendarReducer from "./features/calendar/calendarSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});
