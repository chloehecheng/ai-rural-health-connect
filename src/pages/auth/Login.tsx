import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simulated OTP verification - replace with actual API calls
  const verifyOTP = async (otpValue: string) => {
    // This is a mock verification - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, consider "123456" as valid OTP
        resolve(otpValue === "123456");
      }, 1500);
    });
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      toast({
        variant: "destructive",
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowOTP(true);
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the OTP",
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
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "OTP Resent",
        description: "Please check your phone for the new OTP",
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
        description: "Please enter a valid 6-digit OTP",
      });
      return;
    }

    setIsLoading(true);
    try {
      const isValid = await verifyOTP(otp);
      if (isValid) {
        toast({
          title: "Login Successful",
          description: "Welcome to RuralCare AI",
        });
        navigate("/patient-portal");
      } else {
        toast({
          variant: "destructive",
          title: "Invalid OTP",
          description: "The code you entered is incorrect. Please try again.",
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">RuralCare AI</CardTitle>
          <CardDescription>
            {!showOTP 
              ? "Enter your phone number to receive a one-time password"
              : "Enter the 6-digit code sent to your phone"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showOTP ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div className="space-y-2">
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-12 text-lg"
                  maxLength={10}
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
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
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isResending}
                    className="text-primary hover:underline disabled:opacity-50"
                  >
                    {isResending ? "Resending..." : "Resend OTP"}
                  </button>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;