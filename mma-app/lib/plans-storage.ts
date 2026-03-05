import AsyncStorage from '@react-native-async-storage/async-storage';

import { Exercise, ExerciseInput, Plan, PlanInput } from '../types/plan';

const STORAGE_KEY = 'mma-app:plans';

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function savePlans(plans: Plan[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

export async function getPlans(): Promise<Plan[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Plan[];
    return parsed.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

export async function getPlanById(id: string): Promise<Plan | null> {
  const plans = await getPlans();
  return plans.find((plan) => plan.id === id) ?? null;
}

export async function createPlan(input: PlanInput): Promise<Plan> {
  const plans = await getPlans();
  const plan: Plan = {
    id: makeId(),
    title: input.title,
    note: input.note,
    createdAt: new Date().toISOString(),
    exercises: [],
  };

  await savePlans([plan, ...plans]);
  return plan;
}

export async function updatePlan(id: string, input: PlanInput): Promise<Plan | null> {
  const plans = await getPlans();
  const index = plans.findIndex((plan) => plan.id === id);
  if (index === -1) {
    return null;
  }

  const updated: Plan = {
    ...plans[index],
    title: input.title,
    note: input.note,
  };

  plans[index] = updated;
  await savePlans(plans);
  return updated;
}

export async function deletePlan(id: string): Promise<void> {
  const plans = await getPlans();
  await savePlans(plans.filter((plan) => plan.id !== id));
}

export async function addExerciseToPlan(planId: string, input: ExerciseInput): Promise<Exercise | null> {
  const plans = await getPlans();
  const index = plans.findIndex((plan) => plan.id === planId);
  if (index === -1) {
    return null;
  }

  const exercise: Exercise = {
    id: makeId(),
    planId,
    name: input.name,
    reps: input.reps,
    sets: input.sets,
  };

  plans[index] = {
    ...plans[index],
    exercises: [...plans[index].exercises, exercise],
  };

  await savePlans(plans);
  return exercise;
}

export async function removeExercise(planId: string, exerciseId: string): Promise<void> {
  const plans = await getPlans();
  const index = plans.findIndex((plan) => plan.id === planId);
  if (index === -1) {
    return;
  }

  plans[index] = {
    ...plans[index],
    exercises: plans[index].exercises.filter((exercise) => exercise.id !== exerciseId),
  };

  await savePlans(plans);
}
