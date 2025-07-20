import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WeightEntry } from '@/types/fitness';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface WeightChartProps {
  entries: WeightEntry[];
}

import { useEffect, useRef } from 'react';

export const WeightChart = ({ entries }: WeightChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.animate([
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 600, easing: 'ease-out' });
    }
  }, [entries]);

  if (entries.length === 0) {
    return (
      <Card className="shadow-card border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-background to-muted/40 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-muted-foreground animate-bounce" />
            Weight Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-2">
            <span className="text-lg font-medium">No weight entries yet</span>
            <span className="text-xs">Add your first entry to see progress!</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = entries
    .slice()
    .reverse()
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short' 
      }),
      weight: entry.weight,
      fullDate: entry.date
    }));

  const latestWeight = entries[0]?.weight;
  const previousWeight = entries[1]?.weight;
  const weightChange = latestWeight && previousWeight ? latestWeight - previousWeight : 0;
  
  const getTrendIcon = () => {
    if (weightChange > 0) return <TrendingUp className="h-4 w-4 text-warning animate-bounce" />;
    if (weightChange < 0) return <TrendingDown className="h-4 w-4 text-success animate-bounce" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const formatTooltipValue = (value: number) => [`${value} kg`, 'Weight'];

  return (
    <Card className="shadow-card border bg-gradient-card animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-primary" />
            <span>Weight Progress</span>
          </div>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className={`text-xs font-medium ${weightChange < 0 ? 'text-success' : weightChange > 0 ? 'text-warning' : 'text-muted-foreground'}`}>{weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="h-64 transition-all duration-500">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip 
                formatter={formatTooltipValue}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};