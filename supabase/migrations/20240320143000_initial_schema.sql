-- Migration: Initial Schema Creation
-- Description: Creates the initial schema for 10x-cards application including:
--   - Custom ENUM types for flashcard types and log types
--   - flashcards table with RLS policies
--   - ai_generation_logs table with RLS policies
--   - Appropriate indexes and constraints

-- Create custom ENUM types
create type flashcard_type as enum ('ai-full', 'ai-edited', 'manual');
create type log_type as enum ('success', 'error');

-- Create flashcards table
create table flashcards (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id),
    front_text varchar(200) not null,
    back_text varchar(500) not null,
    type flashcard_type not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    
    -- Add check constraints for text fields
    constraint front_text_length check (length(front_text) > 0 and length(front_text) <= 200),
    constraint back_text_length check (length(back_text) > 0 and length(back_text) <= 500)
);

-- Create indexes for flashcards
create index flashcards_user_id_idx on flashcards(user_id);
create index flashcards_created_at_idx on flashcards(created_at);

-- Create ai_generation_logs table
create table ai_generation_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id),
    log_content text not null,
    log_type log_type not null,
    created_at timestamptz not null default now()
);

-- Create indexes for ai_generation_logs
create index ai_generation_logs_user_id_idx on ai_generation_logs(user_id);
create index ai_generation_logs_created_at_idx on ai_generation_logs(created_at);

-- Enable Row Level Security
alter table flashcards enable row level security;
alter table ai_generation_logs enable row level security;

-- RLS Policies for flashcards

-- Policy for authenticated users to select their own flashcards
create policy "Users can view their own flashcards"
    on flashcards
    for select
    to authenticated
    using (user_id = auth.uid());

-- Policy for authenticated users to insert their own flashcards
create policy "Users can insert their own flashcards"
    on flashcards
    for insert
    to authenticated
    with check (user_id = auth.uid());

-- Policy for authenticated users to update their own flashcards
create policy "Users can update their own flashcards"
    on flashcards
    for update
    to authenticated
    using (user_id = auth.uid())
    with check (user_id = auth.uid());

-- Policy for authenticated users to delete their own flashcards
create policy "Users can delete their own flashcards"
    on flashcards
    for delete
    to authenticated
    using (user_id = auth.uid());

-- RLS Policies for ai_generation_logs

-- Policy for authenticated users to view their own logs
create policy "Users can view their own generation logs"
    on ai_generation_logs
    for select
    to authenticated
    using (user_id = auth.uid());

-- Policy for authenticated users to insert their own logs
create policy "Users can insert their own generation logs"
    on ai_generation_logs
    for insert
    to authenticated
    with check (user_id = auth.uid());

-- No update/delete policies for logs as they should be immutable 