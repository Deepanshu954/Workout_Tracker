export interface WeightEntry {
  id: string;
  weight: number;
  date: string;
  createdAt: string;
}

export interface StrengthEntry {
  id: string;
  exercise: string;
  weight: number;
  reps: number;
  date: string;
  createdAt: string;
  sets?: number;
}

export interface NutritionEntry {
  id: string;
  date: string;
  calories: number;
  protein: number;
  carbs?: number;
  fats?: number;
  meals?: string[];
  createdAt: string;
}

export interface CardioEntry {
  id: string;
  date: string;
  type: string; // running, cycling, etc.
  duration: number; // minutes
  caloriesBurned: number;
  steps?: number;
  createdAt: string;
}

export interface SleepEntry {
  id: string;
  date: string;
  bedtime: string;
  wakeTime: string;
  hoursSlept: number;
  quality: number; // 1-10 scale
  createdAt: string;
}

export interface Goal {
  id: string;
  type: 'weight' | 'strength' | 'cardio';
  title: string;
  currentValue: number;
  targetValue: number;
  startDate: string;
  targetDate: string;
  unit: string;
  exercise?: string; // for strength goals
}

export interface WorkoutPlan {
  day: string;
  type: 'push' | 'pull' | 'legs' | 'rest';
  exercises: {
    name: string;
    sets: number;
    reps: string;
    weight?: number;
  }[];
}

export type FitnessEntry = WeightEntry | StrengthEntry | NutritionEntry | CardioEntry | SleepEntry;

export interface FitnessData {
  weightEntries: WeightEntry[];
  strengthEntries: StrengthEntry[];
  nutritionEntries: NutritionEntry[];
  cardioEntries: CardioEntry[];
  sleepEntries: SleepEntry[];
  goals: Goal[];
  workoutPlans: WorkoutPlan[];
}

export const COMMON_EXERCISES = [
  'Bench Press',
  'Squat',
  'Deadlift',
  'Overhead Press',
  'Pull-ups',
  'Row',
  'Bicep Curls',
  'Tricep Dips'
] as const;