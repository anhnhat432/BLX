export type Fighter = {
  id: string;
  name: string;
  weightClass: string;
  gym: string;
  wins: number;
  losses: number;
  notes: string;
  createdAt: string;
};

export type FighterInput = Omit<Fighter, 'id' | 'createdAt'>;
