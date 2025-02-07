import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface OTPVerificationProps {
  isLoading: boolean;
  onVerify: (otp: string) => void;
  onResend: () => void;
  resendTimer: number;
  isResending: boolean;
}

export const OTPVerification = ({
  isLoading,
  onVerify,
  onResend,
  resendTimer,
  isResending,
}: OTPVerificationProps) => {
  const [otp, setOTP] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(otp);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-center">
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              if (value.length <= 6) {
                setOTP(value);
              }
            }}
            className="text-center text-lg tracking-widest w-48"
            disabled={isLoading}
          />
        </div>
        <div className="text-center text-sm text-muted-foreground">
          {resendTimer > 0 ? (
            <span>Resend code in {resendTimer}s</span>
          ) : (
            <button
              type="button"
              onClick={onResend}
              disabled={isResending || resendTimer > 0}
              className="text-primary hover:underline disabled:opacity-50"
            >
              Didn't receive the code? Resend
            </button>
          )}
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full h-12 text-lg bg-primary hover:bg-primary-dark"
        disabled={isLoading || otp.length !== 6}
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
  );
};