import { useState } from "react";
import { BaseFeature } from "@/components/features/BaseFeature";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, ArrowLeft, Pill, Calendar, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const MedicationManagement = () => {
  const [step, setStep] = useState<"selection" | "review" | "confirmed">("selection");
  const [showAuth, setShowAuth] = useState(false);
  const [medications, setMedications] = useState<Array<{
    name: string;
    dosage: string;
    frequency: string;
    time: string;
  }>>([]);
  const [currentMed, setCurrentMed] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Help text specific to this feature
  const helpText = [
    "Start by entering the name of your medication exactly as it appears on the bottle",
    "For dosage, include both the amount and unit (e.g., '50 mg' or '2 tablets')",
    "Choose how often you take the medication from the dropdown menu",
    "Select the time of day when you usually take this medication",
    "Click 'Add Medication' to add it to your list",
    "You can add multiple medications - just repeat the process",
    "Review all your medications before confirming"
  ];

  const handleAddMedication = () => {
    if (!currentMed.name || !currentMed.dosage || !currentMed.frequency || !currentMed.time) {
      toast({
        title: "Please Fill All Fields",
        description: "All medication details are required.",
        variant: "destructive",
      });
      return;
    }
    setMedications([...medications, currentMed]);
    setCurrentMed({ name: "", dosage: "", frequency: "", time: "" });
  };

  const handleRemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleReview = () => {
    if (medications.length === 0) {
      toast({
        title: "No Medications Added",
        description: "Please add at least one medication.",
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
    console.log("Medications confirmed:", {
      medications,
      user
    });
    setStep("confirmed");
  };

  const SelectionScreen = () => (
    <div className="space-y-8">
      <Card className="p-6 border-2 border-primary">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <AlertCircle className="w-8 h-8" />
            <p className="text-xl font-medium">
              Enter your medications one at a time. Take your time and make sure the information is correct.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-2xl">Medication Name</Label>
              <Input
                value={currentMed.name}
                onChange={(e) => setCurrentMed({ ...currentMed, name: e.target.value })}
                className="text-xl p-6"
                placeholder="Type exactly as shown on bottle"
                style={{ fontSize: '20px' }}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-2xl">Dosage</Label>
              <Input
                value={currentMed.dosage}
                onChange={(e) => setCurrentMed({ ...currentMed, dosage: e.target.value })}
                className="text-xl p-6"
                placeholder="Example: 50 mg or 2 tablets"
                style={{ fontSize: '20px' }}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-2xl">How Often Do You Take It?</Label>
              <Select
                value={currentMed.frequency}
                onValueChange={(value) => setCurrentMed({ ...currentMed, frequency: value })}
              >
                <SelectTrigger className="text-xl p-6">
                  <SelectValue placeholder="Choose how often" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once-daily" className="text-xl">Once Daily</SelectItem>
                  <SelectItem value="twice-daily" className="text-xl">Twice Daily</SelectItem>
                  <SelectItem value="three-times" className="text-xl">Three Times Daily</SelectItem>
                  <SelectItem value="as-needed" className="text-xl">As Needed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-2xl">What Time Do You Take It?</Label>
              <Select
                value={currentMed.time}
                onValueChange={(value) => setCurrentMed({ ...currentMed, time: value })}
              >
                <SelectTrigger className="text-xl p-6">
                  <SelectValue placeholder="Choose time of day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning" className="text-xl">Morning</SelectItem>
                  <SelectItem value="afternoon" className="text-xl">Afternoon</SelectItem>
                  <SelectItem value="evening" className="text-xl">Evening</SelectItem>
                  <SelectItem value="bedtime" className="text-xl">Bedtime</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full text-2xl p-6"
              onClick={handleAddMedication}
              disabled={!currentMed.name || !currentMed.dosage || !currentMed.frequency || !currentMed.time}
            >
              Add This Medication
            </Button>
          </div>
        </Card>

        {medications.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Your Medication List</h3>
            {medications.map((med, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="text-2xl font-semibold">{med.name}</div>
                    <div className="text-xl text-gray-600">
                      {med.dosage} - {med.frequency} ({med.time})
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="lg"
                    className="text-xl"
                    onClick={() => handleRemoveMedication(index)}
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Button
        className="w-full text-2xl p-8"
        onClick={handleReview}
        disabled={medications.length === 0}
      >
        Review All Medications
      </Button>
    </div>
  );

  const ReviewScreen = () => (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Pill className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-2xl font-semibold">Medication List</h3>
              <p className="text-xl text-gray-600">Please review your medications</p>
            </div>
          </div>

          <div className="grid gap-4">
            {medications.map((med, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="text-xl font-semibold">{med.name}</div>
                <div className="text-lg text-gray-600">
                  <div>Dosage: {med.dosage}</div>
                  <div>Frequency: {med.frequency}</div>
                  <div>Time: {med.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button
          variant="outline"
          className="text-2xl px-8 py-6"
          onClick={() => navigate("/auth/login?step=features")}
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back
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
        <h2 className="text-4xl font-bold text-green-600">Medications Updated!</h2>
        <p className="text-2xl text-gray-600">
          Your medication list has been updated with:
        </p>
        <div className="text-3xl font-semibold">
          {medications.length} Medication{medications.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className="pt-8 space-y-4">
        <p className="text-xl text-gray-600">
          Your care team will be notified of these changes.
        </p>
        <Button
          className="text-2xl px-8 py-6"
          onClick={() => navigate("/features")}
        >
          Return to Features
        </Button>
      </div>
    </div>
  );

  return (
    <BaseFeature
      title="Medication Management"
      description="Keep track of your medications and dosages"
      showAuth={showAuth}
      onCloseAuth={() => setShowAuth(false)}
      onAuthSuccess={handleAuthSuccess}
      actionName="Update Medications"
      helpText={helpText}
    >
      {step === "selection" && <SelectionScreen />}
      {step === "review" && <ReviewScreen />}
      {step === "confirmed" && <ConfirmedScreen />}
    </BaseFeature>
  );
};
