
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Will implement with Supabase once connected
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-accent to-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to Praca</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        
        <div className="glass-form p-8 rounded-xl">
          <p className="text-lg text-muted-foreground">
            This is your home page. The platform is ready for you to start building your community!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
