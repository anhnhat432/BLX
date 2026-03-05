# mma-app

Expo + TypeScript React Native project for an MMA course assignment.

## Project features

- 5 screens via Expo Router (`Home`, `Fighters List`, `Add Fighter`, `Fighter Details`, `Edit Fighter`)
- Full CRUD example for fighter profiles
- Local persistence with AsyncStorage
- Simple, student-friendly UI using core React Native components

See detailed scope in [`PROJECT_SPEC.md`](./PROJECT_SPEC.md).

## Run locally (Windows)

From PowerShell or Command Prompt:

```powershell
cd mma-app
npm install
npm run start
```

Then press:

- `a` for Android emulator/device
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
