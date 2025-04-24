# Dokument wymagań produktu (PRD) - 10x-cards

## 1. Przegląd produktu

10x-cards to aplikacja webowa umożliwiająca szybkie tworzenie fiszek edukacyjnych przy pomocy sztucznej inteligencji. Głównym celem aplikacji jest znaczące przyspieszenie procesu tworzenia fiszek, co ma zachęcić użytkowników do korzystania z efektywnej metody nauki, jaką jest powtarzanie w odstępach czasowych (spaced repetition).

Aplikacja pozwala na:
- Generowanie fiszek przez AI na podstawie wprowadzonego tekstu
- Manualne tworzenie fiszek
- Przeglądanie, edytowanie i usuwanie fiszek
- Przechowywanie fiszek w ramach konta użytkownika
- Naukę z wykorzystaniem algorytmu powtórek

Docelową grupą odbiorców są wszyscy zainteresowani nauką z wykorzystaniem fiszek, bez ograniczeń co do dziedziny wiedzy. Aplikacja będzie dostępna w wielu językach, zgodnych z językiem wprowadzanego tekstu, początkowo tylko w wersji przeglądarkowej.

## 2. Problem użytkownika

Obecne problemy, które rozwiązuje 10x-cards:

1. Czasochłonność manualnego tworzenia fiszek - proces ten jest pracochłonny i zniechęca wielu potencjalnych użytkowników do stosowania efektywnej metody nauki.
2. Trudność w wydobyciu najważniejszych informacji z tekstu - użytkownicy często mają problem z identyfikacją kluczowych elementów, które powinny znaleźć się na fiszkach.
3. Bariera wejścia w naukę metodą powtórek - skomplikowane narzędzia i konieczność tworzenia własnych materiałów zniechęcają wielu potencjalnych użytkowników.

Użytkownicy potrzebują prostego rozwiązania, które:
- Minimalizuje czas potrzebny na przygotowanie materiałów do nauki
- Zapewnia wysoką jakość generowanych fiszek
- Oferuje intuicyjny interfejs do przeglądania i edycji fiszek
- Umożliwia naukę z wykorzystaniem sprawdzonego algorytmu powtórek

## 3. Wymagania funkcjonalne

### 3.1 Generowanie fiszek przez AI
- System będzie umożliwiał użytkownikowi wprowadzenie tekstu (minimum 1000 znaków)
- Po kliknięciu przycisku "Generuj" system wykorzysta model AI do automatycznego wygenerowania fiszek
- Liczba generowanych fiszek będzie proporcjonalna do ilości wprowadzonego tekstu, z minimum 10 fiszek
- Format fiszek będzie prosty: przód i tył, bez dodatkowych metadanych
- System obsługuje tekst w dowolnym języku i generuje fiszki w tym samym języku, w którym wprowadzono tekst

### 3.2 Zarządzanie fiszkami
- Użytkownik będzie mógł przeglądać wygenerowane fiszki przed zapisaniem ich do systemu
- Możliwość edycji pojedynczych fiszek (przód i tył)
- Możliwość usunięcia pojedynczych fiszek
- Możliwość akceptacji pojedynczych fiszek bez edycji
- Grupowy zapis zaakceptowanych fiszek do bazy danych

### 3.3 Manualne tworzenie fiszek
- Użytkownik będzie mógł tworzyć fiszki manualnie poprzez wprowadzenie treści dla przodu i tyłu fiszki
- System umożliwi dodanie nowo utworzonej fiszki do istniejących fiszek użytkownika

### 3.4 System kont użytkowników
- Rejestracja nowych użytkowników (e-mail i hasło)
- Logowanie zarejestrowanych użytkowników
- Przechowywanie fiszek powiązanych z kontem użytkownika

### 3.5 Nauka z wykorzystaniem algorytmu powtórek
- Integracja z istniejącym algorytmem powtórek
- Prezentacja fiszek do nauki zgodnie z harmonogramem powtórek
- Zbieranie informacji zwrotnej od użytkownika o stopniu zapamiętania materiału

### 3.6 Interfejs użytkownika
- Responsywny interfejs webowy zoptymalizowany dla najpopularniejszych przeglądarek
- Priorytet dla wersji desktopowej
- Mechanizm cache'owania dla ochrony przed utratą pracy

