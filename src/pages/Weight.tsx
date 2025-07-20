import { useState } from 'react';
import { WeightChart } from '@/components/fitness/WeightChart';
import { useFitnessData } from '@/hooks/useFitnessData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Scale, Apple, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Weight = () => {
  const { data, addWeightEntry, addNutritionEntry } = useFitnessData();
  const [date, setDate] = useState<Date>(new Date());
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight && date) {
      addWeightEntry({ weight: parseFloat(weight), date: format(date, 'yyyy-MM-dd') });
      setWeight('');
    }
  };

  const handleNutritionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (calories && protein && date) {
      addNutritionEntry({
        calories: parseInt(calories), 
        protein: parseInt(protein), 
        date: format(date, 'yyyy-MM-dd'),
        carbs: carbs ? parseInt(carbs) : undefined,
        fats: fats ? parseInt(fats) : undefined
      });
      setCalories('');
      setProtein('');
      setCarbs('');
      setFats('');
    }
  };

  const currentWeight = data.weightEntries[0]?.weight;
  const lastNutrition = data.nutritionEntries[0];

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Weight & Nutrition
        </h1>
        <p className="text-muted-foreground">
          Track your body weight and nutrition intake
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
            <Scale className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentWeight ? `${currentWeight} kg` : 'No data'}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Calories</CardTitle>
            <Zap className="h-4 w-4 text-fitness-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lastNutrition ? `${lastNutrition.calories}` : '0'} kcal
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Protein</CardTitle>
            <Apple className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lastNutrition ? `${lastNutrition.protein}` : '0'}g
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weight Chart */}
      <WeightChart entries={data.weightEntries} />

      {/* Entry Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Entry Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Log Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleWeightSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight"
                  required
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
              
              <Button type="submit" className="w-full">
                Log Weight
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Nutrition Entry Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Log Nutrition</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNutritionSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories (kcal)</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="2000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    placeholder="150"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    placeholder="200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fats">Fats (g)</Label>
                  <Input
                    id="fats"
                    type="number"
                    value={fats}
                    onChange={(e) => setFats(e.target.value)}
                    placeholder="70"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Log Nutrition
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Weight;