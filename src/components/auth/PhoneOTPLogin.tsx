import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { OTPVerification } from "@/components/auth/OTPVerification";
import { Phone, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
  const [attemptCount, setAttemptCount] = useState(0);
  const MAX_ATTEMPTS = 3;
  const ATTEMPT_RESET_TIME = 15 * 60 * 1000; // 15 minutes
  const { toast } = useToast();

  useEffect(() => {
    // Reset attempt count after ATTEMPT_RESET_TIME
    const resetTimer = setTimeout(() => {
      setAttemptCount(0);
    }, ATTEMPT_RESET_TIME);

    return () => clearTimeout(resetTimer);
  }, [attemptCount]);

  const startResendTimer = () => {
    setResendTimer(60); // Increased to 60 seconds
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

  const showLargeToast = (title: string, description: string, type: 'success' | 'error') => {
    const bgColor = type === 'success' ? 'bg-blue-50' : 'bg-red-50';
    const borderColor = type === 'success' ? 'border-blue-500' : 'border-red-500';
    const icon = type === 'success' ? '✅' : '❌';

    toast({
      title: `${icon}  ${title}`,
      description,
      className: `${bgColor} border-4 ${borderColor} p-24 rounded-2xl shadow-2xl [&>div>h1]:text-5xl [&>div>h1]:font-bold [&>div>h1]:leading-normal [&>div>div]:text-4xl [&>div>div]:font-medium [&>div>div]:mt-4 [&>div>div]:leading-normal`,
      duration: 3000,
      style: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: 'auto',
        maxWidth: '800px',
        minWidth: '600px',
        zIndex: 1000
      }
    });
  };

  const handleSendOTP = async () => {
    // Check attempt count
    if (attemptCount >= MAX_ATTEMPTS) {
      const remainingTime = Math.ceil(ATTEMPT_RESET_TIME / 60000);
      showLargeToast(
        "Too Many Attempts!",
        `Try again in ${remainingTime} minutes.`,
        'error'
      );
      return;
    }

    setIsLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      console.log("Sending OTP to:", formattedPhone);
      
      const { data, error } = await sendVerificationCode(formattedPhone);

      if (error || (data && data.status === 'error')) {
        // Check for rate limit error
        if (error?.message?.toLowerCase().includes('too many requests')) {
          showLargeToast(
            "Too Many Requests!",
            "Try again in 15 minutes.",
            'error'
          );
          setAttemptCount(MAX_ATTEMPTS); // Force cooldown
        } else {
          showLargeToast(
            "Failed to Send Code!",
            "Try again.",
            'error'
          );
          setAttemptCount(prev => prev + 1);
        }
        console.error('Verification Error:', error || data);
        return;
      }

      setShowOTP(true);
      startResendTimer();
      showLargeToast(
        "Code Sent!",
        "Check your phone for the code.",
        'success'
      );
    } catch (error: any) {
      if (error?.message?.toLowerCase().includes('too many requests')) {
        showLargeToast(
          "Too Many Requests!",
          "Try again in 15 minutes.",
          'error'
        );
        setAttemptCount(MAX_ATTEMPTS); // Force cooldown
      } else {
        showLargeToast(
          "An Error Occurred!",
          "Try again.",
          'error'
        );
        setAttemptCount(prev => prev + 1);
      }
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
        showLargeToast(
          "Failed to Verify Code!",
          "Try again.",
          'error'
        );
        return;
      }

      if (!data.valid) {
        console.error("Invalid verification code. Status:", data.status);
        showLargeToast(
          "Invalid Code!",
          "Try again.",
          'error'
        );
        return;
      }

      // Store the verified phone number in localStorage
      localStorage.setItem('phoneNumber', formattedPhone);
      localStorage.setItem('verifiedAt', new Date().toISOString());

      showLargeToast(
        "Phone Number Verified!",
        "You can now proceed.",
        'success'
      );
      onSuccess();
    } catch (error: any) {
      console.error("Unexpected error:", error);
      showLargeToast(
        "An Error Occurred!",
        "Try again.",
        'error'
      );
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
    <div className="space-y-10">
      {!showOTP ? (
        <>
          <PhoneInput
            phoneNumber={phoneNumber}
            countryCode={countryCode}
            onPhoneChange={setPhoneNumber}
            onCountryCodeChange={setCountryCode}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendOTP}
            disabled={!phoneNumber || isLoading || attemptCount >= MAX_ATTEMPTS}
            className="w-full text-2xl h-20 mt-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-3 h-7 w-7 animate-spin" />
                Sending Code...
              </>
            ) : (
              <>
                <Phone className="mr-3 h-7 w-7" />
                Send Verification Code
              </>
            )}
          </Button>
        </>
      ) : (
        <OTPVerification
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
          isLoading={isLoading}
          resendTimer={resendTimer}
          isResending={isResending}
        />
      )}
    </div>
  );
};