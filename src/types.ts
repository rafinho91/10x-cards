import type { Database } from "./db/database.types";

// DTO for reading flashcard data returned by GET endpoints
export type FlashcardDTO = Database["public"]["Tables"]["flashcards"]["Row"];

// DTO for creating a flashcard (used in POST /api/flashcards)
// Only the fields provided by the client: front_text, back_text, and type, since user_id and timestamps are managed server-side
export type FlashcardCreateDTO = Pick<
  Database["public"]["Tables"]["flashcards"]["Insert"],
  "front_text" | "back_text" | "type"
>;

// Command Model wrapping the creation of multiple flashcards
export interface CreateFlashcardsCommand {
  flashcards: FlashcardCreateDTO[];
}

// DTO for updating an existing flashcard (used in PUT /api/flashcards/{id})
// Only allow updating these fields
export type FlashcardUpdateDTO = Pick<
  Database["public"]["Tables"]["flashcards"]["Update"],
  "front_text" | "back_text" | "type"
>;

// Command Model for generating flashcards via AI (used in POST /api/flashcards/generate)
// The input text must be validated (minimum 1000 characters) in business logic
export interface GenerateFlashcardsCommand {
  input_text: string;
}

// DTO for logging AI generation attempts (used in GET /api/logs)
export type LogDTO = Database["public"]["Tables"]["ai_generation_logs"]["Row"];