### 3.7 Dostęp do statystyk fiszek
- Aplikacja umożliwia użytkownikowi przeglądanie statystyk wygenerowanych fiszek z podziałem na trzy kategorie:
  - AI-full: fiszki wygenerowane przez AI i zatwierdzone bez edycji.
  - AI-modified: fiszki wygenerowane przez AI, które zostały zmodyfikowane przed zatwierdzeniem.
  - Manual: fiszki utworzone ręcznie przez użytkownika.
- Statystyki te powinny być prezentowane zarówno w formie liczbowej, jak i graficznej, umożliwiając analizę efektywności procesu generowania i edycji fiszek.

## 4. Granice produktu

Następujące funkcjonalności NIE są częścią MVP:

1. Własny, zaawansowany algorytm powtórek (jak SuperMemo, Anki)
2. Import wielu formatów plików (PDF, DOCX, itp.)
3. Współdzielenie zestawów fiszek między użytkownikami
4. Integracje z innymi platformami edukacyjnymi
5. Aplikacje mobilne (na początek tylko web)
6. Funkcje podziału na zestawy/talie fiszek
7. Możliwość personalizacji "stylu" generowanych fiszek
8. Zintegrowane narzędzia do tłumaczenia fiszek między różnymi językami
9. Zaawansowane metadane fiszek

## 5. Historyjki użytkowników

### US-001 Rejestracja konta
Jako nowy użytkownik, chcę zarejestrować się w systemie, aby móc przechowywać moje fiszki.

Kryteria akceptacji:
- Użytkownik może wprowadzić adres e-mail i hasło
- System weryfikuje poprawność formatu adresu e-mail
- System weryfikuje unikalność adresu e-mail
- System wymaga hasła o odpowiedniej sile (min. 8 znaków, duże i małe litery, cyfry)
- Po rejestracji, użytkownik zostaje przeniesiony do ekranu logowania
- System wysyła e-mail z potwierdzeniem rejestracji

### US-002 Logowanie do systemu
Jako zarejestrowany użytkownik, chcę zalogować się do systemu, aby uzyskać dostęp do moich fiszek.

Kryteria akceptacji:
- Użytkownik może wprowadzić adres e-mail i hasło
- System weryfikuje poprawność danych logowania
- W przypadku niepoprawnych danych, system wyświetla odpowiedni komunikat
- Po poprawnym logowaniu, użytkownik zostaje przeniesiony do głównego ekranu aplikacji
- System zapamiętuje sesję użytkownika (ciasteczka)

### US-003 Generowanie fiszek z tekstu
Jako zalogowany użytkownik, chcę wygenerować fiszki na podstawie wprowadzonego tekstu, aby zaoszczędzić czas na ich manualnym tworzeniu.

Kryteria akceptacji:
- Użytkownik może wprowadzić tekst (minimum 1000 znaków)
- System wyświetla licznik znaków podczas wprowadzania tekstu
- System udostępnia przycisk "Generuj" po wprowadzeniu wymaganej ilości tekstu
- Po kliknięciu przycisku "Generuj", system wyświetla informację o trwającym procesie generowania
- System generuje minimum 10 fiszek proporcjonalnie do ilości wprowadzonego tekstu
- System generuje fiszki w języku zgodnym z językiem wprowadzonego tekstu
- Wygenerowane fiszki są prezentowane użytkownikowi do przeglądu

### US-004 Przeglądanie wygenerowanych fiszek
Jako zalogowany użytkownik, chcę przeglądać wygenerowane fiszki przed ich zapisaniem, aby ocenić ich jakość.

Kryteria akceptacji:
- System prezentuje wygenerowane fiszki w formie listy
- Dla każdej fiszki widoczna jest treść przodu i tyłu
- Użytkownik może przewijać listę fiszek
- System zachowuje stan przeglądania w przypadku odświeżenia strony (cache)

### US-005 Edycja wygenerowanych fiszek
Jako zalogowany użytkownik, chcę edytować wygenerowane fiszki, aby dostosować je do moich potrzeb.

