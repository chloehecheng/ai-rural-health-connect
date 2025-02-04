import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2, Phone, Lock } from "lucide-react";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowOTP(true);
      setResendTimer(30);
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send OTP",
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResendTimer(30);
      toast({
        title: "OTP Resent",
        description: "Please check your phone for the new verification code",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to resend OTP",
        description: "Please try again later",
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit verification code",
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const isValid = otp === "123456"; // Mock validation
      
      if (isValid) {
        toast({
          title: "Login Successful",
          description: "Welcome to RuralCare AI",
        });
        const isProvider = Math.random() > 0.5; // Mock user type check
        navigate(isProvider ? "/" : "/patient-portal");
      } else {
        toast({
          variant: "destructive",
          title: "Invalid Code",
          description: "The verification code you entered is incorrect",
        });
        setOTP("");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Invalid input",
        description: "Please enter both email and password",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call for password-based authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      const isValid = email === "test@example.com" && password === "password"; // Mock validation
      
      if (isValid) {
        toast({
          title: "Login Successful",
          description: "Welcome to RuralCare AI",
        });
        const isProvider = Math.random() > 0.5; // Mock user type check
        navigate(isProvider ? "/" : "/patient-portal");
      } else {
        toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "The email or password you entered is incorrect",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please try again later",
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
                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <InputOTP
                        value={otp}
                        onChange={setOTP}
                        maxLength={6}
                        disabled={isLoading}
                        render={({ slots }) => (
                          <InputOTPGroup className="gap-2">
                            {slots.map((slot, idx) => (
                              <InputOTPSlot
                                key={idx}
                                {...slot}
                                index={idx}
                                className="h-12 w-12 text-lg"
                              />
                            ))}
                          </InputOTPGroup>
                        )}
                      />
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      Didn't receive the code?{" "}
                      {resendTimer > 0 ? (
                        <span>Resend in {resendTimer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOTP}
                          disabled={isResending || resendTimer > 0}
                          className="text-primary hover:underline disabled:opacity-50"
                        >
                          {isResending ? "Resending..." : "Resend Code"}
                        </button>
                      )}
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify & Login"
                    )}
                  </Button>
                </form>
              )}
            </TabsContent>

            <TabsContent value="password">
              <form onSubmit={handlePasswordLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Login with Password
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
