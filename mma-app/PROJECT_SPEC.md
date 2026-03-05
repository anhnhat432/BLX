# MMA Course Project Spec

## Goal
Build a student-friendly MMA training tracker app with at least 4 screens, full CRUD, and local persistence.

## Screens (5)
1. **Home / Dashboard**
   - Quick intro and navigation actions.
   - Shows total saved fighters.
2. **Fighters List**
   - Displays all fighters in simple cards.
   - Supports delete and navigation to details/edit.
3. **Add Fighter**
   - Form to create a new fighter profile.
4. **Fighter Details**
   - Read-only view of one fighter.
5. **Edit Fighter**
   - Form to update an existing fighter.

## CRUD Requirements
- **Create:** Add fighter with name, weight class, gym, wins, losses, notes.
- **Read:** View fighter list + individual details.
- **Update:** Edit any fighter fields.
- **Delete:** Remove fighter from list/details.

## Local Storage
- Persist fighters in `@react-native-async-storage/async-storage`.
- Load saved fighters on app launch.
- Keep data shape simple and typed for TypeScript students.

## UI Expectations (Simple)
- Clean dark theme, basic cards/buttons, no complex design system.
- Use built-in React Native components (`View`, `Text`, `Pressable`, `TextInput`, `ScrollView`).
- Keep code readable for teaching/demo.
