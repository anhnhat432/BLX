import AsyncStorage from '@react-native-async-storage/async-storage';

import { Fighter, FighterInput } from '../types/fighter';

const KEY = 'mma-app:fighters';

export async function getFighters(): Promise<Fighter[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Fighter[];
    return parsed.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

async function saveFighters(fighters: Fighter[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(fighters));
}

export async function createFighter(input: FighterInput): Promise<Fighter> {
  const fighters = await getFighters();
  const fighter: Fighter = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    ...input,
  };

  await saveFighters([fighter, ...fighters]);
  return fighter;
}

export async function updateFighter(id: string, input: FighterInput): Promise<Fighter | null> {
  const fighters = await getFighters();
  const index = fighters.findIndex((fighter) => fighter.id === id);

  if (index === -1) {
    return null;
  }

  const updated: Fighter = {
    ...fighters[index],
    ...input,
  };

  fighters[index] = updated;
  await saveFighters(fighters);
  return updated;
}

export async function deleteFighter(id: string): Promise<void> {
  const fighters = await getFighters();
  await saveFighters(fighters.filter((fighter) => fighter.id !== id));
}

export async function getFighterById(id: string): Promise<Fighter | null> {
  const fighters = await getFighters();
  return fighters.find((fighter) => fighter.id === id) ?? null;
}
