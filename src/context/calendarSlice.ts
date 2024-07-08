import { createSlice } from "@reduxjs/toolkit";
import {
  ReduxAppState,
  DayState,
  ReduxDayState,
  WeekState,
} from "../types/types";

export type CalendarState = {
  prevWeek: {
    date: WeekState | null;
    days: ReduxDayState[] | null;
  };
  currWeek: {
    date: WeekState | null;
    days: ReduxDayState[] | null;
  };
  nextWeek: {
    date: WeekState | null;
    days: ReduxDayState[] | null;
  };
};

const initialState: CalendarState = {
  prevWeek: {
    date: null,
    days: null,
  },
  currWeek: {
    date: null,
    days: null,
  },
  nextWeek: {
    date: null,
    days: null,
  },
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setWeekDate: (state, action) => {
      state.currWeek.date = action.payload;
    },
    setWeekDays: (state, action) => {
      if (!action.payload) return;
      const modifiedPayload = action.payload.map((day: DayState) => ({
        ...day,
        events: [], // Add an empty events array to each day
      }));
      state.currWeek.days = modifiedPayload;
    },
    setDayEvents: (state, action) => {
      const { dayDate, events } = action.payload;
      if (!state.currWeek.days) {
        return state;
      }

      const dayIndex = state.currWeek.days.findIndex(
        (day) => day.date === dayDate
      );
      if (dayIndex !== -1) {
        // Update the events for the found day.
        state.currWeek.days[dayIndex].events.push(events);
      }
    },
    moveWeeks: (state, action) => {
      const weekDirection = action.payload;
      if (weekDirection === 1) {
        state.prevWeek = { ...state.currWeek };
        state.currWeek = { ...state.nextWeek };
        state.nextWeek = { date: null, days: null };
      } else if (weekDirection === -1) {
        state.prevWeek = { date: null, days: null };
        state.currWeek = { ...state.prevWeek };
        state.nextWeek = { ...state.currWeek };
      }
    },
  },
});

export const { setWeekDate, setWeekDays, setDayEvents, moveWeeks } =
  calendarSlice.actions;

// Selectors
export const selectCurrentWeek = (state: ReduxAppState) =>
  state.calendar.currWeek;
export const selectPreviousWeek = (state: ReduxAppState) =>
  state.calendar.prevWeek;
export const selectNextWeek = (state: ReduxAppState) => state.calendar.nextWeek;
export const selectCurrentWeekDate = (state: ReduxAppState) =>
  state.calendar.currWeek.date;
export const selectCurrentWeekDays = (state: ReduxAppState) =>
  state.calendar.currWeek.days;
export const selectCurrentWeekDayEvents = (
  state: ReduxAppState,
  date: string
) => state.calendar.currWeek.days?.find((day) => day.date === date)?.events;

export default calendarSlice.reducer;
