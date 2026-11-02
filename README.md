# Koma

Learn Japanese through four-panel manga strips. React Native + Expo (SDK 57), NativeWind v5, local SQLite (Drizzle), RevenueCat. No accounts, no backend.

## Run

```bash
bun install
cp .env.example .env.local   # RevenueCat Android key (optional in dev)
bun start                    # Expo Go works for the UI; reminders and purchases need a dev build
bun run android              # development build
```

Checks: `bun run typecheck` and `bun run lint`. After editing `src/db/schema.ts`, run `bun run db:generate`.

## Structure

```
src/app/          routes only: (onboarding) flow, (app) main screens
src/components/   ui/ primitives (Screen, Text, Button, Rays, Starburst), panel art
src/features/     screen-specific parts, one folder per feature
src/db/           Drizzle schema and client (user.db)
src/lib/          fonts, colours, layout, query client, spaced repetition, purchases, notifications
src/store/        persisted settings (Zustand)
```

Design tokens live in `src/global.css`. See `AGENTS.md` for the conventions.
