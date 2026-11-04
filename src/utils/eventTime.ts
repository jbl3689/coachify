export function eventDurationMinutes(start: string, end: string) {
  if (!start || !end) return 0;
  const toMinutes = (value: string) => {
    const [hours, minutes] = value.split(":").map(Number);
    return hours * 60 + minutes;
  };
  const duration = toMinutes(end) - toMinutes(start);
  return duration < 0 ? duration + 24 * 60 : duration;
}

export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return (
    [hours ? `${hours}h` : "", remainder ? `${remainder}m` : ""]
      .filter(Boolean)
      .join(" ") || "0m"
  );
}
