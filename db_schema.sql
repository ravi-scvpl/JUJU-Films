-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Contacts (Leads) Table
create table public.contacts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  type text not null, -- 'brand', 'creator', 'internship', 'job'
  first_name text,
  last_name text,
  email text not null,
  phone text,
  company text,     -- Brand only
  address text,     -- Brand only
  deadline text,    -- Brand only
  budget text,      -- Brand only
  portfolio_url text, -- Creator only
  message text,     -- Request or 'Tell us about yourself'
  file_url text,    -- For attached files (resumes/briefs)
  status text default 'new' -- 'new', 'contacted', 'archived'
);

-- 2. Blog Posts Table
create table public.blog_posts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text unique not null,
  content text,
  image_url text,
  meta_title text,
  meta_desc text,
  published boolean default false
);

-- 3. Influencer Posts Table
create table public.influencer_posts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  content text,
  image_url text,
  meta_title text,
  meta_desc text,
  published boolean default false
);

-- 4. Storage Buckets (Policies need to be set in Dashboard manually or via specific SQL if allowed)
-- You typically create 'blog-images', 'influencer-images', and 'contact-uploads' buckets in the Storage UI.

-- Enable Row Level Security (RLS)
alter table public.contacts enable row level security;
alter table public.blog_posts enable row level security;
alter table public.influencer_posts enable row level security;

-- Policies (Adjust based on authentication needs)
-- For development/demo, we might allow public insert for contacts (since it's a public form)
create policy "Allow public insert for contacts"
on public.contacts for insert
with check (true);

-- Allow authenticated users (Admins) to view all contacts
create policy "Allow authenticated view contacts"
on public.contacts for select
using (auth.role() = 'authenticated');

-- Blog/Influencer: Public can read, Auth can all
create policy "Public can view published blog posts"
on public.blog_posts for select
using (true);

create policy "Admin can do everything on blog posts"
on public.blog_posts for all
using (auth.role() = 'authenticated');

create policy "Public can view published influencer posts"
on public.influencer_posts for select
using (true);

create policy "Admin can do everything on influencer posts"
on public.influencer_posts for all
using (auth.role() = 'authenticated');
