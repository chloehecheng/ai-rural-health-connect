import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Mail, Lock, Info } from "lucide-react";
import { authenticateProvider, verify2FA } from "@/lib/auth";
import ProviderTwoFactorAuth from "@/components/auth/ProviderTwoFactorAuth";
import { useToast } from "@/components/ui/use-toast";

export default function ProviderLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await authenticateProvider(email, password);
      if (result.requires2FA) {
        toast({
          title: "Verification Required",
          description: "Please check your email for a verification code.",
          duration: 6000,
          variant: "default",
        });
        setShowTwoFactor(true);
      } else {
        toast({
          title: "Login Successful! 👋",
          description: "Welcome back to your dashboard.",
          duration: 4000,
          variant: "success",
        });
        navigate("/dashboard");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify2FA = async (code: string) => {
    try {
      const result = await verify2FA(code);
      if (result.isAuthenticated) {
        toast({
          title: "Welcome Back! 🎉",
          description: "Two-factor authentication successful.",
          duration: 4000,
          variant: "success",
        });
        navigate("/dashboard");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Verification failed";
      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 6000,
      });
      throw err;
    }
  };

  if (showTwoFactor) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#e8ecf5]">
        <ProviderTwoFactorAuth
          onVerify={handleVerify2FA}
          onCancel={() => setShowTwoFactor(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#e8ecf5]">
      <div className="w-full max-w-xl bg-white p-12 rounded-3xl shadow-xl">
        <div className="text-center mb-10">
          <div className="flex justify-center">
            <div className="bg-[#4299e1]/10 p-5 rounded-full">
              <Users className="w-14 h-14 text-[#4299e1]" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#2d3748]">
            Provider Sign In
          </h2>
          <p className="mt-3 text-[#4a5568]">
            Access your healthcare dashboard securely
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleLogin}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-base font-medium text-[#4a5568] mb-1.5 block">
                Email address
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#4299e1]" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-12 py-6 text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-base font-medium text-[#4a5568] mb-1.5 block">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#4299e1]" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-12 py-6 text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start space-x-2 text-red-600 bg-red-50 p-4 rounded-xl">
                <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Link 
              to="/auth/forgot-password" 
              className="text-[#4299e1] hover:text-[#3182ce] text-sm"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#4299e1] hover:bg-[#3182ce] text-white text-xl py-6 rounded-xl transition-colors font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
