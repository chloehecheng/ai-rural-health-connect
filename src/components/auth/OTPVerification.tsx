import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
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
                    className="h-12 w-12 text-lg border-2 border-input"
                  />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Didn't receive the code?{" "}
          {resendTimer > 0 ? (
            <span>Resend in {resendTimer}s</span>
          ) : (
            <button
              type="button"
              onClick={onResend}
              disabled={isResending || resendTimer > 0}
              className="text-primary hover:underline disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Resend Code"}
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