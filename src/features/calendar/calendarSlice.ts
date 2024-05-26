import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weeks: [
    {
      weekNumber: 1,
      startDate: "2024-05-04",
      days: [
        { dayId: 1, date: "2024-05-04", selectedDay: "Monday", events: [] },
        {
          dayId: 2,
          date: "2024-05-05",
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
        { dayId: 3, date: "2024-05-06", selectedDay: "Wednedsay", events: [] },
        { dayId: 3, date: "2024-05-06", selectedDay: "Wednedsay", events: [] },
        { dayId: 4, date: "2024-05-07", selectedDay: "Thursday", events: [] },
        { dayId: 5, date: "2024-05-08", selectedDay: "Friday", events: [] },
        { dayId: 6, date: "2024-05-09", selectedDay: "Saturday", events: [] },
        { dayId: 7, date: "2024-05-10", selectedDay: "Sunday", events: [] },
      ],
    },
  ],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    // COPILOT WRITTEN FUNCTIONS:
    addEvent: (state, action) => {
      const { weekNumber, dayId, event } = action.payload;
      const week = state.weeks.find((week) => week.weekNumber === weekNumber);
      if (week) {
        const day = week.days.find((day) => day.dayId === dayId);
        if (day) day.events.push(event);
      }
    },

    removeEvent: (state, action) => {
      const { weekNumber, dayId, eventId } = action.payload;
      const week = state.weeks.find((week) => week.weekNumber === weekNumber);
      if (week) {
        const day = week.days.find((day) => day.dayId === dayId);
        if (day)
          day.events = day.events.filter((event) => event.eventId !== eventId);
      }
    },
  },
});

export const { addEvent, removeEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
