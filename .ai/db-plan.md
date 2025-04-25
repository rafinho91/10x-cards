# Schemat bazy danych dla 10x-cards

## 1. Tabele i kolumny

### a) flashcards

Tabela `flashcards` przechowuje dane fiszek powiązanych z użytkownikiem.

- `id`: UUID PRIMARY KEY, domyślnie generowany (np. przy użyciu funkcji `gen_random_uuid()`).
- `user_id`: UUID NOT NULL, referencja do identyfikatora użytkownika (zarządzanego przez Supabase Auth, zazwyczaj tabela `auth.users`).
- `front_text`: VARCHAR(200) NOT NULL, z ograniczeniem długości (długość > 0 i <= 200 znaków).
- `back_text`: VARCHAR(500) NOT NULL, z ograniczeniem długości (długość > 0 i <= 500 znaków).
- `type`: ENUM('ai-full', 'ai-edited', 'manual') NOT NULL.
- `created_at`: TIMESTAMPTZ NOT NULL, domyślnie ustawiany na `NOW()`.
- `updated_at`: TIMESTAMPTZ NOT NULL, domyślnie ustawiany na `NOW()`.

#### Ograniczenia:

- Check constraint dla `front_text` i `back_text`, zapewniający, że pola nie są puste oraz respektują przydzielone limity znaków.
- Klucz obcy: `user_id` odwołuje się do identyfikatora użytkownika w tabeli zarządzanej przez Supabase Auth (np. `auth.users`).

### b) ai_generation_logs

Tabela `ai_generation_logs` przechowuje logi operacji generowania AI.

- `id`: UUID PRIMARY KEY, generowany domyślnie.
- `user_id`: UUID NOT NULL, referencja do identyfikatora użytkownika (zarządzanego przez Supabase Auth, zazwyczaj tabela `auth.users`).
- `log_content`: TEXT NOT NULL, zawiera szczegółowy komunikat loga (informacje o sukcesie lub błędzie).
- `log_type`: ENUM('success', 'error') NOT NULL.
- `created_at`: TIMESTAMPTZ NOT NULL, domyślnie ustawiany na `NOW()`.

## 2. Relacje między tabelami

- Relacja jeden-do-wielu między użytkownikami a fiszkami: każda fiszka w tabeli `flashcards` jest powiązana z jednym użytkownikiem poprzez `user_id`, natomiast każdy użytkownik może posiadać wiele fiszek.
- W tabeli `ai_generation_logs` kolumna `user_id` wskazuje na użytkownika, do którego odnosi się dany log.

## 3. Indeksy

- Indeks na kolumnie `user_id` w tabeli `flashcards` dla przyspieszenia zapytań filtrowanych po użytkowniku.
- Indeks na kolumnie `created_at` w tabeli `flashcards` dla optymalizacji zapytań związanych z czasem utworzenia.
- Indeks na kolumnie `user_id` w tabeli `ai_generation_logs` (jeśli operacje logowania filtrują po użytkowniku).
- Indeks na kolumnie `created_at` w tabeli `ai_generation_logs`.

## 4. Zasady PostgreSQL (RLS)

- Włączenie Row-Level Security (RLS) dla tabeli `flashcards`, aby użytkownicy mieli dostęp wyłącznie do swoich danych. Przykładowe polecenia:

  ```sql
  ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Users can access their own flashcards" ON flashcards
    FOR ALL
    USING (user_id = auth.uid());
  ```

- Podobne zasady RLS można wdrożyć dla tabeli `ai_generation_logs`, jeśli istnieje potrzeba ograniczenia widoczności logów tylko do odpowiednich użytkowników.

## 5. Dodatkowe uwagi

- Użytkownicy są zarządzani całkowicie przez Supabase Auth, więc nie ma potrzeby tworzenia oddzielnej tabeli użytkowników w tym schemacie.
- Przed utworzeniem tabeli należy zdefiniować typy ENUM:

  ```sql
  CREATE TYPE flashcard_type AS ENUM ('ai-full', 'ai-edited', 'manual');
  CREATE TYPE log_type AS ENUM ('success', 'error');
  ```

- Ograniczenia na długość pól `front_text` i `back_text` można dodatkowo wzmocnić za pomocą check constraint, chociaż zadeklarowane limity VARCHAR już częściowo to wymuszają.
- Schemat został zaprojektowany z myślą o wydajności oraz skalowalności przy użyciu indeksowania krytycznych kolumn.
- Mechanizm powtórek w MVP będzie rozszerzony wewnątrz tabeli `flashcards` poprzez ewentualne dodanie dodatkowych kolumn w przyszłości. 