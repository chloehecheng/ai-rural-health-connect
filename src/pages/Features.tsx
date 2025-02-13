import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    { path: "schedule-appointment", name: "Schedule Appointment" },
    { path: "virtual-visit", name: "Virtual Visit" },
    { path: "prescription-delivery", name: "Prescription Delivery" },
    { path: "medication-reminders", name: "Medication Reminders" },
    { path: "health-records", name: "Health Records" },
    { path: "family-access", name: "Family Access" },
    { path: "transportation", name: "Transportation" },
    { path: "health-monitoring", name: "Health Monitoring" },
    { path: "message-care-team", name: "Message Care Team" },
    { path: "medication-management", name: "Medication Management" },
    { path: "care-reminders", name: "Care Reminders" },
    { path: "support", name: "Support" },
  ];

  return (
    <div className="container mx-auto p-8">
      <Card className="p-6">
        <h1 className="text-3xl font-bold mb-6">Available Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Button
              key={feature.path}
              className="text-xl p-6"
              onClick={() => navigate(`/features/${feature.path}`)}
            >
              {feature.name}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Features;
