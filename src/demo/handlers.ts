import { http, HttpResponse } from "msw";
import {
  demoAttendance,
  demoDays,
  demoEvents,
  demoMembers,
  demoTeams,
  demoUsers,
  demoWeeks,
} from "./fixtures";

const tables: Record<string, Record<string, unknown>[]> = {
  users: demoUsers as unknown as Record<string, unknown>[],
  teams: demoTeams as unknown as Record<string, unknown>[],
  team_members: demoMembers,
  weeks: demoWeeks as unknown as Record<string, unknown>[],
  days: demoDays as unknown as Record<string, unknown>[],
  events: demoEvents as unknown as Record<string, unknown>[],
  eventsAttendance: demoAttendance as unknown as Record<string, unknown>[],
};

function matches(value: unknown, filter: string) {
  const actual = String(value);
  if (filter.startsWith("eq.")) return actual === filter.slice(3);
  if (filter.startsWith("in.(")) {
    return filter.slice(4, -1).split(",").includes(actual);
  }
  if (filter.startsWith("not.in.(")) {
    return !filter.slice(8, -1).split(",").includes(actual);
  }
  return false;
}

export const demoHandlers = [
  http.get("/__demo_supabase/auth/v1/user", () =>
    HttpResponse.json({
      id: "guest-coach",
      role: "authenticated",
      email: "coach@example.invalid",
    }),
  ),
  http.get("/__demo_supabase/rest/v1/:table", ({ request, params }) => {
    const rows = tables[String(params.table)];
    if (!rows)
      return HttpResponse.json(
        { message: "Unknown demo table" },
        { status: 404 },
      );

    const query = new URL(request.url).searchParams;
    const result = rows.filter((row) =>
      [...query.entries()].every(([field, filter]) =>
        ["select", "order", "limit", "offset"].includes(field)
          ? true
          : matches(row[field], filter),
      ),
    );

    const selected = query.get("select");
    const columns = selected && selected !== "*" ? selected.split(",") : null;
    const payload = columns
      ? result.map((row) =>
          Object.fromEntries(columns.map((column) => [column, row[column]])),
        )
      : result;

    if (request.headers.get("accept")?.includes("vnd.pgrst.object+json")) {
      return payload.length === 1
        ? HttpResponse.json(payload[0])
        : HttpResponse.json(
            { message: "Expected one demo row" },
            { status: 406 },
          );
    }
    return HttpResponse.json(payload);
  }),
  // Supabase writes and any unrecognised API call are refused. The guest
  // client itself is pinned to this local origin path, never the live URL.
  http.all("/__demo_supabase", () =>
    HttpResponse.json(
      { message: "Guest access is read only" },
      { status: 403 },
    ),
  ),
  http.all("/__demo_supabase/*", () =>
    HttpResponse.json(
      { message: "Guest access is read only" },
      { status: 403 },
    ),
  ),
];
