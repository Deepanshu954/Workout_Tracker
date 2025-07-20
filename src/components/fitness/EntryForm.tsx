import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, Dumbbell, Scale, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { WeightEntry, StrengthEntry, COMMON_EXERCISES } from '@/types/fitness';
import { toast } from 'sonner';

interface EntryFormProps {
  onAddWeight: (entry: Omit<WeightEntry, 'id' | 'createdAt'>) => void;
  onAddStrength: (entry: Omit<StrengthEntry, 'id' | 'createdAt'>) => void;
}

export const EntryForm = ({ onAddWeight, onAddStrength }: EntryFormProps) => {
  const [activeTab, setActiveTab] = useState('weight');
  
  // Weight form state
  const [weight, setWeight] = useState('');
  const [weightDate, setWeightDate] = useState<Date>(new Date());
  
  // Strength form state
  const [exercise, setExercise] = useState('');
  const [strengthWeight, setStrengthWeight] = useState('');
  const [reps, setReps] = useState('');
  const [strengthDate, setStrengthDate] = useState<Date>(new Date());
  const [customExercise, setCustomExercise] = useState('');

  const resetWeightForm = () => {
    setWeight('');
    setWeightDate(new Date());
  };

  const resetStrengthForm = () => {
    setExercise('');
    setStrengthWeight('');
    setReps('');
    setStrengthDate(new Date());
    setCustomExercise('');
  };

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight || isNaN(Number(weight))) {
      toast.error('Please enter a valid weight');
      return;
    }

    onAddWeight({
      weight: Number(weight),
      date: weightDate.toISOString().split('T')[0]
    });

    toast.success('Weight entry added successfully!');
    resetWeightForm();
  };

  const handleStrengthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalExercise = exercise === 'custom' ? customExercise : exercise;
    
    if (!finalExercise || !strengthWeight || !reps) {
      toast.error('Please fill in all fields');
      return;
    }

    if (isNaN(Number(strengthWeight)) || isNaN(Number(reps))) {
      toast.error('Please enter valid numbers for weight and reps');
      return;
    }

    onAddStrength({
      exercise: finalExercise,
      weight: Number(strengthWeight),
      reps: Number(reps),
      date: strengthDate.toISOString().split('T')[0]
    });

    toast.success('Strength entry added successfully!');
    resetStrengthForm();
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Add New Entry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weight" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Weight
            </TabsTrigger>
            <TabsTrigger value="strength" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              Strength
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weight" className="space-y-4">
            <form onSubmit={handleWeightSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="75.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !weightDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {weightDate ? format(weightDate, 'dd MMM yyyy') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={weightDate}
                      onSelect={(date) => date && setWeightDate(date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button type="submit" className="w-full" variant="fitness">
                Add Weight Entry
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="strength" className="space-y-4">
            <form onSubmit={handleStrengthSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="exercise">Exercise</Label>
                <Select value={exercise} onValueChange={setExercise}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an exercise" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMMON_EXERCISES.map((ex) => (
                      <SelectItem key={ex} value={ex}>
                        {ex}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom Exercise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {exercise === 'custom' && (
                <div className="space-y-2">
                  <Label htmlFor="customExercise">Custom Exercise Name</Label>
                  <Input
                    id="customExercise"
                    placeholder="Enter exercise name"
                    value={customExercise}
                    onChange={(e) => setCustomExercise(e.target.value)}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="strengthWeight">Weight (kg)</Label>
                  <Input
                    id="strengthWeight"
                    type="number"
                    step="0.5"
                    placeholder="100"
                    value={strengthWeight}
                    onChange={(e) => setStrengthWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reps">Reps</Label>
                  <Input
                    id="reps"
                    type="number"
                    placeholder="10"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !strengthDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {strengthDate ? format(strengthDate, 'dd MMM yyyy') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={strengthDate}
                      onSelect={(date) => date && setStrengthDate(date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button type="submit" className="w-full" variant="fitness">
                Add Strength Entry
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};