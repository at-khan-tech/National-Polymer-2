create extension if not exists pgcrypto;

create table if not exists public.products (
  slug text primary key,
  name text not null,
  category text not null,
  tagline text not null,
  description text not null,
  overview text[] not null default '{}',
  specs jsonb not null default '[]'::jsonb,
  sub_types jsonb not null default '[]'::jsonb,
  applications text[] not null default '{}',
  packaging text[] not null default '{}',
  image_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blogs (
  slug text primary key,
  title text not null,
  date text not null,
  read_time text not null,
  status text not null default 'published' check (status in ('draft', 'published')),
  category text not null,
  author text not null,
  excerpt text not null,
  content text[] not null default '{}',
  image_url text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 1 and 60),
  type text not null check (type in ('blog', 'product')),
  created_at timestamptz not null default now()
);

create unique index if not exists admin_categories_type_name_unique
  on public.admin_categories (type, lower(name));

create table if not exists public.admin_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer text not null,
  email text not null,
  product text not null,
  quantity integer not null check (quantity > 0),
  total numeric(14, 2) not null check (total >= 0),
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'shipped', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company_name text not null,
  email text not null,
  phone text not null,
  destination_port text not null,
  country text not null,
  product_slug text not null,
  product_name text not null,
  grade text not null,
  volume text not null,
  packaging text not null,
  notes text not null default '',
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists admin_orders_created_at_idx on public.admin_orders (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists blogs_set_updated_at on public.blogs;
create trigger blogs_set_updated_at
before update on public.blogs
for each row execute function public.set_updated_at();

create or replace function public.rename_admin_category(p_id uuid, p_name text)
returns table (id uuid, name text, type text)
language plpgsql
set search_path = ''
as $$
declare
  old_name text;
  category_type text;
begin
  if length(trim(p_name)) not between 1 and 60 then
    raise exception 'Category names must be between 1 and 60 characters.';
  end if;

  select c.name, c.type into old_name, category_type
  from public.admin_categories as c
  where c.id = p_id
  for update;

  if not found then
    return;
  end if;

  update public.admin_categories as c
  set name = trim(p_name)
  where c.id = p_id;

  if category_type = 'blog' then
    update public.blogs set category = trim(p_name) where lower(category) = lower(old_name);
  else
    update public.products set category = trim(p_name) where lower(category) = lower(old_name);
  end if;

  return query
  select c.id, c.name, c.type from public.admin_categories as c where c.id = p_id;
end;
$$;

create or replace function public.delete_admin_category(p_id uuid)
returns void
language plpgsql
set search_path = ''
as $$
declare
  old_name text;
  category_type text;
  replacement_name text;
begin
  select c.name, c.type into old_name, category_type
  from public.admin_categories as c
  where c.id = p_id
  for update;

  if not found then
    raise exception 'Category not found.';
  end if;

  select c.name into replacement_name
  from public.admin_categories as c
  where c.type = category_type and c.id <> p_id
  order by c.name
  limit 1;

  if replacement_name is null then
    replacement_name := case when lower(old_name) = 'uncategorized' then 'General' else 'Uncategorized' end;
    insert into public.admin_categories (name, type)
    values (replacement_name, category_type);
  end if;

  if category_type = 'blog' then
    update public.blogs set category = replacement_name where lower(category) = lower(old_name);
  else
    update public.products set category = replacement_name where lower(category) = lower(old_name);
  end if;

  delete from public.admin_categories where id = p_id;
end;
$$;

alter table public.products enable row level security;
alter table public.blogs enable row level security;
alter table public.admin_categories enable row level security;
alter table public.admin_orders enable row level security;
alter table public.enquiries enable row level security;

revoke all on public.products, public.blogs, public.admin_categories, public.admin_orders, public.enquiries
  from public, anon, authenticated;
grant all on public.products, public.blogs, public.admin_categories, public.admin_orders, public.enquiries
  to service_role;

revoke all on function public.rename_admin_category(uuid, text) from public, anon, authenticated;
revoke all on function public.delete_admin_category(uuid) from public, anon, authenticated;
grant execute on function public.rename_admin_category(uuid, text) to service_role;
grant execute on function public.delete_admin_category(uuid) to service_role;
