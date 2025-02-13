import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthenticationModal } from "@/components/auth/AuthenticationModal";
import { Lock } from "lucide-react";

interface FeaturePreviewProps {
  title: string;
  description?: string;
  previewComponent: React.ReactNode;
  fullComponent: React.ReactNode;
  demoTimeSeconds?: number;
}

export const FeaturePreview = ({
  title,
  description,
  previewComponent,
  fullComponent,
  demoTimeSeconds = 60
}: FeaturePreviewProps) => {
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(demoTimeSeconds);
  const [isDemoActive, setIsDemoActive] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
      setIsDemoActive(false);
    }
  }, []);

  useEffect(() => {
    if (!isDemoActive || !timeRemaining) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsDemoActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isDemoActive, timeRemaining]);

  const handleContinueClick = () => {
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsDemoActive(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white px-6 py-10">
      <Card className="max-w-5xl mx-auto">
        <CardHeader className="space-y-2">
          <CardTitle className="text-4xl font-bold text-primary">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-xl">
              {description}
            </CardDescription>
          )}
          {isDemoActive && (
            <div className="flex items-center justify-between mt-4 bg-blue-50 p-4 rounded-lg">
              <div className="text-lg text-blue-700">
                Preview Mode: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')} remaining
              </div>
              <Button
                onClick={handleContinueClick}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Continue Using <Lock className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {isAuthenticated ? fullComponent : previewComponent}
        </CardContent>
      </Card>

      <AuthenticationModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={handleAuthSuccess}
        actionName={`Continue Using ${title}`}
      />
    </div>
  );
};
