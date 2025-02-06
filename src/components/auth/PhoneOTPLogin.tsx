import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { OTPVerification } from "@/components/auth/OTPVerification";
import { Phone, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface PhoneOTPLoginProps {
  onSuccess: () => void;
}

export const PhoneOTPLogin = ({ onSuccess }: PhoneOTPLoginProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);

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

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: `${countryCode}${phoneNumber}`,
      });

      if (error) {
        if (error.message.includes("Invalid From Number")) {
          toast.error(
            "Phone authentication is not configured. Please contact support."
          );
        } else if (error.message.includes("Invalid phone number")) {
          toast.error("Please enter a valid phone number.");
        } else {
          toast.error(error.message);
        }
        throw error;
      }

      setShowOTP(true);
      startResendTimer();
      toast.success("Verification code sent successfully!");
    } catch (error: any) {
      console.error("Error sending OTP:", error);
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

      if (error) {
        if (error.message.includes("Invalid token")) {
          toast.error("Invalid verification code. Please try again.");
        } else {
          toast.error(error.message);
        }
        throw error;
      }

      toast.success("Phone number verified successfully!");
      onSuccess();
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      await handleSendOTP();
      startResendTimer();
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-6">
      {!showOTP ? (
        <div className="space-y-4">
          <PhoneInput
            phoneNumber={phoneNumber}
            countryCode={countryCode}
            setPhoneNumber={setPhoneNumber}
            setCountryCode={setCountryCode}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendOTP}
            className="w-full h-12 text-lg"
            disabled={isLoading || !phoneNumber}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending code...
              </>
            ) : (
              <>
                <Phone className="mr-2 h-4 w-4" />
                Send Verification Code
              </>
            )}
          </Button>
        </div>
      ) : (
        <OTPVerification
          isLoading={isLoading}
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
          resendTimer={resendTimer}
          isResending={isResending}
        />
      )}
    </div>
  );
};