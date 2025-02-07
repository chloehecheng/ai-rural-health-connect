import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { OTPVerification } from "@/components/auth/OTPVerification";
import { Phone, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { sendVerificationCode, verifyCode } from "@/lib/twilio";

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
    const cleaned = phone.replace(/\D/g, "");
    const trimmed = cleaned.replace(/^0+/, "");
    return `${countryCode.replace(/\s+/g, '')}${trimmed}`;
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      console.log("Sending OTP to:", formattedPhone);
      
      const { data, error } = await sendVerificationCode(formattedPhone);

      if (error || (data && data.status === 'error')) {
        toast.error(error?.message || 'Failed to send verification code');
        console.error('Verification Error:', error || data);
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
      console.log("Verifying OTP for:", formattedPhone);
      
      const { data, error } = await verifyCode(formattedPhone, otp);
      console.log("Twilio verification response:", data);

      if (error || !data) {
        console.error("Twilio verification error:", error);
        toast.error("Failed to verify code with Twilio");
        return;
      }

      if (!data.valid) {
        console.error("Invalid verification code. Status:", data.status);
        toast.error("Invalid verification code. Please check and try again.");
        return;
      }

      // Store the verified phone number in localStorage
      localStorage.setItem('phoneNumber', formattedPhone);
      localStorage.setItem('verifiedAt', new Date().toISOString());

      toast.success("Phone number verified successfully!");
      onSuccess();
    } catch (error: any) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
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