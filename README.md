# Jagat Cricket 🏏

A personal cricket batting tracker for Android. You enter each innings by hand, and the app works out your career stats.
Everything is stored **on your phone** (SQLite). There is no backend, no account and no internet needed.

## Features
- **Home:** matches, total runs, balls faced, batting average (runs ÷ times out), runs per match, strike rate,
  highest score, 50s/100s, ducks, not-outs, 4s/6s, a chart of how you got out, and your last 10 scores.
- **Matches:** every innings, newest first, with search and a format filter. Tap one to view, edit or delete it.
- **Add:** runs, balls, 4s, 6s, out or not out, how out, date, opponent, venue, format and notes. The form checks what you enter.
- **Guide:** warm-up stretches for batting, bowling and fielding, food and drinks before you play, catching and
  throwing drills, the rules of cricket (extras, all 10 dismissals, powerplays, umpire signals), equipment and safety,
  and a glossary of fielding positions and terms. It all works offline.
- **Settings:** export a JSON backup through the share sheet, import a backup (add to your matches or replace them), delete all data.

## Get the APK
1. On GitHub, open **Actions** and then the latest successful **Build APK** run.
2. Download the **jagat-cricket-apk** artifact (a zip) and unzip it to get `jagat-cricket.apk`.
3. Copy the APK to your phone and open it. The first time, Android asks you to allow installs from that app.

> The APK is signed with the default debug key, which is fine for installing it yourself. To publish on the Play Store
> you would need a real release keystore.

## Develop
```bash
npm install
npm test            # unit tests for stats, validation and backup
npm run typecheck
npm run android     # build and run on a connected device or emulator (needs the Android SDK)
```

## Code layout
```
src/app/            screens (Expo Router): (tabs)/index, matches, add, settings; match/[id]/index, edit
src/db/             SQLite schema/migrations and match queries
src/content/        Guide topics (plain TypeScript data; add or edit text here)
src/lib/            stats, validation, backup and formatting (pure TypeScript, unit-tested)
src/components/     UI building blocks and charts
.github/workflows/  build-apk.yml: tests, then builds the APK
```
