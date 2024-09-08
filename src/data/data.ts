import { TeamState, WeekState, DayState, EventState } from "../types/types";

const imageUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/team-logos/`;

const teams: TeamState[] = [
  {
    id: 1,
    team_name: "Arsenal FC",
    location: "Emirates Stadium",
    logo: `${imageUrl}-arsenal.png`,
  },
  { id: 2, team_name: "Team Beta", location: "Los Angeles", logo: "logo2.png" },
  { id: 3, team_name: "Team Gamma", location: "Chicago", logo: "logo3.png" },
];

const weeks: WeekState[] = [
  { id: 1, week_start_date: "2023-10-01", is_populated: true, team_id: 1 },
  { id: 2, week_start_date: "2023-10-08", is_populated: false, team_id: 1 },
  { id: 3, week_start_date: "2023-10-01", is_populated: true, team_id: 2 },
  { id: 4, week_start_date: "2023-10-08", is_populated: false, team_id: 2 },
  { id: 5, week_start_date: "2023-10-01", is_populated: true, team_id: 3 },
  { id: 6, week_start_date: "2023-10-08", is_populated: false, team_id: 3 },
];

const days: DayState[] = [
  {
    id: 1,
    created_at: new Date(),
    date: "2023-10-01",
    week_id: 1,
    day: "Monday",
  },
  {
    id: 2,
    created_at: new Date(),
    date: "2023-10-02",
    week_id: 1,
    day: "Tuesday",
  },
  {
    id: 3,
    created_at: new Date(),
    date: "2023-10-03",
    week_id: 1,
    day: "Wednesday",
  },
  {
    id: 4,
    created_at: new Date(),
    date: "2023-10-04",
    week_id: 1,
    day: "Thursday",
  },
  {
    id: 5,
    created_at: new Date(),
    date: "2023-10-05",
    week_id: 1,
    day: "Friday",
  },
  {
    id: 6,
    created_at: new Date(),
    date: "2023-10-06",
    week_id: 1,
    day: "Saturday",
  },
  {
    id: 7,
    created_at: new Date(),
    date: "2023-10-07",
    week_id: 1,
    day: "Sunday",
  },
  // Add more days for other weeks as needed
];

// Generate dummy data for EventState
const events: EventState[] = [
  {
    id: 1,
    event_start_time: "08:00",
    event_end_time: "10:00",
    event_type: "Meeting",
    day_id: 1,
    location: "Conference Room A",
    is_morning: true,
  },
  {
    id: 2,
    event_start_time: "10:00",
    event_end_time: "12:00",
    event_type: "Workshop",
    day_id: 2,
    location: "Conference Room B",
    is_morning: true,
  },
  {
    id: 3,
    event_start_time: "13:00",
    event_end_time: "15:00",
    event_type: "Lunch",
    day_id: 3,
    location: "Cafeteria",
    is_morning: false,
  },
  {
    id: 4,
    event_start_time: "15:00",
    event_end_time: "17:00",
    event_type: "Presentation",
    day_id: 4,
    location: "Conference Room A",
    is_morning: false,
  },
  // Add more events for other days as needed
];

// Export the dummy data
export { teams, weeks, days, events };
