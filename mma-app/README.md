# mma-app

Expo + TypeScript MMA course app using plans and exercises.

## Implemented requirements

- Data model:
  - `Plan { id, title, note, createdAt }`
  - `Exercise { id, planId, name, reps, sets }`
- Plan CRUD (create, list, edit, delete)
- Add/remove exercises inside plan details
- AsyncStorage persistence
- Expo Router navigation:
  - Tabs: Home, Create, Settings
  - Stack: plan detail + edit
- React Hook Form + Zod validation
- Simple design system components: `Button`, `Input`, `Card`

## Run on Windows
Expo + TypeScript React Native project for an MMA course assignment.

## Project features

- 5 screens via Expo Router (`Home`, `Fighters List`, `Add Fighter`, `Fighter Details`, `Edit Fighter`)
- Full CRUD example for fighter profiles
- Local persistence with AsyncStorage
- Simple, student-friendly UI using core React Native components

See detailed scope in [`PROJECT_SPEC.md`](./PROJECT_SPEC.md).
React Native app scaffolded for Expo with TypeScript, Expo Router navigation, ESLint, and Prettier.

## Run locally (Windows)

From PowerShell or Command Prompt:

```powershell
cd mma-app
npm install
npm run start
```

Then press:

- `a` for Android emulator/device
- `w` for web
- `i` for iOS simulator (macOS only)

## Quality checks

```powershell
npm run lint
npm run format:check
- `i` for iOS simulator (macOS only)
- `w` for web

Or run directly:

```powershell
npm run android
npm run ios
npm run web
```

## Quality tools

```powershell
npm run lint
npm run lint:fix
npm run format:check
npm run format
```
