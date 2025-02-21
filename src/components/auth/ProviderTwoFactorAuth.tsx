import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProviderTwoFactorAuthProps {
  onVerify: (code: string) => Promise<void>;
  onCancel: () => void;
}

export default function ProviderTwoFactorAuth({ onVerify, onCancel }: ProviderTwoFactorAuthProps) {
  const { toast } = useToast();
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      await onVerify(verificationCode);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Verification failed";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setResendDisabled(true);
    setResendTimer(30);

    // Mock resend code implementation
    toast({
      title: "New Code Sent! 📧",
      description: "Please check your email for the new verification code. It may take a few moments to arrive.",
      duration: 6000,
      variant: "default",
    });

    // Start countdown timer
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl space-y-10 bg-white p-12 rounded-3xl shadow-xl border-2 border-[#e2e8f0] mx-auto">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="bg-[#4299e1]/10 p-4 rounded-full">
            <Shield className="w-12 h-12 text-[#4299e1]" />
          </div>
        </div>
        <h2 className="mt-6 text-4xl font-bold text-[#2d3748]">
          Two-Factor Authentication
        </h2>
        <p className="mt-3 text-xl text-[#4a5568]">
          Enter the verification code sent to your email
        </p>
      </div>

      <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="code" className="block text-lg font-medium text-[#4a5568] mb-2">
            Verification Code
          </Label>
          <Input
            id="code"
            name="code"
            type="text"
            required
            className="text-lg py-3 px-4 text-center tracking-widest"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter 6-digit code"
            maxLength={6}
            pattern="[0-9]{6}"
            disabled={isSubmitting}
          />
          {error && (
            <p className="mt-2 text-red-600">{error}</p>
          )}
          <Button
            type="button"
            variant="link"
            className="mt-2 text-[#4299e1] hover:text-[#3182ce] text-sm"
            onClick={handleResendCode}
            disabled={resendDisabled}
          >
            {resendDisabled 
              ? `Resend code in ${resendTimer}s` 
              : "Didn't receive the code? Resend"}
          </Button>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1 text-[#4a5568] text-xl py-6 rounded-xl transition-colors font-semibold"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[#4299e1] hover:bg-[#3182ce] text-white text-xl py-6 rounded-xl transition-colors font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </form>
    </div>
  );
}
