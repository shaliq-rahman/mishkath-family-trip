create table if not exists public.trip_data (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.trip_data enable row level security;

drop policy if exists "Trip data is server managed" on public.trip_data;

create policy "Trip data is server managed"
on public.trip_data
for all
using (false)
with check (false);

notify pgrst, 'reload schema';
