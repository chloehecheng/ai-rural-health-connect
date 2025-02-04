import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { OTPVerification } from "@/components/auth/OTPVerification";
import { Phone, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

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

      if (error) throw error;

      setShowOTP(true);
      startResendTimer();
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      throw error;
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

      onSuccess();
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      throw error;
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