import { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface OTPVerificationProps {
  onVerify: (otp: string) => void;
  onResend: () => void;
  isLoading?: boolean;
  resendTimer?: number;
  isResending?: boolean;
}

export const OTPVerification = ({
  onVerify,
  onResend,
  isLoading = false,
  resendTimer = 0,
  isResending = false,
}: OTPVerificationProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current one is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Submit if all fields are filled
    if (newOtp.every(digit => digit) && value) {
      onVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="space-y-6">
      <Label className="text-3xl font-medium block">Enter Verification Code</Label>
      <div className="flex justify-between gap-4">
        {otp.map((digit, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => inputRefs.current[index] = el}
            className="w-20 h-20 text-center border-2 shadow-md text-3xl"
            style={{
              fontSize: '2.5rem',
              fontWeight: '600',
              lineHeight: '5rem',
              paddingTop: '0',
              paddingBottom: '0'
            }}
            disabled={isLoading}
          />
        ))}
      </div>
      <div className="flex justify-between items-center pt-4">
        <Button
          variant="outline"
          onClick={onResend}
          disabled={resendTimer > 0 || isResending || isLoading}
          className="text-lg h-14 px-6 border-2 shadow-sm"
        >
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
        </Button>
        <Button
          onClick={() => onVerify(otp.join(''))}
          disabled={otp.some(digit => !digit) || isLoading}
          className="text-lg h-14 px-8 shadow-sm"
        >
          Verify Code
        </Button>
      </div>
    </div>
  );
};