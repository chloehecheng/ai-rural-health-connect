import { useState } from "react";
import { BaseFeature } from "@/components/features/BaseFeature";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, ArrowLeft, Activity, Heart, Thermometer, Weight, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const HealthMonitoring = () => {
  const [step, setStep] = useState<"selection" | "review" | "confirmed">("selection");
  const [showAuth, setShowAuth] = useState(false);
  const [monitoringTypes, setMonitoringTypes] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const { toast } = useToast();

  const handleAddMonitoring = (type: string) => {
    if (!monitoringTypes.includes(type)) {
      setMonitoringTypes([...monitoringTypes, type]);
    }
  };

  const handleRemoveMonitoring = (type: string) => {
    setMonitoringTypes(monitoringTypes.filter(t => t !== type));
  };

  const handleReview = () => {
    if (monitoringTypes.length === 0 || !frequency || !reminderTime) {
      toast({
        title: "Please Fill All Fields",
        description: "We need all the information to set up your health monitoring.",
        variant: "destructive",
      });
      return;
    }
    setStep("review");
  };

  const handleConfirm = () => {
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("Health monitoring confirmed:", {
      monitoringTypes,
      frequency,
      reminderTime,
      user
    });
    setStep("confirmed");
  };

  const SelectionScreen = () => (
    <div className="space-y-8">
      <div className="grid gap-6">
        <div className="space-y-4">
          <Label className="text-2xl">What Would You Like to Monitor?</Label>
          <div className="grid gap-4">
            <Select onValueChange={handleAddMonitoring}>
              <SelectTrigger className="text-xl p-6">
                <SelectValue placeholder="Add monitoring type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blood-pressure" className="text-xl">Blood Pressure</SelectItem>
                <SelectItem value="blood-sugar" className="text-xl">Blood Sugar</SelectItem>
                <SelectItem value="weight" className="text-xl">Weight</SelectItem>
                <SelectItem value="temperature" className="text-xl">Temperature</SelectItem>
                <SelectItem value="heart-rate" className="text-xl">Heart Rate</SelectItem>
              </SelectContent>
            </Select>

            {monitoringTypes.length > 0 && (
              <div className="grid gap-2">
                {monitoringTypes.map(type => (
                  <div key={type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-xl">{type}</span>
                    <Button
                      variant="ghost"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveMonitoring(type)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-2xl">Monitoring Frequency</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger className="text-xl p-6">
              <SelectValue placeholder="How often would you like to monitor?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily" className="text-xl">Daily</SelectItem>
              <SelectItem value="twice-daily" className="text-xl">Twice Daily</SelectItem>
              <SelectItem value="weekly" className="text-xl">Weekly</SelectItem>
              <SelectItem value="custom" className="text-xl">Custom Schedule</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label className="text-2xl">Reminder Time</Label>
          <Select value={reminderTime} onValueChange={setReminderTime}>
            <SelectTrigger className="text-xl p-6">
              <SelectValue placeholder="When should we remind you?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning" className="text-xl">Morning (8 AM)</SelectItem>
              <SelectItem value="noon" className="text-xl">Noon (12 PM)</SelectItem>
              <SelectItem value="evening" className="text-xl">Evening (6 PM)</SelectItem>
              <SelectItem value="night" className="text-xl">Night (9 PM)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        className="w-full text-2xl p-8"
        onClick={handleReview}
        disabled={monitoringTypes.length === 0 || !frequency || !reminderTime}
      >
        Review Monitoring Settings
      </Button>
    </div>
  );

  const ReviewScreen = () => (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Activity className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-2xl font-semibold">Monitoring Details</h3>
              <p className="text-xl text-gray-600">Please review your monitoring settings</p>
            </div>
          </div>

          <div className="grid gap-4 text-xl">
            <div className="p-4 bg-gray-50 rounded-lg flex gap-3">
              <Heart className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">Monitoring Types:</div>
                <div>{monitoringTypes.join(", ")}</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg flex gap-3">
              <Clock className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">Frequency:</div>
                <div>{frequency}</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg flex gap-3">
              <Clock className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">Reminder Time:</div>
                <div>{reminderTime}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button
          variant="outline"
          className="flex-1 text-xl p-6"
          onClick={() => setStep("selection")}
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Go Back
        </Button>
        <Button
          className="flex-1 text-xl p-6"
          onClick={handleConfirm}
        >
          Set Up Monitoring
        </Button>
      </div>
    </div>
  );

  const ConfirmedScreen = () => (
    <div className="text-center space-y-8 py-8">
      <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-green-600">Monitoring Set Up!</h2>
        <p className="text-2xl text-gray-600">
          We'll help you monitor:
        </p>
        <div className="text-3xl font-semibold">
          {monitoringTypes.join(", ")}
        </div>
        <p className="text-2xl">
          {frequency} at {reminderTime}
        </p>
      </div>
      <div className="pt-8 space-y-4">
        <p className="text-xl text-gray-600">
          You'll receive text message reminders to record your measurements.
        </p>
        <Button
          className="text-2xl px-8 py-6"
          onClick={() => window.location.href = "/features"}
        >
          Return to Features
        </Button>
      </div>
    </div>
  );

  return (
    <BaseFeature
      title="Health Monitoring"
      description="Track your vital signs and health measurements"
      showAuth={showAuth}
      onCloseAuth={() => setShowAuth(false)}
      onAuthSuccess={handleAuthSuccess}
      actionName="Set Up Health Monitoring"
    >
      {step === "selection" && <SelectionScreen />}
      {step === "review" && <ReviewScreen />}
      {step === "confirmed" && <ConfirmedScreen />}
    </BaseFeature>
  );
};
