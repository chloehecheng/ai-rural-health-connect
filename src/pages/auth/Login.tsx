import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [userType, setUserType] = useState<"patient" | "provider">("patient");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we'll just redirect based on user type
    if (userType === "patient") {
      navigate("/patient-portal");
    } else {
      navigate("/");
    }
    toast({
      title: "Logged in successfully",
      description: `Welcome back ${userType}!`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">RuralCare AI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-center gap-4">
            <Button
              variant={userType === "patient" ? "default" : "outline"}
              onClick={() => setUserType("patient")}
            >
              Patient
            </Button>
            <Button
              variant={userType === "provider" ? "default" : "outline"}
              onClick={() => setUserType("provider")}
            >
              Provider
            </Button>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;