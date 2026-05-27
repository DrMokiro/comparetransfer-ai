create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  logo_url text,
  affiliate_url text,
  pros text[] not null default '{}',
  cons text[] not null default '{}',
  countries_available text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.comparisons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  amount numeric(14, 2) not null,
  from_country text not null,
  to_country text not null,
  send_currency text not null,
  receive_currency text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete cascade,
  comparison_id uuid references public.comparisons(id) on delete cascade,
  amount_received numeric(14, 2) not null,
  fee numeric(14, 2) not null,
  exchange_rate numeric(14, 6) not null,
  estimated_delay text not null,
  delivery_speed_hours numeric(8, 2) not null,
  global_score integer not null check (global_score between 0 and 100),
  created_at timestamptz not null default now()
);

create index if not exists comparisons_user_id_idx on public.comparisons(user_id);
create index if not exists offers_provider_id_idx on public.offers(provider_id);
create index if not exists offers_comparison_id_idx on public.offers(comparison_id);
