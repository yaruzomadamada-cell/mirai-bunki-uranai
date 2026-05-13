create extension if not exists "pgcrypto";

create table if not exists fortune_results (
  id uuid primary key default gen_random_uuid(),
  nickname text not null,
  birthdate date not null,
  gender text,
  theme text not null,
  situation text not null,
  concern text,
  type_number int not null,
  type_name text not null,
  free_result jsonb not null,
  premium_result jsonb not null,
  paid boolean default false,
  stripe_session_id text,
  created_at timestamp with time zone default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  fortune_result_id uuid references fortune_results(id),
  stripe_session_id text,
  provider text,
  provider_payment_id text,
  amount int,
  currency text default 'jpy',
  status text,
  created_at timestamp with time zone default now()
);

alter table payments
  add column if not exists provider text,
  add column if not exists provider_payment_id text;

alter table fortune_results enable row level security;
alter table payments enable row level security;

create index if not exists fortune_results_stripe_session_id_idx
  on fortune_results (stripe_session_id);

create index if not exists payments_fortune_result_id_idx
  on payments (fortune_result_id);

create index if not exists payments_provider_payment_id_idx
  on payments (provider, provider_payment_id);

-- Public browser access is intentionally not granted by policy.
-- The Next.js server uses SUPABASE_SERVICE_ROLE_KEY from server-only code.
