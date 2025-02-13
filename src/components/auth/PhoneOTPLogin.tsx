import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendVerificationCode, verifyCode } from "@/lib/twilio";

interface PhoneOTPLoginProps {
  onSuccess: () => void;
}

export const PhoneOTPLogin = ({ onSuccess }: PhoneOTPLoginProps) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { toast } = useToast();

  const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleSendOTP = async () => {
    if (!name || !phoneNumber) {
      toast({
        title: "Please Fill All Fields",
        description: "We need your name and phone number to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const cleanPhone = phoneNumber.replace(/\D/g, "");
      const { data, error } = await sendVerificationCode(`+1${cleanPhone}`);

      if (error) {
        toast({
          title: "Couldn't Send Code",
          description: "Please try again in a few minutes.",
          variant: "destructive",
        });
        return;
      }

      setShowOTP(true);
      startResendTimer();
      toast({
        title: "Code Sent!",
        description: "Please check your phone for the verification code.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startResendTimer = () => {
    setResendTimer(60);
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

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast({
        title: "Enter Code",
        description: "Please enter the verification code sent to your phone.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const cleanPhone = phoneNumber.replace(/\D/g, "");
      const { data, error } = await verifyCode(`+1${cleanPhone}`, otp);

      if (error) {
        toast({
          title: "Invalid Code",
          description: "Please check the code and try again.",
          variant: "destructive",
        });
        return;
      }

      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!showOTP ? (
        <>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-xl mb-2 block">First Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-xl p-6"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-xl mb-2 block">Phone Number</Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={handlePhoneInput}
                className="text-xl p-6"
                placeholder="(555) 555-5555"
                maxLength={14}
              />
            </div>
          </div>
          <Button
            className="w-full text-xl p-6"
            onClick={handleSendOTP}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            ) : (
              <Phone className="mr-2 h-6 w-6" />
            )}
            Send Verification Code
          </Button>
        </>
      ) : (
        <div className="space-y-4">
          <div>
            <Label htmlFor="otp" className="text-xl mb-2 block">Enter Verification Code</Label>
            <Input
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="text-xl p-6 text-center tracking-widest"
              placeholder="Enter 6-digit code"
              maxLength={6}
            />
          </div>
          <Button
            className="w-full text-xl p-6"
            onClick={handleVerifyOTP}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            ) : (
              "Verify Code"
            )}
          </Button>
          {resendTimer > 0 ? (
            <p className="text-center text-gray-500 text-lg">
              Resend code in {resendTimer} seconds
            </p>
          ) : (
            <Button
              variant="link"
              className="w-full text-lg"
              onClick={handleSendOTP}
              disabled={isLoading}
            >
              Resend Code
            </Button>
          )}
        </div>
      )}
    </div>
  );
};