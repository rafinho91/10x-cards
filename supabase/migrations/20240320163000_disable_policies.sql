-- Migration: Disable All RLS Policies
-- Description: Disables all Row Level Security policies from flashcards and ai_generation_logs tables
-- This is a destructive operation that removes all security policies

-- Drop policies from flashcards table
drop policy if exists "Users can view their own flashcards" on flashcards;
drop policy if exists "Users can insert their own flashcards" on flashcards;
drop policy if exists "Users can update their own flashcards" on flashcards;
drop policy if exists "Users can delete their own flashcards" on flashcards;

-- Drop policies from ai_generation_logs table
drop policy if exists "Users can view their own generation logs" on ai_generation_logs;
drop policy if exists "Users can insert their own generation logs" on ai_generation_logs; 