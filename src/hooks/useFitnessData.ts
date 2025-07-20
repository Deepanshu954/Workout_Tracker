import { useState, useEffect } from 'react';
import { FitnessData, WeightEntry, StrengthEntry, NutritionEntry, CardioEntry, SleepEntry, Goal } from '@/types/fitness';

const STORAGE_KEY = 'fitness-tracker-data';

export const useFitnessData = () => {
  const [data, setData] = useState<FitnessData>({
    weightEntries: [],
    strengthEntries: [],
    nutritionEntries: [],
    cardioEntries: [],
    sleepEntries: [],
    goals: [],
    workoutPlans: []
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        setData(parsedData);
      } catch (error) {
        console.error('Error parsing fitness data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addWeightEntry = (entry: Omit<WeightEntry, 'id' | 'createdAt'>) => {
    const newEntry: WeightEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    setData(prev => ({
      ...prev,
      weightEntries: [...prev.weightEntries, newEntry].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }));
  };

  const addStrengthEntry = (entry: Omit<StrengthEntry, 'id' | 'createdAt'>) => {
    const newEntry: StrengthEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    setData(prev => ({
      ...prev,
      strengthEntries: [...prev.strengthEntries, newEntry].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }));
  };

  const updateWeightEntry = (id: string, updates: Partial<WeightEntry>) => {
    setData(prev => ({
      ...prev,
      weightEntries: prev.weightEntries.map(entry =>
        entry.id === id ? { ...entry, ...updates } : entry
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }));
  };

  const updateStrengthEntry = (id: string, updates: Partial<StrengthEntry>) => {
    setData(prev => ({
      ...prev,
      strengthEntries: prev.strengthEntries.map(entry =>
        entry.id === id ? { ...entry, ...updates } : entry
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }));
  };

  const deleteWeightEntry = (id: string) => {
    setData(prev => ({
      ...prev,
      weightEntries: prev.weightEntries.filter(entry => entry.id !== id)
    }));
  };

  const deleteStrengthEntry = (id: string) => {
    setData(prev => ({
      ...prev,
      strengthEntries: prev.strengthEntries.filter(entry => entry.id !== id)
    }));
  };

  const addNutritionEntry = (entry: Omit<NutritionEntry, 'id' | 'createdAt'>) => {
    const newEntry: NutritionEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    setData(prev => ({
      ...prev,
      nutritionEntries: [...prev.nutritionEntries, newEntry].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }));
  };

  const addCardioEntry = (entry: Omit<CardioEntry, 'id' | 'createdAt'>) => {
    const newEntry: CardioEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    setData(prev => ({
      ...prev,
      cardioEntries: [...prev.cardioEntries, newEntry].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }));
  };

  const addSleepEntry = (entry: Omit<SleepEntry, 'id' | 'createdAt'>) => {
    const newEntry: SleepEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    setData(prev => ({
      ...prev,
      sleepEntries: [...prev.sleepEntries, newEntry].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }));
  };

  const addGoal = (entry: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...entry,
      id: crypto.randomUUID()
    };
    
    setData(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  };

  return {
    data,
    addWeightEntry,
    addStrengthEntry,
    addNutritionEntry,
    addCardioEntry,
    addSleepEntry,
    addGoal,
    updateWeightEntry,
    updateStrengthEntry,
    deleteWeightEntry,
    deleteStrengthEntry
  };
};