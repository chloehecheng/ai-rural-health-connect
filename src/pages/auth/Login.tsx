import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PhoneOTPLogin } from "@/components/auth/PhoneOTPLogin";

const Login = () => {
  const [userRole, setUserRole] = useState<"patient" | "provider">("patient");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLoginSuccess = () => {
    toast({
      title: "✅  Successfully Logged In!",
      description: `Welcome back! You are now signed in as a ${userRole}.`,
      className: "bg-green-50 border-4 border-green-500 p-24 rounded-2xl shadow-2xl [&>div>h1]:text-5xl [&>div>h1]:font-bold [&>div>h1]:leading-normal [&>div>div]:text-4xl [&>div>div]:font-medium [&>div>div]:mt-4 [&>div>div]:leading-normal",
      duration: 5000,
      style: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: 'auto',
        maxWidth: '800px',
        minWidth: '600px',
        zIndex: 1000
      }
    });
    // Direct providers to dashboard, patients to patient portal
    navigate(userRole === "provider" ? "/dashboard" : "/patient-portal");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-6 py-10">
      <Card className="w-full max-w-4xl mx-auto shadow-lg border-2">
        <CardHeader className="space-y-8 text-center pb-12 border-b-2">
          <CardTitle className="text-6xl md:text-7xl font-bold tracking-tight text-primary">
            RuralCare AI
          </CardTitle>
          <CardDescription className="text-3xl md:text-4xl">
            Welcome to your virtual healthcare
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-12 pt-8">
          <div className="space-y-10">
            <Label className="text-3xl font-semibold block text-center mb-8">Are you a patient or healthcare provider?</Label>
            <RadioGroup
              value={userRole}
              onValueChange={(value) => setUserRole(value as "patient" | "provider")}
              className="grid grid-cols-1 sm:grid-cols-2 gap-10"
            >
              <div>
                <RadioGroupItem
                  value="patient"
                  id="patient"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="patient"
                  className="flex items-center justify-center rounded-xl border-2 bg-popover p-10 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary transition-all duration-200 cursor-pointer min-h-[200px] relative group shadow-md"
                >
                  <span className="text-4xl md:text-5xl font-semibold">Patient</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="provider"
                  id="provider"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="provider"
                  className="flex items-center justify-center rounded-xl border-2 bg-popover p-10 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary transition-all duration-200 cursor-pointer min-h-[200px] relative group shadow-md"
                >
                  <span className="text-4xl md:text-5xl font-semibold">Provider</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="pt-8 border-t-2">
            <PhoneOTPLogin onSuccess={handleLoginSuccess} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
