import { GoalProgress } from '@/components/dashboard/GoalProgress';
import { useFitnessData } from '@/hooks/useFitnessData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Target, TrendingUp, Calendar, Heart, Moon } from 'lucide-react';

const Dashboard = () => {
  const { data } = useFitnessData();

  // Sample goal - in real app, this would come from user settings
  const weightGoal = {
    id: '1',
    type: 'weight' as const,
    title: 'Weight Loss Goal',
    currentValue: 95,
    targetValue: 80,
    startDate: '2024-01-01',
    targetDate: '2024-04-01',
    unit: 'kg'
  };

  const stats = {
    totalEntries: data.weightEntries.length + data.strengthEntries.length + data.cardioEntries.length,
    weeklyEntries: [...data.weightEntries, ...data.strengthEntries, ...data.cardioEntries].filter(
      entry => {
        const entryDate = new Date(entry.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return entryDate >= weekAgo;
      }
    ).length,
    currentWeight: data.weightEntries[0]?.weight || weightGoal.currentValue,
    totalWorkouts: data.cardioEntries.length + data.strengthEntries.length,
    avgSleep: data.sleepEntries.length > 0 
      ? (data.sleepEntries.reduce((sum, entry) => sum + entry.hoursSlept, 0) / data.sleepEntries.length)
      : 0
  };

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Fitness Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your progress and achieve your fitness goals
        </p>
      </div>

      {/* Goal Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GoalProgress goal={weightGoal} currentValue={stats.currentWeight} />
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
              <Heart className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWorkouts}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Sleep</CardTitle>
              <Moon className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.avgSleep > 0 ? `${stats.avgSleep.toFixed(1)}h` : 'No data'}
              </div>
              <p className="text-xs text-muted-foreground">Per night</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Monthly Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card hover:shadow-chart transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-fitness-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.weeklyEntries}</div>
            <p className="text-xs text-muted-foreground">
              Entries in last 7 days
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-chart transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
            <Target className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.currentWeight ? `${stats.currentWeight} kg` : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Latest recorded
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-chart transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEntries}</div>
            <p className="text-xs text-muted-foreground">
              All tracking data
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-chart transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(((weightGoal.currentValue - stats.currentWeight) / (weightGoal.currentValue - weightGoal.targetValue)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Goal completion
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;