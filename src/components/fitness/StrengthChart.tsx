import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { StrengthEntry } from '@/types/fitness';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

interface StrengthChartProps {
  entries: StrengthEntry[];
}

export const StrengthChart = ({ entries }: StrengthChartProps) => {
  const [selectedExercise, setSelectedExercise] = useState<string>('all');
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  
  if (entries.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-fitness-accent" />
            Strength Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            No strength entries yet. Add your first workout to see progress!
          </div>
        </CardContent>
      </Card>
    );
  }


  // Only show PR (max weight) for each exercise
  const exercises = Array.from(new Set(entries.map(entry => entry.exercise)));

  // Helper: get PR for an exercise
  const getPR = (exercise: string) => {
    const filtered = entries.filter(e => e.exercise === exercise);
    return filtered.length > 0 ? Math.max(...filtered.map(e => e.weight)) : 0;
  };

  // For 'all', show sum of PRs for 4 main lifts
  const MAIN_LIFTS = ['Bench Press', 'Deadlift', 'Squats'];
  // Only consider entries from August to end of year
  const startYear = 2025;
  const startMonth = 7; // August (0-indexed)
  const endMonth = 11; // December
  const startDate = new Date(startYear, startMonth, 1);
  const endDate = new Date(startYear, endMonth + 1, 0);

  // Helper to get week number of year
  function getWeek(date: Date) {
    const firstJan = new Date(date.getFullYear(), 0, 1);
    // @ts-expect-error Date subtraction for week calculation
    return Math.ceil((((date - firstJan) / 86400000) + firstJan.getDay() + 1) / 7);
  }

  // Helper to get all periods (weeks or months) from August to December
  type Period = { label: string; start: Date; end: Date };
  const periods: Period[] = [];
  if (period === 'weekly') {
    const d = new Date(startDate);
    while (d <= endDate) {
      const weekStart = new Date(d);
      const weekEnd = new Date(d);
      weekEnd.setDate(weekStart.getDate() + 6);
      periods.push({
        label: weekEnd.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        start: new Date(weekStart),
        end: new Date(Math.min(weekEnd.getTime(), endDate.getTime())),
      });
      d.setDate(d.getDate() + 7);
    }
  } else {
    // monthly
    for (let m = startMonth; m <= endMonth; m++) {
      const monthStart = new Date(startYear, m, 1);
      const monthEnd = new Date(startYear, m + 1, 0);
      periods.push({
        label: monthEnd.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        start: monthStart,
        end: new Date(Math.min(monthEnd.getTime(), endDate.getTime())),
      });
    }
  }

  type ChartDatum = { date: string; pr: number | null };
  let chartData: ChartDatum[] = [];
  if (selectedExercise === 'all') {
    chartData = periods.map(({ label, start, end }) => {
      let sum = 0;
      let hasData = false;
      MAIN_LIFTS.forEach(ex => {
        const prs = entries.filter(e => e.exercise === ex && new Date(e.date) >= start && new Date(e.date) <= end);
        if (prs.length > 0) hasData = true;
        sum += prs.length > 0 ? Math.max(...prs.map(e => e.weight)) : 0;
      });
      return hasData ? { date: label, pr: sum } : { date: label, pr: null };
    });
  } else {
    chartData = periods.map(({ label, start, end }) => {
      const prs = entries.filter(e => e.exercise === selectedExercise && new Date(e.date) >= start && new Date(e.date) <= end);
      return prs.length > 0 ? { date: label, pr: Math.max(...prs.map(e => e.weight)) } : { date: label, pr: null };
    });
  }

  // Total PR is overall max (not just sum of last week)
  const allPRSum = MAIN_LIFTS.reduce((sum, ex) => sum + getPR(ex), 0);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex flex-col gap-2 items-start md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-fitness-accent" />
            Strength PR Progress
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Select value={period} onValueChange={v => setPeriod(v as 'weekly' | 'monthly')}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedExercise} onValueChange={setSelectedExercise}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select exercise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exercises</SelectItem>
                {exercises.map(exercise => (
                  <SelectItem key={exercise} value={exercise}>
                    {exercise}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="prColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: 'PR (kg)', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                formatter={(value: number | null) => value !== null ? [`${value} kg`, 'PR'] : ['No data', 'PR']}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone"
                dataKey="pr"
                stroke="url(#prColor)"
                strokeWidth={4}
                dot={{ r: 5, fill: 'hsl(var(--primary))', stroke: 'white', strokeWidth: 2 }}
                name={selectedExercise === 'all' ? 'Sum PR (4 lifts)' : 'PR'}
                isAnimationActive={false}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {selectedExercise === 'all' && (
          <div className="mt-4 text-center text-lg font-semibold">
            Current Total PR (4 lifts): <span className="text-primary">{allPRSum} kg</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};