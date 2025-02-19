import { useState, useEffect, memo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Video, Clock, Phone, MessageSquare, HeartPulse, Truck, FileText, Users, Map, Pill, Bell } from "lucide-react";

// Memoize the feature card to prevent unnecessary re-renders
const FeatureCard = memo(({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="p-8 rounded-xl bg-white shadow-lg border border-[#e2e8f0] hover:shadow-xl transition-shadow">
    <div className="text-5xl mb-6">{icon}</div>
    <h3 className="text-2xl font-semibold mb-4 text-[#2d3748]">{title}</h3>
    <p className="text-lg text-[#4a5568]">{description}</p>
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
    className="w-full text-left p-8 rounded-3xl bg-white shadow-lg border-4 border-transparent hover:border-[#2d3748] transition-colors duration-100 focus:outline-none"
  >
    <div className="flex items-start space-x-6">
      <div className="text-[#4299e1] text-5xl">
        {icon}
      </div>
      <div>
        <h3 className="text-3xl font-semibold mb-3 text-[#2d3748]">{title}</h3>
        <p className="text-[#4a5568] text-xl leading-relaxed">{description}</p>
      </div>
    </div>
  </button>
));

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"intro" | "features" | "role">("intro");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam === "features") {
      setStep("features");
    }
  }, [searchParams]);

  const ValueProposition = () => (
    <div className="space-y-8 text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
        className="text-2xl px-12 py-8 bg-[#4299e1] hover:bg-[#3182ce] text-white rounded-full transition-colors duration-200 focus:outline-none"
        onClick={() => setStep("features")}
      >
        See What We Offer →
      </Button>
    </div>
  );

  const Features = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-12">
        <Button 
          className="text-2xl px-8 py-6 bg-white shadow-md border-4 border-transparent hover:border-[#2d3748] text-[#2d3748] rounded-2xl transition-colors duration-100 focus:outline-none focus:ring-0 hover:bg-white active:bg-white"
          onClick={() => setStep("intro")}
        >
          <span className="flex items-center">
            <span className="text-3xl mr-2">←</span>
            Back to Home
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard
          icon={<Calendar className="w-12 h-12" />}
          title="Schedule Appointment"
          description="Book an appointment with your preferred healthcare provider"
          onClick={() => navigate("/features/schedule-appointment")}
        />
        <ActionCard
          icon={<Video className="w-12 h-12" />}
          title="Virtual Visit"
          description="Connect with your doctor through video call"
          onClick={() => navigate("/features/virtual-visit")}
        />
        <ActionCard
          icon={<Truck className="w-12 h-12" />}
          title="Prescription Delivery"
          description="Get your medications delivered to your doorstep"
          onClick={() => navigate("/features/prescription-delivery")}
        />
        <ActionCard
          icon={<Clock className="w-12 h-12" />}
          title="Medication Reminders"
          description="Set up reminders for your medications"
          onClick={() => navigate("/features/medication-reminders")}
        />
        <ActionCard
          icon={<FileText className="w-12 h-12" />}
          title="Health Records"
          description="Access your medical history and test results"
          onClick={() => navigate("/features/health-records")}
        />
        <ActionCard
          icon={<Users className="w-12 h-12" />}
          title="Family Access"
          description="Allow family members to help manage your care"
          onClick={() => navigate("/features/family-access")}
        />
        <ActionCard
          icon={<Map className="w-12 h-12" />}
          title="Transportation"
          description="Schedule rides to your medical appointments"
          onClick={() => navigate("/features/transportation")}
        />
        <ActionCard
          icon={<HeartPulse className="w-12 h-12" />}
          title="Health Monitoring"
          description="Track your vital signs and health metrics"
          onClick={() => navigate("/features/health-monitoring")}
        />
        <ActionCard
          icon={<MessageSquare className="w-12 h-12" />}
          title="Message Your Care Team"
          description="Communicate with your entire healthcare team"
          onClick={() => navigate("/features/messages")}
        />
        <ActionCard
          icon={<Pill className="w-12 h-12" />}
          title="Medication Management"
          description="View and manage all your prescriptions"
          onClick={() => navigate("/features/medications")}
        />
        <ActionCard
          icon={<Bell className="w-12 h-12" />}
          title="Care Reminders"
          description="Get reminders for appointments and preventive care"
          onClick={() => navigate("/features/care-reminders")}
        />
        <ActionCard
          icon={<Phone className="w-12 h-12" />}
          title="24/7 Support"
          description="Get help anytime you need it"
          onClick={() => navigate("/features/support")}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-[#e8ecf5] px-10 py-8">
      {/* Provider Sign In Button */}
      <div className="absolute top-6 right-6">
        <Button
          variant="outline"
          className="bg-white/90 hover:bg-white text-[#2d3748] hover:text-[#1a202c] text-lg px-8 py-3 flex items-center gap-3 shadow-md hover:shadow-lg border-2 border-[#4299e1] hover:border-[#2d3748] transition-all font-semibold rounded-xl"
          onClick={() => navigate("/provider-login")}
        >
          <Users className="w-6 h-6" />
          Provider Sign In
        </Button>
      </div>

      <div className="w-full max-w-[90rem] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tight text-[#2d3748] mb-6">
            Rural Health Connect
          </h1>
          <p className="text-4xl md:text-5xl text-[#4a5568] mb-6 font-medium">Bringing Healthcare Home to Our Community</p>
          <p className="text-3xl text-[#4a5568] mb-16 max-w-5xl mx-auto">
            Making healthcare simple, personal, and accessible
          </p>
        </div>

        {step === "intro" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
              <div className="p-12 rounded-3xl bg-white shadow-lg border-3 border-[#e2e8f0] hover:border-[#4299e1] transition-colors">
                <div className="text-7xl mb-10">👨‍⚕️</div>
                <h3 className="text-4xl font-semibold mb-6 text-[#2d3748]">Personal Care Team</h3>
                <p className="text-2xl text-[#4a5568] leading-relaxed">Connect with dedicated healthcare providers who understand rural healthcare needs</p>
              </div>
              <div className="p-12 rounded-3xl bg-white shadow-lg border-3 border-[#e2e8f0] hover:border-[#4299e1] transition-colors">
                <div className="text-7xl mb-10">🏡</div>
                <h3 className="text-4xl font-semibold mb-6 text-[#2d3748]">Care at Home</h3>
                <p className="text-2xl text-[#4a5568] leading-relaxed">Get quality healthcare from the comfort of your home, no travel needed</p>
              </div>
              <div className="p-12 rounded-3xl bg-white shadow-lg border-3 border-[#e2e8f0] hover:border-[#4299e1] transition-colors">
                <div className="text-7xl mb-10">💊</div>
                <h3 className="text-4xl font-semibold mb-6 text-[#2d3748]">Medication Management</h3>
                <p className="text-2xl text-[#4a5568] leading-relaxed">Smart medication tracking and timely prescription delivery services</p>
              </div>
              <div className="p-12 rounded-3xl bg-white shadow-lg border-3 border-[#e2e8f0] hover:border-[#4299e1] transition-colors">
                <div className="text-7xl mb-10">❤️</div>
                <h3 className="text-4xl font-semibold mb-6 text-[#2d3748]">Chronic Care</h3>
                <p className="text-2xl text-[#4a5568] leading-relaxed">Comprehensive management of ongoing health conditions</p>
              </div>
            </div>

            <div className="text-center space-y-8">
              <Button 
                className="text-3xl px-16 py-10 bg-[#4299e1] hover:bg-[#3182ce] text-white rounded-2xl transition-colors duration-100 font-semibold border-4 border-transparent hover:border-[#2d3748] focus:outline-none"
                onClick={() => setStep("features")}
              >
                Explore Our Services
              </Button>
              <p className="text-2xl text-[#4a5568]">Simple, secure, and designed for you</p>
            </div>
          </>
        ) : step === "features" ? (
          <Features />
        ) : null}
      </div>
    </div>
  );
};
