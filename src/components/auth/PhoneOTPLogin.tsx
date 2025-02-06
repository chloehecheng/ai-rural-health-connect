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

  const formatPhoneNumber = (phone: string) => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, "");
    // Ensure the country code is included
    return `${countryCode}${cleaned}`;
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) {
        if (error.message.includes("Invalid phone number")) {
          toast.error("Please enter a valid phone number");
        } else {
          toast.error("Failed to send verification code. Please try again.");
        }
        console.error("OTP Error:", error);
        return;
      }

      setShowOTP(true);
      startResendTimer();
      toast.success("Verification code sent successfully!");
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    setIsLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: "sms",
      });

      if (error) {
        if (error.message.includes("Invalid token")) {
          toast.error("Invalid verification code. Please try again.");
        } else {
          toast.error(error.message);
        }
        return;
      }

      toast.success("Phone number verified successfully!");
      onSuccess();
    } catch (error: any) {
      toast.error("Failed to verify code. Please try again.");
      console.error("Verification Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      await handleSendOTP();
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