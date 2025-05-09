import type { SupabaseClient } from "@supabase/supabase-js";
import type { FlashcardCreateDTO } from "../../types";

export interface GenerateFlashcardsResult {
  flashcards: FlashcardCreateDTO[];
  stats: {
    inputLength: number;
    generatedCount: number;
    processingTimeMs: number;
  };
}

export async function generateFlashcardsService(
  supabase: SupabaseClient,
  userId: string,
  inputText: string
): Promise<GenerateFlashcardsResult> {
  const startTime = Date.now();

  try {
    // Mock data with correct type
    const mockFlashcards: FlashcardCreateDTO[] = [
      {
        front_text: "Sample Front 1",
        back_text: "Sample Back 1",
        type: "ai-full",
      },
      {
        front_text: "Sample Front 2",
        back_text: "Sample Back 2",
        type: "ai-full",
      },
      {
        front_text: "Sample Front 3",
        back_text: "Sample Back 3",
        type: "ai-full",
      },
    ];

    // Log the generation attempt
    await supabase.from("ai_generation_logs").insert({
      user_id: userId,
      input_length: inputText.length,
      generated_count: mockFlashcards.length,
      log_type: "success",
      processing_time_ms: Date.now() - startTime,
    });

    return {
      flashcards: mockFlashcards,
      stats: {
        inputLength: inputText.length,
        generatedCount: mockFlashcards.length,
        processingTimeMs: Date.now() - startTime,
      },
    };
  } catch (error) {
    // Log the error
    await supabase.from("ai_generation_logs").insert({
      user_id: userId,
      input_length: inputText.length,
      generated_count: 0,
      log_type: "error",
      error_message: error instanceof Error ? error.message : "Unknown error",
      processing_time_ms: Date.now() - startTime,
    });

    throw error;
  }
}
