# SELAH – Skupienie i Modlitwa (Focus_Timer_146) — Landing Page PRD

## Problem statement (verbatim, PL)
Build a landing page: stwórz stronę dla aplikacji SELAH Skupienie i Modlitwa. W Twoim
systemie nazywa się Focus_Timer_146. Strona ma być łatwo deployowalna na jakieś
serwery webowe. Ma zawierać wszystkie regulaminy i zasady prywatności z aplikacji.
Prezentować funkcjonalności w kolorystyce podobnej do aplikacji. Strona będzie pod
domeną selah.pl. Polski w Polsce, angielski w innych krajach (PL/EN switcher).

## User personas
- **Osoba modląca się / wierząca** szukająca narzędzia łączącego skupienie i Pismo Święte.
- **Osoba świecka** szukająca prostego timera typu Pomodoro z chwilą refleksji.
- **Operator (klient)** — MODERN COMMUNICATION SYSTEMS SP. Z O.O., kontakt MCS_KONTAKT@HOTMAIL.COM.

## Core requirements (static)
- Pełne teksty Regulaminu i Polityki Prywatności (PL i EN) dostępne na osobnych stronach.
- Auto-detekcja języka: `pl` przy `navigator.language=pl*` lub strefie `Europe/Warsaw`, w innych przypadkach `en`. Switcher PL/EN nadpisuje wybór (localStorage `selah_lang`).
- Hero z badge'ami "Coming Soon" dla App Store i Google Play (nieklikalne).
- Newsletter signup (POST /api/newsletter/subscribe) i formularz kontaktowy (POST /api/contact).
- Email kontaktowy widoczny: MCS_KONTAKT@HOTMAIL.COM.
- Kolorystyka stonowana/duchowa: granat (#0A0E17 / #131B2A / #1C273D), kremowy (#F4F0E6 / #E2D1B3), złoto (#D4AF37).
- Fonty: Cormorant Garamond (nagłówki) + Manrope (body).

## Architecture
- **Frontend:** React 19 + React Router 7 + Tailwind + Shadcn (Accordion, Sonner). Auto-detect i18n + manual switcher. Routes:
  `/`, `/regulamin`, `/polityka-prywatnosci`, `/terms`, `/privacy-policy`.
- **Backend:** FastAPI (`/api/health`, `/api/newsletter/subscribe`, `/api/contact`, status endpoints).
- **DB:** MongoDB — collections `newsletter`, `contact_messages`, `status_checks`.

## What's been implemented — 2026-12-01 (P0 first cut)
- ✅ Hero (PL/EN) + Coming Soon store badges + privacy caption.
- ✅ "Czym jest SELAH" sekcja z opisem dostarczonym przez klienta.
- ✅ How it works — 4-stopniowy cykl Skup się → Przerwa → Refleksja → Odpoczynek.
- ✅ Bento grid 8 funkcji (timer, czas trwania, krótkie/długie przerwy, statystyki, raporty, osiągnięcia, cytaty z Pisma).
- ✅ Benefits (6 punktów).
- ✅ Privacy-first panel (bez konta, bez e-maila).
- ✅ FAQ accordion (5 pytań) — Shadcn Accordion.
- ✅ Newsletter subscribe form (zapis do MongoDB, dedup case-insensitive).
- ✅ Contact form (zapis do MongoDB, walidacja email + min 5 znaków wiadomości).
- ✅ Footer z danymi operatora (KRS/NIP/REGON), linkami legal i e-mailem.
- ✅ Polish + English Terms (Regulamin) i Privacy Policy z pełnymi sekcjami.
- ✅ Language switcher PL/EN z auto-detekcją (navigator.language + Europe/Warsaw) i persistencją w localStorage.
- ✅ Testing: 100% backend (12/12 pytest), 100% frontend (Playwright e2e: routes, switcher, formularze, toast, accordion).

## Backlog
### P1 (next)
- Cookie/RODO consent banner (jeśli zostaną dodane skrypty analityczne lub marketingowe).
- Open Graph / Twitter Card meta tags + favicon + manifest.webmanifest pod selah.pl.
- Sitemap.xml + robots.txt + JSON-LD `SoftwareApplication`.
- Realne URL-e App Store / Google Play po premierze (zamiana badge'ów Coming Soon na linki + analytics na klik).
- Wysyłka maila powitalnego newslettera (np. Resend) + powiadomienie zwrotne dla MCS_KONTAKT@HOTMAIL.COM po contact form.
- Hard-rate limiting na endpointy newsletter/contact (anti-spam, np. limit per IP).
- A11y audit (kontrasty AA na badge'ach, focus rings na inputach, skip-link).

### P2 (later)
- Dodatkowe języki (DE, ES) jeżeli marka wejdzie poza PL/EN.
- Screenshoty / animowane mockupy aplikacji w hero/features.
- Blog / "Słowo na dziś" z cytatami z Pisma.
- Admin panel do podglądu newsletter + wiadomości kontaktowych.

## Next tasks list (suggested order)
1. Dodać OG/Twitter meta + favicon + manifest pod selah.pl.
2. Wpiąć realny endpoint mailowy (Resend / SendGrid) na newsletter + contact (powiadomienia).
3. Rate-limit / Captcha (np. Cloudflare Turnstile) na endpointach publicznych.
4. Cookie consent + JSON-LD.
5. Zamienić "Coming Soon" badge'y na realne linki po wydaniu aplikacji.

## Code review notes from testing
- Logger init w server.py powinien być nad routami (obecnie działa, ale fragile).
- CORS `*` + `allow_credentials=True` — dla produkcji ograniczyć do `https://selah.pl`.
- Rozważyć unikalny indeks `newsletter.email` w MongoDB.
