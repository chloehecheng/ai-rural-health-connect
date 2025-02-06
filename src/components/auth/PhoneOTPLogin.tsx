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

const TEST_MODE = true; // Enable test mode for development
const TEST_OTP = "123456"; // Test OTP code

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
      
      if (TEST_MODE) {
        // In test mode, skip actual OTP sending
        setShowOTP(true);
        startResendTimer();
        toast.success("Test mode: Use code 123456");
        setIsLoading(false);
        return;
      }

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
      console.log("Verifying OTP for:", formattedPhone);

      if (TEST_MODE && otp === TEST_OTP) {
        // In test mode, auto-verify the test OTP
        toast.success("Test mode: Login successful!");
        onSuccess();
        return;
      }
      
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
                {TEST_MODE ? "Send Test Code" : "Send Verification Code"}
              </>
            )}
          </Button>
          {TEST_MODE && (
            <p className="text-sm text-muted-foreground text-center">
              Test mode enabled. Use code: {TEST_OTP}
            </p>
          )}
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