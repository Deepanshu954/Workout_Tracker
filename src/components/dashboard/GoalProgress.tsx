import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Goal } from '@/types/fitness';
import { Target, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

interface GoalProgressProps {
  goal: Goal;
  currentValue: number;
}

export const GoalProgress = ({ goal, currentValue }: GoalProgressProps) => {
  const isWeightLoss = goal.type === 'weight' && goal.targetValue < goal.currentValue;
  const progressPercentage = isWeightLoss 
    ? Math.max(0, Math.min(100, ((goal.currentValue - currentValue) / (goal.currentValue - goal.targetValue)) * 100))
    : Math.max(0, Math.min(100, (currentValue / goal.targetValue) * 100));

  const remainingValue = isWeightLoss 
    ? Math.max(0, currentValue - goal.targetValue)
    : Math.max(0, goal.targetValue - currentValue);

  const isOnTrack = isWeightLoss 
    ? currentValue < goal.currentValue 
    : currentValue > goal.currentValue;

  const daysRemaining = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="shadow-card hover:shadow-chart transition-smooth">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{goal.title}</CardTitle>
        <div className="flex items-center gap-2">
          {isOnTrack ? (
            <TrendingUp className="h-4 w-4 text-success" />
          ) : (
            <TrendingDown className="h-4 w-4 text-destructive" />
          )}
          <Target className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Current</p>
            <p className="font-semibold">{currentValue} {goal.unit}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Target</p>
            <p className="font-semibold">{goal.targetValue} {goal.unit}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Remaining</p>
            <p className="font-semibold">{remainingValue.toFixed(1)} {goal.unit}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Time Left</p>
            <p className="font-semibold flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {daysRemaining} days
            </p>
          </div>
        </div>

        <Badge variant={isOnTrack ? "default" : "destructive"} className="w-fit">
          {isOnTrack ? "On Track" : "Needs Attention"}
        </Badge>
      </CardContent>
    </Card>
  );
};