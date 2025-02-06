import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PasswordLogin } from "@/components/auth/PasswordLogin";
import { PhoneOTPLogin } from "@/components/auth/PhoneOTPLogin";

const Login = () => {
  const [userRole, setUserRole] = useState<"patient" | "provider">("patient");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLoginSuccess = () => {
    toast({
      title: "Login Successful",
      description: `Welcome back! You are logged in as a ${userRole}.`,
    });
    navigate(userRole === "patient" ? "/patient-portal" : "/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            RuralCare AI
          </CardTitle>
          <CardDescription>
            Sign in to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Login as</Label>
            <RadioGroup
              value={userRole}
              onValueChange={(value) => setUserRole(value as "patient" | "provider")}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="patient"
                  id="patient"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="patient"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Patient</span>
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
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Provider</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Tabs defaultValue="password" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="otp">Phone OTP</TabsTrigger>
            </TabsList>
            <TabsContent value="password">
              <PasswordLogin onSuccess={handleLoginSuccess} />
            </TabsContent>
            <TabsContent value="otp">
              <PhoneOTPLogin onSuccess={handleLoginSuccess} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;