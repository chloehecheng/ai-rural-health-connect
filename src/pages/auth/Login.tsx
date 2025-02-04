import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Phone, Lock, Loader2 } from "lucide-react";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { OTPVerification } from "@/components/auth/OTPVerification";
import { PasswordLogin } from "@/components/auth/PasswordLogin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let timer: number;
    if (resendTimer > 0) {
      timer = window.setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendTimer]);

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhoneNumber(phoneNumber)) {
      toast({
        variant: "destructive",
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `${countryCode}${phoneNumber}`,
      });

      if (error) throw error;

      setShowOTP(true);
      setResendTimer(30);
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to send OTP",
        description: error.message || "Please try again later",
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
        type: 'sms'
      });

      if (error) throw error;

      toast({
        title: "Login Successful",
        description: "Welcome to RuralCare AI",
      });

      // Check user role and redirect accordingly
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user?.id)
        .single();

      navigate(profile?.role === 'provider' ? '/dashboard' : '/patient-portal');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error.message || "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `${countryCode}${phoneNumber}`,
      });

      if (error) throw error;

      setResendTimer(30);
      toast({
        title: "OTP Resent",
        description: "Please check your phone for the new verification code",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to resend OTP",
        description: error.message || "Please try again later",
      });
    } finally {
      setIsResending(false);
    }
  };

  const handlePasswordLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Login Successful",
        description: "Welcome to RuralCare AI",
      });

      // Check user role and redirect accordingly
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user?.id)
        .single();

      navigate(profile?.role === 'provider' ? '/dashboard' : '/patient-portal');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">RuralCare AI</CardTitle>
          <CardDescription>
            Sign in to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="phone" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="phone">Phone Number</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>

            <TabsContent value="phone">
              {!showOTP ? (
                <form onSubmit={handleSendOTP} className="space-y-6">
                  <PhoneInput
                    phoneNumber={phoneNumber}
                    countryCode={countryCode}
                    setPhoneNumber={setPhoneNumber}
                    setCountryCode={setCountryCode}
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Code...
                      </>
                    ) : (
                      <>
                        <Phone className="mr-2 h-4 w-4" />
                        Send Code
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <OTPVerification
                  isLoading={isLoading}
                  onVerify={handleVerifyOTP}
                  onResend={handleResendOTP}
                  resendTimer={resendTimer}
                  isResending={isResending}
                />
              )}
            </TabsContent>

            <TabsContent value="password">
              <PasswordLogin
                isLoading={isLoading}
                onSubmit={handlePasswordLogin}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;