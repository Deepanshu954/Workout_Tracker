import { useState } from 'react';
import { StrengthChart } from '@/components/fitness/StrengthChart';
import { useFitnessData } from '@/hooks/useFitnessData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Dumbbell, TrendingUp, Target } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const EXERCISES = ['Bench Press', 'Deadlift', 'Squats'];

const WORKOUT_PLANS = {
  push: {
    Primary: [
      { name: 'Flat Barbell Bench Press', sets: 4, reps: '6' },
      { name: 'Incline Dumbbell Press', sets: 4, reps: '8' },
      { name: 'Decline Barbell Bench Press', sets: 3, reps: '8'},
      { name: 'Machine Chest Fly', sets: 3, reps: '12' },
      { name: 'Cable Chest Fly', sets: 3, reps: '12' },
    ],
    Triceps: [
      { name: 'Skullcrushers or EZ Bar Extension', sets: 3, reps: '10' },
      { name: 'Tricep Rope Pushdowns', sets: 3, reps: '15' },
      { name: 'Single Arm Cable Extension', sets: 3, reps: '15'},
    ],
    Shoulders: [
      { name: 'Seated Overhead DB Press', sets: 3, reps: '10' },
      { name: 'Lateral Raises', sets: 3, reps: '15' },
      { name: 'Rear Delt Machine / Reverse Fly', sets: 3, reps: '15' },
    ],
  },
  pull: {
    Primary: [
      { name: 'Deadlifts (Wednesday only)', sets: 4, reps: '5' },
      { name: 'Pull-ups', sets: 4, reps: '10' },
      { name: 'Barbell Rows / Dumbbell Rows', sets: 4, reps: '10' },
      { name: 'Face Pulls', sets: 3, reps: '15' },
      { name: 'Lat Pulldown', sets: 3, reps: '12' },
    ],
    Biceps: [
      { name: 'Barbell Curls', sets: 3, reps: '10' },
      { name: 'Incline DB Curls', sets: 3, reps: '12' },
      { name: 'Hammer Curls', sets: 3, reps: '12' },
    ],
    'Forearms & Grip': [
      { name: 'Wrist Curls', sets: 3, reps: '20' },
      { name: 'Plate Pinch Hold', sets: 3, reps: '30s' },
      { name: 'Dead Hangs', sets: 4, reps: 'Max Time' },
    ],
  },
  legs: {
    Primary: [
      { name: 'Barbell Back Squats', sets: 4, reps: '6' },
      { name: 'Romanian Deadlifts', sets: 4, reps: '8' },
      { name: 'Bulgarian Split Squats (each leg)', sets: 3, reps: '10' },
      { name: 'Leg Press', sets: 3, reps: '12' },
      { name: 'Calf Raises', sets: 4, reps: '20' },
    ],
    Core: [
      { name: 'Weighted Decline Sit-ups', sets: 3, reps: '15' },
      { name: 'Hanging Leg Raises', sets: 3, reps: '15' },
      { name: 'Cable Woodchoppers (each side)', sets: 3, reps: '12' },
      { name: 'Plank', sets: 3, reps: '2min' },
    ],
    Carries: [
      { name: 'Heavy Dumbbell Farmer’s Walk', sets: 3, reps: '20m' },
      { name: 'Suitcase Carry (one side)', sets: 3, reps: '20m per side' },
    ],
  },
};
const Strength = () => {
  const { data, addStrengthEntry } = useFitnessData();
  const [date, setDate] = useState<Date>(new Date());
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  // Removed sets

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (exercise && weight && reps && date) {
      addStrengthEntry({
        exercise,
        weight: parseFloat(weight),
        reps: parseInt(reps),
        date: format(date, 'yyyy-MM-dd'),
      });
      setWeight('');
      setReps('');
    }
  };

  const getMaxWeight = (exerciseName: string) => {
    const exerciseEntries = data.strengthEntries.filter(entry => entry.exercise === exerciseName);
    return exerciseEntries.length > 0 ? Math.max(...exerciseEntries.map(entry => entry.weight)) : 0;
  };

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-6 animate-fade-in">

      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Strength Training
        </h1>
        <p className="text-muted-foreground">
          Track your barbell exercises and follow workout plans
        </p>
      </div>

      {/* Total PR and Main Lifts */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card className="shadow-card bg-gradient-to-br from-primary/80 to-primary/40 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total PR</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getMaxWeight('Bench Press') + getMaxWeight('Deadlift') + getMaxWeight('Squats')} kg
            </div>
            <p className="text-xs text-white/80">Sum of best lifts</p>
          </CardContent>
        </Card>
        {['Bench Press', 'Deadlift', 'Squats'].map((exerciseName) => (
          <Card key={exerciseName} className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{exerciseName}</CardTitle>
              <Dumbbell className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getMaxWeight(exerciseName)} kg
              </div>
              <p className="text-xs text-muted-foreground">Personal best</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="progress">Progress & Logging</TabsTrigger>
          <TabsTrigger value="workouts">Workout Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          {/* Strength Chart */}
          <StrengthChart entries={data.strengthEntries} />

          {/* Log Entry Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Log Strength Training</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exercise">Exercise</Label>
                    <Select value={exercise} onValueChange={setExercise} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select exercise" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXERCISES.map((ex) => (
                          <SelectItem key={ex} value={ex}>
                            {ex}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="100"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reps">Reps</Label>
                    <Input
                      id="reps"
                      type="number"
                      value={reps}
                      onChange={(e) => setReps(e.target.value)}
                      placeholder="8"
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  Log Exercise
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workouts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(WORKOUT_PLANS).map(([type, groups]) => (
              <Card key={type} className="shadow-card">
                <CardHeader>
                  <CardTitle className="capitalize">{type} Day</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(groups).map(([groupName, exercises]) => (
                    <div key={groupName}>
                      <h4 className="font-semibold text-primary mb-2">{groupName}</h4>
                      <div className="space-y-2">
                        {exercises.map((exercise, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                            <span className="font-medium">{exercise.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {exercise.sets} × {exercise.reps}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Strength;