Kryteria akceptacji:
- Użytkownik może edytować treść przodu i tyłu każdej fiszki
- System udostępnia przycisk "Zapisz zmiany" przy każdej fiszce
- Po edycji i zapisaniu zmian, system oznacza fiszkę jako zaakceptowaną
- System nie pozwala na zapisanie pustych pól
- Zmiany są widoczne natychmiast po zapisaniu

### US-006 Usuwanie wygenerowanych fiszek
Jako zalogowany użytkownik, chcę usuwać niepotrzebne wygenerowane fiszki, aby zachować tylko te, których potrzebuję.

Kryteria akceptacji:
- Użytkownik może usunąć pojedynczą fiszkę za pomocą przycisku "Usuń"
- System wyświetla prośbę o potwierdzenie przed usunięciem
- Po usunięciu, fiszka znika z listy
- System aktualizuje wskaźnik postępu po usunięciu fiszki
- Usunięte fiszki nie są zapisywane w bazie danych

### US-007 Akceptacja wygenerowanych fiszek
Jako zalogowany użytkownik, chcę akceptować wygenerowane fiszki bez edycji, aby szybko zapisać je do systemu.

Kryteria akceptacji:
- Użytkownik może zaakceptować pojedynczą fiszkę za pomocą przycisku "Akceptuj"
- Po akceptacji, fiszka jest oznaczona jako zaakceptowana (np. zmiana koloru, dodanie ikony)
- System aktualizuje wskaźnik postępu po akceptacji fiszki
- Użytkownik może cofnąć akceptację przed ostatecznym zapisem wszystkich fiszek

### US-008 Zapisywanie fiszek do systemu
Jako zalogowany użytkownik, chcę zapisać zaakceptowane fiszki do systemu, aby móc z nich korzystać podczas nauki.

Kryteria akceptacji:
- System udostępnia przycisk "Zapisz wszystkie zaakceptowane fiszki"
- Przycisk jest aktywny tylko gdy istnieje co najmniej jedna zaakceptowana fiszka
- Po kliknięciu przycisku, system zapisuje wszystkie zaakceptowane fiszki do bazy danych
- Dodatkowo, każda fiszka zapisywana w bazie danych musi zawierać informację o jej typie (AI-full, AI-modified, manual), co umożliwi generowanie statystyk.
- System wyświetla komunikat o pomyślnym zapisie
- Po zapisie, system przenosi użytkownika do widoku wszystkich jego fiszek

### US-009 Manualne tworzenie fiszek
Jako zalogowany użytkownik, chcę manualnie tworzyć fiszki, aby uzupełnić zestaw o własne materiały.

Kryteria akceptacji:
- System udostępnia formularz do wprowadzenia treści przodu i tyłu fiszki
- Formularz zawiera przycisk "Dodaj fiszkę"
- Po dodaniu, nowa fiszka pojawia się w zestawie fiszek użytkownika
- System nie pozwala na dodanie fiszki z pustymi polami
- Użytkownik może dodać wiele fiszek w ramach jednej sesji

### US-010 Przeglądanie zapisanych fiszek
Jako zalogowany użytkownik, chcę przeglądać moje zapisane fiszki, aby zobaczyć jakie materiały mam do nauki.

Kryteria akceptacji:
- System wyświetla listę wszystkich fiszek użytkownika
- Fiszki są prezentowane w formie listy z widocznym przodem i tyłem
- System umożliwia przewijanie listy
- Interfejs zawiera informację o łącznej liczbie fiszek

### US-011 Edycja zapisanych fiszek
Jako zalogowany użytkownik, chcę edytować moje zapisane fiszki, aby aktualizować ich treść.

Kryteria akceptacji:
- Użytkownik może edytować treść przodu i tyłu każdej zapisanej fiszki
- System udostępnia przycisk "Zapisz zmiany" przy każdej fiszce
- Po zapisaniu zmian, system aktualizuje treść fiszki w bazie danych
- System nie pozwala na zapisanie pustych pól
- Zmiany są widoczne natychmiast po zapisaniu

### US-012 Usuwanie zapisanych fiszek
Jako zalogowany użytkownik, chcę usuwać moje zapisane fiszki, aby pozbyć się niepotrzebnych materiałów.

Kryteria akceptacji:
- Użytkownik może usunąć pojedynczą fiszkę za pomocą przycisku "Usuń"
- System wyświetla prośbę o potwierdzenie przed usunięciem
- Po usunięciu, fiszka znika z listy i jest usuwana z bazy danych
- System potwierdza usunięcie odpowiednim komunikatem

