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
