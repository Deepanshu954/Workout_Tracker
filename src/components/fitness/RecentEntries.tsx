import { WeightEntry, StrengthEntry } from '@/types/fitness';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RecentEntriesProps {
  weightEntries: WeightEntry[];
  strengthEntries: StrengthEntry[];
  onEditWeight?: (entry: WeightEntry) => void;
  onEditStrength?: (entry: StrengthEntry) => void;
  onDeleteWeight?: (id: string) => void;
  onDeleteStrength?: (id: string) => void;
}

export const RecentEntries = ({ 
  weightEntries, 
  strengthEntries,
  onEditWeight,
  onEditStrength,
  onDeleteWeight,
  onDeleteStrength
}: RecentEntriesProps) => {
  const allEntries = [
    ...weightEntries.map(entry => ({ ...entry, type: 'weight' as const })),
    ...strengthEntries.map(entry => ({ ...entry, type: 'strength' as const }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10); // Show only the 10 most recent entries

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (allEntries.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Recent Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            No entries yet. Start tracking your fitness journey!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Recent Entries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allEntries.map((entry) => (
              <TableRow key={`${entry.type}-${entry.id}`} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  {formatDate(entry.date)}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={entry.type === 'weight' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {entry.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  {entry.type === 'weight' ? (
                    <span className="font-medium">{entry.weight} kg</span>
                  ) : (
                    <div className="space-y-1">
                      <div className="font-medium">{(entry as StrengthEntry).exercise}</div>
                      <div className="text-sm text-muted-foreground">
                        {entry.weight} kg × {(entry as StrengthEntry).reps} reps
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (entry.type === 'weight' && onEditWeight) {
                          onEditWeight(entry as WeightEntry);
                        } else if (entry.type === 'strength' && onEditStrength) {
                          onEditStrength(entry as StrengthEntry);
                        }
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (entry.type === 'weight' && onDeleteWeight) {
                          onDeleteWeight(entry.id);
                        } else if (entry.type === 'strength' && onDeleteStrength) {
                          onDeleteStrength(entry.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};