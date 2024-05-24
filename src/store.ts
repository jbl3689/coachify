import { configureStore } from "@reduxjs/toolkit";

import calendarReducer from "./features/calendar/calendarSlice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});
