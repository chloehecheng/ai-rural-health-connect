import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { OTPVerification } from "@/components/auth/OTPVerification";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [password, setPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const startResendTimer = () => {
    setResendTimer(30);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      const { data, error } = await supabase.auth.signInWithPassword({
        phone: fullPhoneNumber,
        password,
      });

      if (error) throw error;

      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      const { data, error } = await supabase.auth.signUp({
        phone: fullPhoneNumber,
        password,
      });

      if (error) throw error;

      setShowOTP(true);
      startResendTimer();
      toast({
        title: "Verification Required",
        description: "Please enter the code sent to your phone.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: `${countryCode}${phoneNumber}`,
        token: otp,
        type: "sms",
      });

      if (error) throw error;

      toast({
        title: "Verification Successful",
        description: "Your account has been verified.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        phone: `${countryCode}${phoneNumber}`,
        password,
      });

      if (error) throw error;

      startResendTimer();
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your phone.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to Resend Code",
        description: error.message,
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            RuralCare AI
          </CardTitle>
          <CardDescription>
            {showOTP
              ? "Enter the verification code sent to your phone"
              : "Sign in with your phone number"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showOTP ? (
            <OTPVerification
              isLoading={isLoading}
              onVerify={handleVerifyOTP}
              onResend={handleResendOTP}
              resendTimer={resendTimer}
              isResending={isResending}
            />
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <PhoneInput
                  phoneNumber={phoneNumber}
                  countryCode={countryCode}
                  setPhoneNumber={setPhoneNumber}
                  setCountryCode={setCountryCode}
                  disabled={isLoading}
                />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-lg"
                  disabled={isLoading || !phoneNumber || !password}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-lg"
                  onClick={handleSignUp}
                  disabled={isLoading || !phoneNumber || !password}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing up...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;