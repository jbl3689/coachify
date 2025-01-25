// calendarLogic.ts

export const startOfWeek = () => {
  const startOfWeek = new Date();
  const dayOfWeek = startOfWeek.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startOfWeek.setDate(startOfWeek.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek;
};

// Function to add days to a date
export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const roundToNearestBlock = (minuteBlock: number, offset?: number) => {
  const dateNow = new Date();
  const ms = 1000 * 60 * minuteBlock;
  let timeBlock = new Date(Math.ceil(dateNow.getTime() / ms) * ms);

  if (offset) {
    timeBlock.setMinutes(timeBlock.getMinutes() + offset);
  }

  return timeBlock.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

export const addMinutes = (dateString: string, minutes: number) => {
  const date = new Date(dateString);
  console.log("date", date);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};
