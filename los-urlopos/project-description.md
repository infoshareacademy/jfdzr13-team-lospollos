26.05 - 1 spotkanie

1. Wybraliśmy projekt aplikacji urlopowej
2. Założenia do funkcjonalności podstawowe:

A) użytkownik może się zarejestrować i zalogować i ma dostęp do panelu urlopów
B) podział na role: admin, kierownik, pracownik
C) pula dni urlopowych na danych rok, wybór urlop z kalendarza i odjęcie od Puli

Struktura danych:
Collection:users /requests/ holidays→ klasyfikacja na Authlevel": admin/standardUser/teamLeader →

Nazewnictwo klas i plików, rodzaj projektu:
a) język angielski, aplikacja cała po angielsku
b) CamelCase
c) TypeScript

Funkcjonalności

1. panel logowania
2. Widok kalndarza zespołu (każdy user w obrębie działu) z podglądem na dany rok/miesiąc (admin/CEO) ma select calej firmy
3. Panel po zalogowaniu prezentuje kalendarz z punktu 1 + podsumowanie dostpenych dni urlopowych uzytkownika, a takze jego dane i dzial, stanoiwsko, itp + opcja zloz nowy wniosek(select z typem urlopu i wtedy inna kalkulacja)
4. nowy formularz: przyklad od Klaudii z ewnetualnymi korektami
5. Lista wnioskow urlopowych ze statusami + akcept kierownika + status(pending, approved, rejected)
6. moduły we wrapperze:
7. CSS MODULES jako podstawowy rodzaj stylowania

Komponenty do zakodowania:
wrapper
panel logowania
lista urlopów,
dane uzytkownika, lista requestów (uzytkownik zwykly)
panel kierownika rozbudowany (to samo co wyzej + requesty)
panel admina

Firebase dane dostępowe:
jfdzr13lospollos@gmail.com
LosPollosHermanos2024

kolekcja userów, kolekcja requestów, kolekcja wnosków urlopowych

Logika folderów:
assets - załączniki do stylów i pliki pomocnicze
authentication - komponent do audentykacji

componnets - główne komponenty funckjonalne aplikacji, wstępny zarys:
Strona logowania
Nawigacja
Kalendarz podsumowujący jako cześć panelu lub osobny komponent do tych paneli lub landing pa
Dane uzytkownika jako cześć panelu lub osobny komponent do tych paneli
Panel uzytkownika- ilośc dni wolnych, urlopy, lista requestow- dopoki pending mozna wywalic,
Panel kierownika- lista requestow wszystkich pracownikow (approve, dorzucic) + swoich,
Panel admina-

context - Context komponent
services - komunikacja z firestore
types - komponenty do typowania TS
