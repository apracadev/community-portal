import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }

      // Fetch user profile data
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      if (profileData) {
        setProfile(profileData);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching user data",
        description: error.message,
      });
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Logged out successfully",
      });

      navigate("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: error.message,
      });
    }
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

        <div className="glass-form p-8 rounded-xl space-y-4">
          <p className="text-lg text-muted-foreground">
            This is your home page. The platform is ready for you to start
            building your community!
          </p>

          {profile && (
            <div className="mt-4 p-4 bg-accent/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Logged in as:</p>
              <p className="text-lg font-medium">
                {profile.first_name} {profile.last_name}, also known as @
                {profile.username}
              </p>
              <p className="text-sm text-muted-foreground">
                Welcome to the BH Carnaval 2025 Test 1!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
