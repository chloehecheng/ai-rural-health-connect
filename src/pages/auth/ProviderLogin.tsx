import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";

export default function ProviderLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add provider authentication logic here
    // For now, we'll just navigate to the provider dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#e8ecf5]">
      <div className="w-full max-w-2xl space-y-10 bg-white p-12 rounded-3xl shadow-xl border-2 border-[#e2e8f0] mx-auto">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-[#4299e1]/10 p-4 rounded-full">
              <Users className="w-12 h-12 text-[#4299e1]" />
            </div>
          </div>
          <h2 className="mt-6 text-4xl font-bold text-[#2d3748]">
            Provider Sign In
          </h2>
          <p className="mt-3 text-xl text-[#4a5568]">
            Access your provider dashboard
          </p>
        </div>

        <form className="mt-10 space-y-8" onSubmit={handleLogin}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-lg font-medium text-[#4a5568] mb-2">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="text-lg py-3 px-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-lg font-medium text-[#4a5568] mb-2">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="text-lg py-3 px-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-[#4299e1] hover:bg-[#3182ce] text-white text-xl py-6 rounded-xl transition-colors font-semibold"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
