import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  week: [{ selectedDay: "Monday", weekStartDate: "2024-01-04", events: [] }],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    // addEvent(state, action) {
    //   const { selectedDay, event } = action.payload;
    //   const day = state.week.find((day) => day.selectedDay === selectedDay);
    //   day.events.push(event);
    // },
    // removeEvent(state, action) {
    //   const { selectedDay, eventId } = action.payload;
    //   const day = state.week.find((day) => day.selectedDay === selectedDay);
    //   day.events = day.events.filter((event) => event.id !== eventId);
    // },
  },
});

// export const { addEvent, removeEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
