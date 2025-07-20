import { Button } from '@/components/ui/button';
import { Activity, Plus, Home, Scale, Dumbbell, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: Home,
    },
    {
      path: '/weight',
      label: 'Weight',
      icon: Scale,
    },
    {
      path: '/strength',
      label: 'Strength',
      icon: Dumbbell,
    },
    {
      path: '/cardio',
      label: 'Cardio',
      icon: Heart,
    }
  ];

  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">FitTracker</h1>
              <p className="text-xs text-muted-foreground">Personal Fitness</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? 'default' : 'ghost'}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "gap-2 transition-smooth",
                    isActive && "bg-gradient-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "transition-smooth",
                    isActive && "bg-gradient-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};