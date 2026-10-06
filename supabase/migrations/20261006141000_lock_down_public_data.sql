-- The previous policies used TO public USING (true), including FOR ALL.
-- Replace them with team-scoped rules before the web app is published.

revoke all on all tables in schema public from public, anon, authenticated;
revoke execute on function public.increment(integer) from public, anon;

drop policy if exists "Enable read access for all users" on public.days;
drop policy if exists "Enable read access for all users" on public.events;
drop policy if exists "Enable all access for all users" on public."eventsAttendance";
drop policy if exists "Enable all access for all users" on public.team_members;
drop policy if exists "Enable read access for all users" on public.teams;
drop policy if exists "Enable all access for all users" on public.users;
drop policy if exists "Enable read access for all users" on public.users;
drop policy if exists "Enable read access for all users" on public.weeks;

create or replace function public.current_profile_id()
returns bigint language sql stable security definer set search_path = ''
as $$
  select id from public.users where auth_user_id = (select auth.uid())
$$;

create or replace function public.is_team_member(p_team_id bigint)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.team_members tm
    join public.users u on u.id = tm.user_id
    where tm.team_id = p_team_id and u.auth_user_id = (select auth.uid())
  )
$$;

create or replace function public.is_team_admin(p_team_id bigint)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.team_members tm
    join public.users u on u.id = tm.user_id
    where tm.team_id = p_team_id and tm.is_admin
      and u.auth_user_id = (select auth.uid())
  )
$$;

create or replace function public.is_team_member_for_day(p_day_id bigint)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.days d
    join public.weeks w on w.id = d.week_id
    join public.team_members tm on tm.team_id = w.team_id
    join public.users u on u.id = tm.user_id
    where d.id = p_day_id and u.auth_user_id = (select auth.uid())
  )
$$;

create or replace function public.is_team_admin_for_day(p_day_id bigint)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.days d
    join public.weeks w on w.id = d.week_id
    join public.team_members tm on tm.team_id = w.team_id and tm.is_admin
    join public.users u on u.id = tm.user_id
    where d.id = p_day_id and u.auth_user_id = (select auth.uid())
  )
$$;

create or replace function public.is_team_member_for_event(p_event_id bigint)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.events e
    join public.days d on d.id = e.day_id
    join public.weeks w on w.id = d.week_id
    join public.team_members tm on tm.team_id = w.team_id
    join public.users u on u.id = tm.user_id
    where e.id = p_event_id and u.auth_user_id = (select auth.uid())
  )
$$;

revoke all on function public.current_profile_id() from public, anon;
revoke all on function public.is_team_member(bigint) from public, anon;
revoke all on function public.is_team_admin(bigint) from public, anon;
revoke all on function public.is_team_member_for_day(bigint) from public, anon;
revoke all on function public.is_team_admin_for_day(bigint) from public, anon;
revoke all on function public.is_team_member_for_event(bigint) from public, anon;
grant execute on function public.current_profile_id() to authenticated;
grant execute on function public.is_team_member(bigint) to authenticated;
grant execute on function public.is_team_admin(bigint) to authenticated;
grant execute on function public.is_team_member_for_day(bigint) to authenticated;
grant execute on function public.is_team_admin_for_day(bigint) to authenticated;
grant execute on function public.is_team_member_for_event(bigint) to authenticated;
grant execute on function public.increment(integer) to authenticated;

grant select on public.users, public.team_members, public.teams,
  public.weeks, public.days, public.events, public."eventsAttendance"
  to authenticated;
grant insert on public.team_members to authenticated;
grant update (full_name, pos_primary, pos_secondary, avatar_url)
  on public.users to authenticated;
grant update (team_name, location, logo) on public.teams to authenticated;
grant insert, update on public.weeks, public.days to authenticated;
grant insert, update, delete on public.events to authenticated;
grant insert, update, delete on public."eventsAttendance" to authenticated;

create policy "Members can read profiles in their teams"
on public.users for select to authenticated
using (
  auth_user_id = (select auth.uid())
  or exists (
    select 1 from public.team_members tm
    where tm.user_id = users.id and public.is_team_member(tm.team_id)
  )
);

create policy "Members and coaches can edit limited profile fields"
on public.users for update to authenticated
using (
  auth_user_id = (select auth.uid())
  or exists (
    select 1 from public.team_members tm
    where tm.user_id = users.id and public.is_team_admin(tm.team_id)
  )
)
with check (
  auth_user_id = (select auth.uid())
  or exists (
    select 1 from public.team_members tm
    where tm.user_id = users.id and public.is_team_admin(tm.team_id)
  )
);

create policy "Members can read their team roster"
on public.team_members for select to authenticated
using (public.is_team_member(team_id));

create policy "Coaches can add members to their teams"
on public.team_members for insert to authenticated
with check (public.is_team_admin(team_id) and not is_admin);

create policy "Members can read their teams"
on public.teams for select to authenticated
using (public.is_team_member(id));

create policy "Coaches can edit their teams"
on public.teams for update to authenticated
using (public.is_team_admin(id))
with check (public.is_team_admin(id));

create policy "Members can read their weeks"
on public.weeks for select to authenticated
using (public.is_team_member(team_id));

create policy "Coaches can add their weeks"
on public.weeks for insert to authenticated
with check (public.is_team_admin(team_id));

create policy "Coaches can edit their weeks"
on public.weeks for update to authenticated
using (public.is_team_admin(team_id))
with check (public.is_team_admin(team_id));

create policy "Members can read their days"
on public.days for select to authenticated
using (exists (
  select 1 from public.weeks w
  where w.id = days.week_id and public.is_team_member(w.team_id)
));

create policy "Coaches can add their days"
on public.days for insert to authenticated
with check (exists (
  select 1 from public.weeks w
  where w.id = days.week_id and public.is_team_admin(w.team_id)
));

create policy "Coaches can edit their days"
on public.days for update to authenticated
using (exists (
  select 1 from public.weeks w
  where w.id = days.week_id and public.is_team_admin(w.team_id)
))
with check (exists (
  select 1 from public.weeks w
  where w.id = days.week_id and public.is_team_admin(w.team_id)
));

create policy "Members can read their events"
on public.events for select to authenticated
using (public.is_team_member_for_day(day_id));

create policy "Coaches can add their events"
on public.events for insert to authenticated
with check (public.is_team_admin_for_day(day_id));

create policy "Coaches can edit their events"
on public.events for update to authenticated
using (public.is_team_admin_for_day(day_id))
with check (public.is_team_admin_for_day(day_id));

create policy "Coaches can delete their events"
on public.events for delete to authenticated
using (public.is_team_admin_for_day(day_id));

create policy "Members can read attendance for their events"
on public."eventsAttendance" for select to authenticated
using (public.is_team_member_for_event(event_id));

create policy "Members can RSVP to their events"
on public."eventsAttendance" for insert to authenticated
with check (
  user_id = public.current_profile_id()
  and public.is_team_member_for_event(event_id)
);

create policy "Members can update their RSVP"
on public."eventsAttendance" for update to authenticated
using (
  user_id = public.current_profile_id()
  and public.is_team_member_for_event(event_id)
)
with check (
  user_id = public.current_profile_id()
  and public.is_team_member_for_event(event_id)
);

create policy "Members can remove their RSVP"
on public."eventsAttendance" for delete to authenticated
using (
  user_id = public.current_profile_id()
  and public.is_team_member_for_event(event_id)
);
