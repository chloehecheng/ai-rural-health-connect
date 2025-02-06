import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { Input } from "@/components/ui/input";
import { Lock, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface PasswordLoginProps {
  onSuccess: () => void;
}

// Test credentials for development
const TEST_PHONE = "9496683172";
const TEST_PASSWORD = "testpass123";

export const PasswordLogin = ({ onSuccess }: PasswordLoginProps) => {
  const [phoneNumber, setPhoneNumber] = useState(TEST_PHONE);
  const [countryCode, setCountryCode] = useState("+1");
  const [password, setPassword] = useState(TEST_PASSWORD);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        phone: `${countryCode}${phoneNumber}`,
        password,
      });

      if (error) throw error;

      onSuccess();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <PhoneInput
            phoneNumber={phoneNumber}
            countryCode={countryCode}
            setPhoneNumber={setPhoneNumber}
            setCountryCode={setCountryCode}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Test credentials: {countryCode}{TEST_PHONE} / {TEST_PASSWORD}
        </p>
      </div>
      <Button 
        type="submit" 
        className="w-full h-12 text-lg"
        disabled={isLoading || !phoneNumber || !password}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          <>
            <Lock className="mr-2 h-4 w-4" />
            Login with Password
          </>
        )}
      </Button>
    </form>
  );
};