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

// Define your logic here
export const calendarLogic = () => {};

// Export any additional functions or variables if needed
export const anotherFunction = () => {
  // Your function implementation goes here
};
