import { z } from 'zod';

export const planSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  note: z.string().min(2, 'Note must be at least 2 characters'),
});

export const exerciseSchema = z.object({
  name: z.string().min(2, 'Exercise name must be at least 2 characters'),
  reps: z.coerce.number().int().positive('Reps must be at least 1'),
  sets: z.coerce.number().int().positive('Sets must be at least 1'),
});

export type PlanFormValues = z.infer<typeof planSchema>;
export type ExerciseFormValues = z.infer<typeof exerciseSchema>;
