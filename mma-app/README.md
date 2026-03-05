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
```
