import { useState, useEffect, memo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Video, Clock, Phone, MessageSquare, HeartPulse, Truck, FileText, Users, Map, Pill, Bell } from "lucide-react";

// Memoize the feature card to prevent unnecessary re-renders
const FeatureCard = memo(({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="p-6 rounded-xl bg-white shadow-md border-2 hover:border-primary">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-lg">{description}</p>
  </div>
));

// Memoize the action card to prevent unnecessary re-renders
const ActionCard = memo(({ 
  icon, 
  title, 
  description, 
  onClick 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full text-left p-8 rounded-xl border-2 hover:border-primary hover:bg-primary/5 cursor-pointer"
  >
    <div className="flex items-start space-x-4">
      <div className="text-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>
    </div>
  </button>
));

const Login = () => {
  const [step, setStep] = useState<"intro" | "features" | "role">("intro");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam === "features") {
      setStep("features");
    }
  }, [searchParams]);

  const ValueProposition = () => (
    <div className="space-y-8 text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <FeatureCard
          icon="🏥"
          title="Easy Access"
          description="Connect with healthcare providers from the comfort of your home"
        />
        <FeatureCard
          icon="📱"
          title="Simple to Use"
          description="User-friendly interface designed for all ages"
        />
        <FeatureCard
          icon="👨‍⚕️"
          title="Quality Care"
          description="Get the care you need from trusted rural healthcare providers"
        />
      </div>
      <Button 
        className="text-2xl px-8 py-6 mt-8 bg-primary hover:bg-primary/90"
        onClick={() => setStep("features")}
      >
        See What We Offer →
      </Button>
    </div>
  );

  const Features = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard
          icon={<Calendar className="w-8 h-8" />}
          title="Schedule Appointment"
          description="Book an appointment with your preferred healthcare provider"
          onClick={() => navigate("/features/schedule-appointment")}
        />
        <ActionCard
          icon={<Video className="w-8 h-8" />}
          title="Virtual Visit"
          description="Connect with your doctor through video call"
          onClick={() => navigate("/features/virtual-visit")}
        />
        <ActionCard
          icon={<Truck className="w-8 h-8" />}
          title="Prescription Delivery"
          description="Get your medications delivered to your doorstep"
          onClick={() => navigate("/features/prescription-delivery")}
        />
        <ActionCard
          icon={<Clock className="w-8 h-8" />}
          title="Medication Reminders"
          description="Set up reminders for your medications"
          onClick={() => navigate("/features/medication-reminders")}
        />
        <ActionCard
          icon={<FileText className="w-8 h-8" />}
          title="Health Records"
          description="Access your medical history and test results"
          onClick={() => navigate("/features/health-records")}
        />
        <ActionCard
          icon={<Users className="w-8 h-8" />}
          title="Family Access"
          description="Allow family members to help manage your care"
          onClick={() => navigate("/features/family-access")}
        />
        <ActionCard
          icon={<Map className="w-8 h-8" />}
          title="Transportation"
          description="Schedule rides to your medical appointments"
          onClick={() => navigate("/features/transportation")}
        />
        <ActionCard
          icon={<HeartPulse className="w-8 h-8" />}
          title="Health Monitoring"
          description="Track your vital signs and health metrics"
          onClick={() => navigate("/features/health-monitoring")}
        />
        <ActionCard
          icon={<MessageSquare className="w-8 h-8" />}
          title="Message Your Care Team"
          description="Communicate with your entire healthcare team"
          onClick={() => navigate("/features/messages")}
        />
        <ActionCard
          icon={<Pill className="w-8 h-8" />}
          title="Medication Management"
          description="View and manage all your prescriptions"
          onClick={() => navigate("/features/medications")}
        />
        <ActionCard
          icon={<Bell className="w-8 h-8" />}
          title="Care Reminders"
          description="Get reminders for appointments and preventive care"
          onClick={() => navigate("/features/care-reminders")}
        />
        <ActionCard
          icon={<Phone className="w-8 h-8" />}
          title="24/7 Support"
          description="Get help anytime you need it"
          onClick={() => navigate("/features/support")}
        />
      </div>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={() => setStep("intro")}
      >
        ← Back
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6 py-10">
      <Card className="w-full max-w-5xl mx-auto shadow-lg border-2">
        <CardHeader className="space-y-6 text-center pb-8 border-b-2">
          <CardTitle className="text-6xl md:text-7xl font-bold tracking-tight text-primary">
            RuralCare AI
          </CardTitle>
          <CardDescription className="text-3xl md:text-4xl">
            Healthcare Made Simple
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-8">
          {step === "intro" ? <ValueProposition /> : <Features />}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
