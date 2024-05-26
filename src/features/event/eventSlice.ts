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
