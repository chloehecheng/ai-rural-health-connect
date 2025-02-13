import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AuthenticationModal } from "@/components/auth/AuthenticationModal";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BaseFeatureProps {
  title: string;
  description: string;
  children: ReactNode;
  showAuth: boolean;
  onCloseAuth: () => void;
  onAuthSuccess: () => void;
  actionName: string;
  helpText?: string[];
}

export const BaseFeature = ({
  title,
  description,
  children,
  showAuth,
  onCloseAuth,
  onAuthSuccess,
  actionName,
  helpText = [],
}: BaseFeatureProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white px-6 py-10">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="lg"
              className="text-xl"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              Back
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-xl"
              onClick={() => navigate("/features")}
            >
              <Home className="w-6 h-6 mr-2" />
              Home
            </Button>
          </div>
          <Button
            variant="ghost"
            size="lg"
            className="text-xl"
            onClick={() => document.getElementById("help-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            <HelpCircle className="w-6 h-6 mr-2" />
            Help
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto pt-20">
        <Card className="mb-8">
          <CardHeader className="space-y-4">
            <CardTitle className="text-5xl font-bold text-primary">
              {title}
            </CardTitle>
            <CardDescription className="text-2xl">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card id="help-section" className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary flex items-center gap-2">
              <HelpCircle className="w-8 h-8" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {helpText.length > 0 ? (
                helpText.map((text, index) => (
                  <p key={index} className="text-xl text-gray-700 flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    {text}
                  </p>
                ))
              ) : (
                <div className="space-y-4">
                  <p className="text-xl text-gray-700">
                    Here are some tips to help you use this feature:
                  </p>
                  <ul className="list-disc pl-6 space-y-4">
                    <li className="text-xl text-gray-700">
                      Take your time to read through each section carefully
                    </li>
                    <li className="text-xl text-gray-700">
                      Use the "Back" button if you need to make changes
                    </li>
                    <li className="text-xl text-gray-700">
                      Click "Home" to return to the main menu at any time
                    </li>
                    <li className="text-xl text-gray-700">
                      If you need assistance, call our support team at 1-800-SUPPORT
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <AuthenticationModal
        isOpen={showAuth}
        onClose={onCloseAuth}
        onSuccess={onAuthSuccess}
        actionName={actionName}
      />
    </div>
  );
}
