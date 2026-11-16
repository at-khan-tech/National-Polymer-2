-- Migration: Create grades table
create table if not exists public.grades (
  id text primary key,
  brand text not null,
  origin text not null,
  category text not null,
  sub_category text not null,
  grade text not null,
  application text not null,
  mfi text not null,
  density text not null,
  availability text not null default 'Available on request',
  status text not null default 'Verified' check (status in ('Verified', 'Pending')),
  tds_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists grades_brand_idx on public.grades (lower(brand));
create index if not exists grades_category_idx on public.grades (lower(category));
create index if not exists grades_grade_idx on public.grades (lower(grade));

-- Optional update trigger
drop trigger if exists grades_set_updated_at on public.grades;
create trigger grades_set_updated_at
before update on public.grades
for each row execute function public.set_updated_at();
