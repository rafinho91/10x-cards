import { z } from "zod";
import type { APIRoute } from "astro";
import type { GenerateFlashcardsCommand } from "../../../types";
import { generateFlashcardsService } from "../../../lib/services/generateFlashcardsService";

// Disable static pre-rendering for this endpoint
export const prerender = false;

// Input validation schema
const generateFlashcardsSchema = z.object({
  input_text: z
    .string()
    .min(1000, "Input text must be at least 1000 characters long")
    .max(50000, "Input text cannot exceed 50000 characters"),
});

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = generateFlashcardsSchema.safeParse(body);

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: validationResult.error.errors,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const command = validationResult.data as GenerateFlashcardsCommand;

    // Generate flashcards using the service
    const result = await generateFlashcardsService(locals.supabase, "", command.input_text);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing flashcard generation request:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
