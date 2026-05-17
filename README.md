# NETRUNNER TYPE
### // Night City Typing Test

**[npx-nyx.github.io/netrunner](https://npx-nyx.github.io/netrunner)**

A cyberpunk-themed typing speed test built with vanilla HTML, CSS, and JavaScript. No frameworks. No build step. Just jack in and type.

---

## Features

- **Three difficulty tiers** — Flatline (easy), Netrunner (medium), Blackwall (hard)
- **Custom payload** — paste any text and run it as a typing passage
- **Live stats** — WPM, accuracy, and trend indicator updated in real time
- **Combo chain** — consecutive correct keystrokes build a streak multiplier
- **Neural rank** — earn titles from Flatlined to Blackwall based on WPM
- **Global leaderboard** — scores stored in Supabase, filterable by difficulty
- **Four visual themes** — Cyberpunk, Corpo, Militech, Arasaka
- **Sound effects** — synthesized click, error, and finish tones via Web Audio API
- **Keyboard shortcuts** — `Tab` to restart, `Esc` to clear, `S` to toggle sound

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | HTML / CSS / JavaScript (vanilla) |
| Audio | Web Audio API |
| Leaderboard | Supabase (Postgres) |
| Deploy | Vercel |

---

## Run Locally

No install required.

```bash
git clone https://github.com/npx-nyx/netrunner.git
cd netrunner
python3 -m http.server 8080
```

Open `http://localhost:8080`.

Alternatively, use `npx serve .` if you have Node installed.

---

## Leaderboard Setup

The Supabase credentials are already configured. To run your own instance:

1. Create a project at [supabase.com](https://supabase.com)
2. Run this in the SQL editor:

```sql
create table scores (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  wpm        integer,
  accuracy   integer,
  difficulty text,
  duration   integer,
  chars      integer,
  date       text,
  created_at timestamptz default now()
);

alter table scores enable row level security;

create policy "read all" on scores for select using (true);
create policy "insert own" on scores for insert with check (true);
```

3. Replace `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `app.js` with your project values.

---

## Themes

| Handle | Palette |
|---|---|
| Cyberpunk | Yellow / Cyan / Pink on near-black |
| Corpo | Warm parchment, muted gold |
| Militech | Nord blue-grey |
| Arasaka | Deep mocha, rose accents |

---

## Project Structure

```
netrunner/
  index.html   — markup and screen layout
  app.js       — all logic: state, audio, leaderboard, input handling
  style.css    — theming, animations, layout
  vercel.json  — SPA rewrite rule for Vercel
```

---

## License

MIT
