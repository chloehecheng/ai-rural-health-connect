import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      toast({
        variant: "destructive",
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
      });
      return;
    }
    setShowOTP(true);
    toast({
      title: "OTP Sent",
      description: "Please check your phone for the OTP",
    });
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
      });
      return;
    }
    navigate("/patient-portal");
    toast({
      title: "Login Successful",
      description: "Welcome to RuralCare AI",
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">RuralCare AI</CardTitle>
          <CardDescription>
            Enter your phone number to receive a one-time password
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
                />
              </div>
              <Button type="submit" className="w-full h-12 text-lg">
                Send OTP
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
                    onClick={() => {
                      setShowOTP(false);
                      toast({
                        title: "OTP Resent",
                        description: "Please check your phone for the new OTP",
                      });
                    }}
                    className="text-primary hover:underline"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-lg">
                Verify & Login
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;