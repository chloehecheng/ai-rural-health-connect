import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Phone, ArrowLeft } from "lucide-react";
import { sendVerificationCode, verifyCode } from "@/lib/twilio";

interface AuthenticationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  actionName: string;
}

export const AuthenticationModal = ({ isOpen, onClose, onSuccess, actionName }: AuthenticationModalProps) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { toast } = useToast();

  const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleSendOTP = async () => {
    if (!name || !phoneNumber) {
      toast({
        title: "We Need a Little More Information",
        description: "Please provide both your first name and phone number to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const cleanPhone = phoneNumber.replace(/\D/g, "");
      const { data, error } = await sendVerificationCode(`+1${cleanPhone}`);

      if (error) {
        toast({
          title: "Unable to Send Code",
          description: "We had trouble sending the code. Please try again in a few minutes.",
          variant: "destructive",
        });
        return;
      }

      setShowOTP(true);
      startResendTimer();
      toast({
        title: "Code Sent Successfully!",
        description: "We've sent a 6-digit code to your phone. Please enter it below.",
        className: "bg-green-50 border-green-500 border-4",
      });
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: "We encountered an error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startResendTimer = () => {
    setResendTimer(60);
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

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast({
        title: "Code Required",
        description: "Please enter the 6-digit code we sent to your phone.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const cleanPhone = phoneNumber.replace(/\D/g, "");
      const { data, error } = await verifyCode(`+1${cleanPhone}`, otp);

      if (error) {
        toast({
          title: "Incorrect Code",
          description: "The code you entered doesn't match. Please try again.",
          variant: "destructive",
        });
        return;
      }

      localStorage.setItem("user", JSON.stringify({ name, phoneNumber: cleanPhone }));
      
      toast({
        title: `Thank you, ${name}!`,
        description: "Your identity has been verified.",
        className: "bg-green-50 border-4 border-green-500",
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "We couldn't verify your code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setPhoneNumber("");
    setOtp("");
    setShowOTP(false);
    setResendTimer(0);
    onClose();
  };

  const handleBack = () => {
    setShowOTP(false);
    setOtp("");
    setResendTimer(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold text-center">
            {showOTP ? "Enter Verification Code" : "Quick Sign In"}
          </DialogTitle>
          <DialogDescription className="text-2xl text-center">
            {showOTP 
              ? "We've sent a 6-digit code to your phone"
              : `To ${actionName.toLowerCase()}, we just need your:`}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8 py-6">
          {!showOTP ? (
            <>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-2xl mb-3 block">First Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-2xl p-8"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-2xl mb-3 block">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phoneNumber}
                    onChange={handlePhoneInput}
                    className="text-2xl p-8"
                    placeholder="(555) 555-5555"
                    maxLength={14}
                  />
                </div>
              </div>
              <Button
                className="w-full text-2xl p-8"
                onClick={handleSendOTP}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                ) : (
                  <Phone className="mr-3 h-6 w-6" />
                )}
                Send Verification Code
              </Button>
            </>
          ) : (
            <div className="space-y-6">
              <div>
                <Label htmlFor="otp" className="text-2xl mb-3 block">
                  Enter the 6-digit code we sent to:
                  <div className="font-bold mt-2">{phoneNumber}</div>
                </Label>
                <Input
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  className="text-3xl p-8 tracking-[0.5em] text-center"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="text-xl p-8"
                  onClick={handleBack}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Go Back
                </Button>
                <Button
                  className="text-xl p-8"
                  onClick={handleVerifyOTP}
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    "Verify Code"
                  )}
                </Button>
              </div>
              {resendTimer > 0 ? (
                <p className="text-xl text-center">
                  You can request a new code in {resendTimer} seconds
                </p>
              ) : (
                <Button
                  variant="link"
                  className="w-full text-xl"
                  onClick={handleSendOTP}
                  disabled={isLoading}
                >
                  Send a new code
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
