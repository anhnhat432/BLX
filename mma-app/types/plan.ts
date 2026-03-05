export type Exercise = {
  id: string;
  planId: string;
  name: string;
  reps: number;
  sets: number;
};

export type Plan = {
  id: string;
  title: string;
  note: string;
  createdAt: string;
  exercises: Exercise[];
};

export type PlanInput = Pick<Plan, 'title' | 'note'>;
export type ExerciseInput = Pick<Exercise, 'name' | 'reps' | 'sets'>;
