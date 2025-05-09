/* API Endpoint Implementation Plan: POST /api/flashcards/generate */
# API Endpoint Implementation Plan: POST /api/flashcards/generate

## 1. Przegląd punktu końcowego
Endpoint służy do generowania flashcards przy użyciu AI na podstawie dostarczonego tekstu (minimum 1000 znaków). Wygenerowane flashcards są przesyłane do klienta do podglądu i dalszej edycji. Dodatkowo, operacja logowana jest w tabeli `ai_generation_logs`.

## 2. Szczegóły żądania
- **Metoda HTTP:** POST
- **URL:** /api/flashcards/generate
- **Parametry:**
  - **Request Body:**
    ```json
    {
      "input_text": "<tekst o długości minimum 1000 znaków>"
    }
    ```
  - **Walidacja:** Sprawdzamy, czy `input_text` zawiera przynajmniej 1000 znaków. W przypadku niepowodzenia zwracamy błąd 400.

## 3. Wykorzystywane typy
- **GenerateFlashcardsCommand (zdefiniowany w src/types.ts):**
  ```ts
  interface GenerateFlashcardsCommand {
    input_text: string;
  }
  ```
- **FlashcardCreateDTO / FlashcardDTO:** (do reprezentacji generowanych kart, jeśli wymagane do odpowiedzi)

## 4. Szczegóły odpowiedzi
- **200 OK:** Zwracamy JSON zawierający tablicę wygenerowanych flashcards (tymczasowe dane umożliwiające edycję przed zapisem).
- **400 Bad Request:** Gdy `input_text` jest krótszy niż wymagane 1000 znaków.
- **500 Internal Server Error:** W przypadku nieoczekiwanych błędów (np. problemów z AI czy zapisem logu).

## 5. Przepływ danych
1. Klient wysyła żądanie z payloadem zawierającym `input_text`.
2. Walidacja wejścia: sprawdzamy długość `input_text` za pomocą zod lub innej biblioteki walidacyjnej.
3. Autoryzacja: Sprawdzamy, czy użytkownik jest zalogowany (pobieramy dane z context.locals, korzystając z SupabaseClient zdefiniowanego w `src/db/supabase.client.ts`).
4. Przekazanie danych do serwisu (np. `generateFlashcardsService` w `/src/lib/services`), który:
   - Komunikuje się z modelem AI, by wygenerować flashcards (minimum 10 flashcards, liczba zależna od długości inputu).
5. Logika zapisu: Po generacji, niezależnie od wyniku, zapisujemy próbę generacji w tabeli `ai_generation_logs`:
   - **Sukces:** `log_type = 'success'`
   - **Błąd:** `log_type = 'error'`
6. Odpowiedź: W zależności od rezultatu zwracamy odpowiedni kod i dane JSON.

## 6. Względy bezpieczeństwa
- **Walidacja danych wejściowych:** Używamy zod do weryfikacji minimalnej długości `input_text`.
- **Autoryzacja:** Sprawdzamy autentyczność użytkownika poprzez tokeny Supabase w context.locals.
- **Sanityzacja:** Dbamy o sanityzację danych wejściowych, aby zapobiec potencjalnym atakom typu injection.

## 7. Obsługa błędów
- **400 Bad Request:** Gdy `input_text` ma mniej niż 1000 znaków.
- **401 Unauthorized:** Jeśli użytkownik nie jest zalogowany lub brak wymaganych danych uwierzytelniających.
- **500 Internal Server Error:** W przypadku błędów podczas komunikacji z modelem AI lub bazy danych. Każdy błąd jest logowany w tabeli `ai_generation_logs` z odpowiednim `log_type`.

## 8. Rozważania dotyczące wydajności
- **Asynchroniczność:** Wywołania do modelu AI powinny być realizowane asynchronicznie, aby nie blokować obsługi żądania.
- **Timeouts:** Ustalenie limitu czasu na odpowiedź modelu AI.
- **Minimalizacja operacji na bazie:** Efektywna operacja logowania (batch insert, jeśli to konieczne) oraz optymalizacja zapytań.

## 9. Etapy wdrożenia
1. **Stworzenie endpointa:** Utworzenie nowego pliku API w `/src/pages/api/flashcards/generate.ts` z ustawieniem `export const prerender = false`.
2. **Walidacja wejścia:** Implementacja walidacji `input_text` za pomocą zod.
3. **Implementacja serwisu AI:** Utworzenie serwisu, np. `/src/lib/services/generateFlashcardsService.ts`, odpowiedzialnego za komunikację z modelem AI oraz logikę generacji flashcards.
4. **Integracja z bazą:** Implementacja logiki zapisu logów do tabeli `ai_generation_logs` przy użyciu SupabaseClient z context.locals.
5. **Obsługa błędów:** Wdrożenie mechanizmów zarządzania błędami, zapewniając odpowiednie kody statusu i logowanie błędów.