# REST API Plan

## 1. Resources

- **Flashcards**: Represents flashcards stored in the `flashcards` table. Each flashcard includes fields such as `id`, `user_id`, `front_text`, `back_text`, `type` (which can be 'ai-full', 'ai-edited', or 'manual'), `created_at`, and `updated_at`.
- **AI Generation Logs**: Represents log entries stored in the `ai_generation_logs` table. Each log entry includes fields like `id`, `user_id`, `log_content`, `log_type` ('success' or 'error'), and `created_at`.
- **Users**: Managed externally via Supabase Auth. While user profiles are not stored in our own database, all flashcard operations are tied to an authenticated user via the `user_id` field. 

## 2. Endpoints

### 2.1 Flashcards Endpoints

These endpoints cover CRUD operations for flashcards as well as batch operations for accepted flashcards.

- **GET /api/flashcards**
  - Description: Retrieve a paginated list of flashcards belonging to the authenticated user.
  - Query Parameters (optional):
    - `page`: number (default: 1)
    - `limit`: number (default: 10)
    - `type`: filter by flashcard type (`ai-full`, `ai-edited`, `manual`)
    - `sortBy`: sort column (e.g., `created_at`)
    - `sortOrder`: `asc` or `desc`
  - Response: 200 OK with JSON array of flashcard objects.

- **POST /api/flashcards**
  - Description: Save multiple flashcards at once (for example, after previewing generated flashcards).
  - Request Payload (JSON):
    ```json
    {
      "flashcards": [
        {
          "front_text": "Text for front side",
          "back_text": "Text for back side",
          "type": "ai-full"
        },
        {
          "front_text": "Another flashcard front",
          "back_text": "Another flashcard back",
          "type": "ai-edited"
        }
      ]
    }
    ```
  - Response: 201 Created with list of saved flashcards.
  
- **GET /api/flashcards/{id}**
  - Description: Retrieve details of a specific flashcard by its ID.
  - Response: 200 OK with flashcard details or 404 Not Found if not found.

- **PUT /api/flashcards/{id}**
  - Description: Update an existing flashcard. Used for editing flashcards after AI generation or manual changes.
  - Request Payload (JSON):
    ```json
    {
      "front_text": "Updated front text",
      "back_text": "Updated back text",
      "type": "ai-edited" // if applicable
    }
    ```
  - Validation: Same as POST; fields must not be empty and adhere to character limits.
  - Response: 200 OK with updated flashcard or error messages.

- **DELETE /api/flashcards/{id}**
  - Description: Delete a flashcard.
  - Response: 200 OK on successful deletion or 404 Not Found if flashcard does not exist.

### 2.3 AI Flashcard Generation

- **POST /api/flashcards/generate**
  - Description: Generate flashcards using AI from provided text.
  - Request Payload (JSON):
    ```json
    {
      "input_text": "<User provided text with at least 1000 characters>"
    }
    ```
  - Validation: Ensure the input text is at least 1000 characters long; if not, return a 400 error.
  - Business Logic: Must generate a minimum of 10 flashcards proportional to the text length.
  - Response: 200 OK with a JSON array of generated flashcards for client-side preview. Each flashcard includes temporary fields, which the client can edit before saving.
  - Side Effect: Log the generation attempt in the `ai_generation_logs` table with success or error status.

### 2.4 AI Generation Logs (Optional)

- **GET /api/logs**
  - Description: Retrieve AI generation log entries for the authenticated user.
  - Query Parameters (optional): filtering by `log_type` (e.g. 'success', 'error')
  - Response: 200 OK with a JSON array of log entries.
  - Note: This endpoint can be restricted or made available only for debugging/administrative purposes.

## 3. Authentication and Authorization

- **Mechanism**: Use JWT-based authentication integrated with Supabase Auth. Each request to protected endpoints must include the `Authorization: Bearer <token>` header.
- **Row-Level Security**: The database enforces that users can only access their own flashcards and logs via RLS policies. The API will pass through the authenticated user context to ensure proper access controls.

## 4. Validation and Business Logic

- **Field Validations**:
  - `front_text`: Must be non-empty and ≤200 characters.
  - `back_text`: Must be non-empty and ≤500 characters.
  - AI generation input text must be at least 1000 characters.

- **Business Logic**:
  - AI Flashcard Generation: Must return at least 10 flashcards. The logic decides the proportion of flashcards based on input text length and language.
  - Flashcard Editing: Disallow empty updates and enforce validation constraints.
  - Learning Session: Updates based on review ratings adjust the spaced repetition schedule for each flashcard.

- **Pagination, Filtering, and Sorting**: List endpoints support query parameters to manage large datasets via pagination (page & limit), sorting (e.g., by `created_at`), and filtering (e.g., by flashcard type).

## 5. HTTP Methods and Response Structure

- **HTTP Methods**: Use standard methods such as GET (retrieval), POST (creation), PUT (update), and DELETE (removal).
- **Response Structure**:
  - Success: Return appropriate HTTP status codes (200 OK, 201 Created) along with JSON payloads.
  - Errors: Return detailed error messages with status codes such as 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), and 500 (Internal Server Error).

## 6. Additional Considerations

- **Rate Limiting**: Apply rate limiting on endpoints such as `/api/auth/login` and `/api/flashcards/generate` to prevent abuse.
- **Security**: Ensure HTTPS usage, proper CORS configuration, input sanitization, and robust error handling.
- **Logging**: AI generation outcomes and errors are logged in the `ai_generation_logs` table for auditing and debugging.
- **Integration with Frontend**: The API is designed to work with an Astro 5/React front-end using TypeScript, Tailwind CSS, and shadcn/ui components.

## 7. Assumptions

- Authentication is fully managed via Supabase Auth, and the API trusts the user context passed from the authentication layer.
- Row-Level Security at the database level ensures that only authorized users access their respective flashcards and logs.
- The client application handles temporary states for previewing generated flashcards before they are saved via the API.
- Learning session scheduling logic is based on updates received from user reviews via the API endpoint and is implemented as part of a spaced repetition algorithm. 