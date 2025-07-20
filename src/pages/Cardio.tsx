import { useState } from 'react';
import { useFitnessData } from '@/hooks/useFitnessData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Heart, Activity, Moon, Footprints } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const CARDIO_TYPES = ['Running', 'Cycling', 'Swimming', 'Walking', 'Rowing', 'Elliptical'];

const Cardio = () => {
  const { data, addCardioEntry, addSleepEntry } = useFitnessData();
  const [date, setDate] = useState<Date>(new Date());
  
  // Cardio form state
  const [cardioType, setCardioType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [steps, setSteps] = useState('');

  // Sleep form state
  const [bedtime, setBedtime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [hoursSlept, setHoursSlept] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');

  const handleCardioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardioType && duration && caloriesBurned && date) {
      addCardioEntry({
        type: cardioType,
        duration: parseInt(duration),
        caloriesBurned: parseInt(caloriesBurned),
        date: format(date, 'yyyy-MM-dd'),
        steps: steps ? parseInt(steps) : undefined
      });
      setCardioType('');
      setDuration('');
      setCaloriesBurned('');
      setSteps('');
    }
  };

  const handleSleepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bedtime && wakeTime && hoursSlept && sleepQuality && date) {
      addSleepEntry({
        bedtime,
        wakeTime,
        hoursSlept: parseFloat(hoursSlept),
        quality: parseInt(sleepQuality),
        date: format(date, 'yyyy-MM-dd')
      });
      setBedtime('');
      setWakeTime('');
      setHoursSlept('');
      setSleepQuality('');
    }
  };

  const todaysCardio = data.cardioEntries.filter(entry => 
    entry.date === format(new Date(), 'yyyy-MM-dd')
  );
  
  const todaysSleep = data.sleepEntries.find(entry => 
    entry.date === format(new Date(), 'yyyy-MM-dd')
  );

  const totalCaloriesBurned = todaysCardio.reduce((sum, entry) => sum + entry.caloriesBurned, 0);
  const totalSteps = todaysCardio.reduce((sum, entry) => sum + (entry.steps || 0), 0);

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Cardio & Recovery
        </h1>
        <p className="text-muted-foreground">
          Track your cardio workouts, steps, and sleep
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Calories</CardTitle>
            <Heart className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCaloriesBurned}</div>
            <p className="text-xs text-muted-foreground">Calories burned</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Steps</CardTitle>
            <Footprints className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSteps.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Steps taken</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Sleep</CardTitle>
            <Moon className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todaysSleep ? `${todaysSleep.hoursSlept}h` : 'No data'}
            </div>
            <p className="text-xs text-muted-foreground">Hours slept</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workouts Today</CardTitle>
            <Activity className="h-4 w-4 text-fitness-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysCardio.length}</div>
            <p className="text-xs text-muted-foreground">Cardio sessions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cardio" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cardio">Cardio Tracking</TabsTrigger>
          <TabsTrigger value="sleep">Sleep Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="cardio" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Log Cardio Session</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCardioSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardio-type">Cardio Type</Label>
                    <Select value={cardioType} onValueChange={setCardioType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cardio type" />
                      </SelectTrigger>
                      <SelectContent>
                        {CARDIO_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
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

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="30"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="calories-burned">Calories Burned</Label>
                    <Input
                      id="calories-burned"
                      type="number"
                      value={caloriesBurned}
                      onChange={(e) => setCaloriesBurned(e.target.value)}
                      placeholder="300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="steps">Steps (optional)</Label>
                    <Input
                      id="steps"
                      type="number"
                      value={steps}
                      onChange={(e) => setSteps(e.target.value)}
                      placeholder="5000"
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  Log Cardio Session
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Log Sleep</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSleepSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedtime">Bedtime</Label>
                    <Input
                      id="bedtime"
                      type="time"
                      value={bedtime}
                      onChange={(e) => setBedtime(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wake-time">Wake Time</Label>
                    <Input
                      id="wake-time"
                      type="time"
                      value={wakeTime}
                      onChange={(e) => setWakeTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hours-slept">Hours Slept</Label>
                    <Input
                      id="hours-slept"
                      type="number"
                      step="0.5"
                      value={hoursSlept}
                      onChange={(e) => setHoursSlept(e.target.value)}
                      placeholder="8"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sleep-quality">Sleep Quality (1-10)</Label>
                    <Input
                      id="sleep-quality"
                      type="number"
                      min="1"
                      max="10"
                      value={sleepQuality}
                      onChange={(e) => setSleepQuality(e.target.value)}
                      placeholder="8"
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  Log Sleep
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Cardio;