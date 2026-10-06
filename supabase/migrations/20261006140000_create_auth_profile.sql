-- Keep Auth and app profiles in the same transaction. Supabase Dashboard
-- invitations have no browser session that can insert public.users safely.
create or replace function public.create_profile_for_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users (auth_user_id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
      split_part(new.email, '@', 1)
    )
  );
  return new;
end;
$$;

revoke all on function public.create_profile_for_auth_user() from public, anon, authenticated;

create trigger create_profile_for_auth_user
after insert on auth.users
for each row execute function public.create_profile_for_auth_user();
