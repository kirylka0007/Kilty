-- ============================================================
-- Mafia Kilty — Supabase Schema
-- Run this in Supabase SQL Editor (Settings > SQL Editor)
-- ============================================================

-- 1. Enable UUID generation
create extension if not exists "pgcrypto";

-- 2. Events table
create table events (
  id          uuid primary key default gen_random_uuid(),
  city        text not null check (city in ('Edinburgh', 'Glasgow')),
  date        date not null,
  time        time not null default '19:00',
  venue       text not null,
  description text not null default '',
  total_spots integer not null default 20,
  price_pence integer not null default 2000,
  is_published boolean not null default false,
  created_at  timestamptz not null default now(),

  unique (city, date)
);

-- 3. Registrations table
create table registrations (
  id                uuid primary key default gen_random_uuid(),
  event_id          uuid not null references events (id) on delete cascade,
  full_name         text not null,
  email             text not null,
  telegram          text,
  instagram         text,
  telephone         text,
  payment_status    text not null default 'paid'
                    check (payment_status in ('paid', 'refunded')),
  stripe_session_id text unique not null,
  created_at        timestamptz not null default now()
);

-- Index for fast lookups by event + email (duplicate check)
create index idx_registrations_event_email
  on registrations (event_id, email);

-- Index for webhook lookups by stripe session
create index idx_registrations_stripe_session
  on registrations (stripe_session_id);

-- 4. Event availability view
-- Counts only 'paid' registrations (rows are only created after payment).
create or replace view event_availability as
select
  e.*,
  coalesce(r.registration_count, 0)::integer as registration_count,
  (e.total_spots - coalesce(r.registration_count, 0))::integer as spots_remaining
from events e
left join (
  select
    event_id,
    count(*) as registration_count
  from registrations
  where payment_status = 'paid'
  group by event_id
) r on r.event_id = e.id;

-- ============================================================
-- Row Level Security
-- ============================================================

-- 5. Enable RLS on both tables
alter table events enable row level security;
alter table registrations enable row level security;

-- 6. Events: anyone can read published events (via anon key)
create policy "Public can read published events"
  on events for select
  using (is_published = true);

-- 7. Events: only service role can insert/update/delete
--    (no policy needed — RLS blocks anon by default for writes)

-- 8. Registrations: only service role can read/write
--    (no anon select policy — admin uses service role key)
--    The server action uses the service role key for inserts,
--    and the webhook handler uses it for updates.

-- ============================================================
-- Sample test events (delete or modify as needed)
-- ============================================================

insert into events (city, date, time, venue, description, total_spots, price_pence, is_published)
values
  ('Edinburgh', current_date + interval '14 days', '19:00', 'The Voodoo Rooms',
   'An evening of social deduction in the heart of Edinburgh. Masks provided, drinks available at the bar.',
   20, 2000, true),

  ('Edinburgh', current_date + interval '28 days', '19:00', 'The Voodoo Rooms',
   'Our second Edinburgh night this month. Beginners welcome!',
   20, 2000, true),

  ('Glasgow', current_date + interval '21 days', '19:00', 'The Butterfly and the Pig',
   'Mafia Kilty comes to Glasgow. Expect bluffing, laughter, and a few betrayals.',
   20, 2000, true);
