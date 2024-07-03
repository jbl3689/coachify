import { createSlice } from "@reduxjs/toolkit";
import { AppState, CalendarState } from "../types/types";

const initialState: CalendarState = {
  currentWeek: new Date("2024-05-27"),
  weeks: [
    {
      startDate: new Date("2024-05-04"),
      days: [
        {
          dayId: 1,
          date: new Date("2024-05-04"),
          selectedDay: "Monday",
          events: [],
        },
        {
          dayId: 2,
          date: new Date("2024-05-05"),
          selectedDay: "Tuesday",
          events: [
            {
              eventId: 1,
              type: "training",
              startTime: "18:00",
              duration: 2,
              location: "Coachify Reserve",
              players: [{ playerId: 1, name: "Jorge Esta", canAttend: true }],
            },
          ],
        },
        {
          dayId: 3,
          date: new Date("2024-05-06"),
          selectedDay: "Wednesday",
          events: [],
        },
        {
          dayId: 4,
          date: new Date("2024-05-07"),
          selectedDay: "Thursday",
          events: [],
        },
        {
          dayId: 5,
          date: new Date("2024-05-08"),
          selectedDay: "Friday",
          events: [],
        },
        {
          dayId: 6,
          date: new Date("2024-05-09"),
          selectedDay: "Saturday",
          events: [],
        },
        {
          dayId: 7,
          date: new Date("2024-05-10"),
          selectedDay: "Sunday",
          events: [],
        },
      ],
    },
  ],
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
    changeCurrentWeek: (state, action) => {
      state.currentWeek = action.payload;
    },
    addWeek: (state, action) => {
      if (findWeek(action.payload)) return;

      const weekStartDate = action.payload;
      const weekDays = [];
      // add 7 days to the weekDays array
      for (let i = 0; i < 7; i++) {
        weekDays.push({
          dayId: i + 1,
          date: addDays(new Date(weekStartDate), i + 1),
          selectedDay: "Monday",
          events: [],
        });
      }

      // add a new week object to the weeks array
      state.weeks.push({
        startDate: weekStartDate,
        days: [
          weekDays[0],
          weekDays[1],
          weekDays[2],
          weekDays[3],
          weekDays[4],
          weekDays[5],
          weekDays[6],
        ],
      });

      // console.log(state.weeks);
    },
  },
});

export const { addWeek } = calendarSlice.actions;

export default calendarSlice.reducer;

export const findWeek = (date: Date) => (state: AppState) => {
  return state.calendar.weeks.find((week) => week.startDate === date) ?? null;
};