### US-013 Rozpoczęcie sesji nauki
Jako zalogowany użytkownik, chcę rozpocząć sesję nauki z moimi fiszkami, aby efektywnie przyswoić materiał.

Kryteria akceptacji:
- System udostępnia przycisk "Rozpocznij naukę"
- Po kliknięciu przycisku, system inicjuje sesję nauki
- System wybiera fiszki do nauki zgodnie z algorytmem powtórek
- Pierwsza fiszka jest prezentowana użytkownikowi
- Interfejs zawiera informację o liczbie fiszek w bieżącej sesji

### US-014 Nauka z fiszkami
Jako zalogowany użytkownik, chcę uczyć się z fiszek z wykorzystaniem algorytmu powtórek, aby efektywnie zapamiętać materiał.

Kryteria akceptacji:
- System prezentuje przód fiszki
- Użytkownik może kliknąć, aby zobaczyć tył fiszki
- Po zobaczeniu tyłu, użytkownik może ocenić stopień zapamiętania materiału (np. "Trudne", "Średnie", "Łatwe")
- Na podstawie oceny, system aktualizuje harmonogram powtórek dla danej fiszki
- Po zakończeniu oceny, system prezentuje kolejną fiszkę
- Sesja kończy się, gdy wszystkie zaplanowane fiszki zostały przejrzane

### US-015 Zakończenie sesji nauki
Jako zalogowany użytkownik, chcę otrzymać podsumowanie po zakończeniu sesji nauki, aby śledzić moje postępy.

Kryteria akceptacji:
- Po przeglądnięciu wszystkich fiszek w sesji, system wyświetla podsumowanie
- Podsumowanie zawiera informacje o liczbie przeglądniętych fiszek
- Podsumowanie zawiera rozkład ocen zapamiętania materiału
- System informuje, kiedy odbędzie się następna sesja
- Użytkownik może wrócić do głównego ekranu aplikacji

### US-016 Odzyskiwanie hasła
Jako zarejestrowany użytkownik, chcę odzyskać dostęp do mojego konta w przypadku zapomnienia hasła.

Kryteria akceptacji:
- System udostępnia opcję "Zapomniałem hasła" na ekranie logowania
- Użytkownik może wprowadzić adres e-mail powiązany z kontem
- System wysyła e-mail z linkiem do resetowania hasła
- Link prowadzi do formularza ustawienia nowego hasła
- Po ustawieniu nowego hasła, użytkownik może zalogować się z jego użyciem

### US-017 Wylogowanie z systemu
Jako zalogowany użytkownik, chcę wylogować się z systemu, aby zakończyć sesję.

Kryteria akceptacji:
- System udostępnia opcję "Wyloguj" w interfejsie
- Po kliknięciu opcji "Wyloguj", system kończy sesję użytkownika
- System przenosi użytkownika do ekranu logowania
- Po wylogowaniu, dostęp do fiszek użytkownika wymaga ponownego logowania

### US-020 Zabezpieczenie przed utratą pracy
Jako użytkownik, chcę, aby system zabezpieczał mnie przed utratą pracy w przypadku problemów technicznych.

Kryteria akceptacji:
- System automatycznie zapisuje wprowadzany tekst w lokalnym cache przeglądarki
- System automatycznie zapisuje stan edycji wygenerowanych fiszek
- W przypadku odświeżenia strony, system przywraca ostatni zapisany stan
- System informuje użytkownika o automatycznym zapisie

## 6. Metryki sukcesu

Główne metryki sukcesu dla MVP:

1. Odsetek akceptowania fiszek:
   - 75% fiszek wygenerowanych przez AI jest akceptowanych przez użytkownika bez edycji
   - Pomiar: stosunek liczby fiszek zaakceptowanych bez edycji do całkowitej liczby wygenerowanych fiszek

2. Wykorzystanie AI do tworzenia fiszek:
   - Użytkownicy tworzą 75% fiszek z wykorzystaniem AI (w porównaniu do ręcznego dodawania)
   - Pomiar: stosunek liczby fiszek utworzonych przez AI do całkowitej liczby fiszek w systemie