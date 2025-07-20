import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">FitTracker</h1>
        <p className="text-xl text-muted-foreground">Track your weight loss and strength gain progress with beautiful charts and analytics.</p>
        <div className="flex flex-col items-center gap-4">
          <Link to="/dashboard" className="px-6 py-2 rounded bg-primary text-white font-semibold shadow hover:bg-primary/90 transition">Go to Dashboard</Link>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/weight" className="underline text-primary">Weight</Link>
            <Link to="/strength" className="underline text-primary">Strength</Link>
            <Link to="/cardio" className="underline text-primary">Cardio</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
