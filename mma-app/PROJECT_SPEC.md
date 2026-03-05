# MMA Course Project Spec (Updated)

## Core data model
- `Plan { id, title, note, createdAt }`
- `Exercise { id, planId, name, reps, sets }`
- A plan contains many exercises.

## Required features
1. CRUD Plans
   - Create plan
   - List plans
   - Edit plan
   - Delete plan
2. Add/remove exercises inside plan details
3. Persist all data with AsyncStorage
4. Use Expo Router navigation
   - Tabs: `Home`, `Create`, `Settings`
   - Stack routes for plan detail + edit
5. Forms validated with React Hook Form + Zod
6. Keep UI simple with a tiny design system
   - `Button`, `Input`, `Card`
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
