import { createSlice } from "@reduxjs/toolkit";
import { CalendarState } from "../types/types";

const initialState: CalendarState = {
  currentWeek: null,
  selectedDay: {
    day: null,
    events: null,
  },
};

// Function to add days to a date
const addDays = (date: Date, days: number) => {
  date.setDate(date.getDate() + days);
  return date;
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCurrentWeek: (state, action) => {
      state.currentWeek = action.payload;
    },
    setSelectedDay: (state, action) => {
      state.selectedDay.day = action.payload;
    },
    setSelectedDayEvents: (state, action) => {
      state.selectedDay.events = action.payload;
    },
    addEvent: (state, action) => {
      if (state.selectedDay.events) {
        state.selectedDay.events.push(action.payload);
      } else {
        state.selectedDay.events = [action.payload];
      }
    },
  },
});

export const { setCurrentWeek, setSelectedDay } = calendarSlice.actions;

export default calendarSlice.reducer;
