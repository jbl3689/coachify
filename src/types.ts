export interface AppState {
  calendar: CalendarState;
}

export type CalendarState = {
  currentWeek: Date;
  weeks: {
    startDate: Date;
    days: {
      dayId: number;
      date: Date;
      selectedDay: string;
      events: {
        eventId: number;
        type: string;
        startTime: string;
        duration: number;
        location: string;
        players: {
          playerId: number;
          name: string;
          canAttend: boolean;
        }[];
      }[];
    }[];
  }[];
};

export type dayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
