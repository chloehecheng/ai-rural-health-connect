import { useState } from "react";
import { BaseFeature } from "@/components/features/BaseFeature";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, ArrowLeft, Bell, Clock, Calendar, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MedicationReminders = () => {
  const [step, setStep] = useState<"selection" | "review" | "confirmed">("selection");
  const [showAuth, setShowAuth] = useState(false);
  const [reminders, setReminders] = useState<Array<{
    medication: string;
    time: string;
    frequency: string;
    method: string;
  }>>([]);
  const [currentReminder, setCurrentReminder] = useState({
    medication: "",
    time: "",
    frequency: "",
    method: ""
  });
  const { toast } = useToast();

  // Help text specific to medication reminders
  const helpText = [
    "Choose the medication you want to set reminders for",
    "Select what time of day you need to take this medication",
    "Pick how often you need to take it",
    "Choose how you want to receive reminders (text, call, or both)",
    "You can set up reminders for multiple medications",
    "Make sure to review all your reminder settings before confirming",
    "You can always update or delete reminders later"
  ];

  const handleAddReminder = () => {
    if (!currentReminder.medication || !currentReminder.time || !currentReminder.frequency || !currentReminder.method) {
      toast({
        title: "Please Fill All Fields",
        description: "All reminder details are required.",
        variant: "destructive",
      });
      return;
    }
    setReminders([...reminders, currentReminder]);
    setCurrentReminder({ medication: "", time: "", frequency: "", method: "" });
  };

  const handleRemoveReminder = (index: number) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  const handleReview = () => {
    if (reminders.length === 0) {
      toast({
        title: "No Reminders Added",
        description: "Please add at least one reminder.",
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
    console.log("Reminders confirmed:", {
      reminders,
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
              Set up reminders for your medications. We'll help you remember to take them on time.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-2xl">Which Medication?</Label>
              <Input
                value={currentReminder.medication}
                onChange={(e) => setCurrentReminder({ ...currentReminder, medication: e.target.value })}
                className="text-xl p-6"
                placeholder="Type the name of your medication"
                style={{ fontSize: '20px' }}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-2xl">What Time Do You Take It?</Label>
              <Select
                value={currentReminder.time}
                onValueChange={(value) => setCurrentReminder({ ...currentReminder, time: value })}
              >
                <SelectTrigger className="text-xl p-6">
                  <SelectValue placeholder="Choose time of day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning" className="text-xl">Morning (8 AM)</SelectItem>
                  <SelectItem value="noon" className="text-xl">Noon (12 PM)</SelectItem>
                  <SelectItem value="evening" className="text-xl">Evening (6 PM)</SelectItem>
                  <SelectItem value="bedtime" className="text-xl">Bedtime (9 PM)</SelectItem>
                  <SelectItem value="custom" className="text-xl">Custom Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-2xl">How Often Do You Take It?</Label>
              <Select
                value={currentReminder.frequency}
                onValueChange={(value) => setCurrentReminder({ ...currentReminder, frequency: value })}
              >
                <SelectTrigger className="text-xl p-6">
                  <SelectValue placeholder="Choose how often" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily" className="text-xl">Every Day</SelectItem>
                  <SelectItem value="twice-daily" className="text-xl">Twice a Day</SelectItem>
                  <SelectItem value="weekly" className="text-xl">Once a Week</SelectItem>
                  <SelectItem value="monthly" className="text-xl">Once a Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-2xl">How Would You Like to Be Reminded?</Label>
              <Select
                value={currentReminder.method}
                onValueChange={(value) => setCurrentReminder({ ...currentReminder, method: value })}
              >
                <SelectTrigger className="text-xl p-6">
                  <SelectValue placeholder="Choose reminder method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text" className="text-xl">Text Message</SelectItem>
                  <SelectItem value="call" className="text-xl">Phone Call</SelectItem>
                  <SelectItem value="both" className="text-xl">Both Text and Call</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full text-2xl p-6"
              onClick={handleAddReminder}
              disabled={!currentReminder.medication || !currentReminder.time || !currentReminder.frequency || !currentReminder.method}
            >
              Add This Reminder
            </Button>
          </div>
        </Card>

        {reminders.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Your Reminder List</h3>
            {reminders.map((reminder, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="text-2xl font-semibold">{reminder.medication}</div>
                    <div className="text-xl text-gray-600">
                      {reminder.time} - {reminder.frequency}
                    </div>
                    <div className="text-xl text-gray-600">
                      Reminder via: {reminder.method}
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="lg"
                    className="text-xl"
                    onClick={() => handleRemoveReminder(index)}
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
        disabled={reminders.length === 0}
      >
        Review All Reminders
      </Button>
    </div>
  );

  const ReviewScreen = () => (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Bell className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-2xl font-semibold">Review Your Reminders</h3>
              <p className="text-xl text-gray-600">Please check all your reminder settings</p>
            </div>
          </div>

          <div className="grid gap-4">
            {reminders.map((reminder, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-gray-500" />
                  <div className="text-2xl font-semibold">{reminder.medication}</div>
                </div>
                <div className="grid gap-2 pl-9">
                  <div className="text-xl">Time: {reminder.time}</div>
                  <div className="text-xl">Frequency: {reminder.frequency}</div>
                  <div className="text-xl">Reminder Method: {reminder.method}</div>
                </div>
              </div>
            ))}
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
          Make Changes
        </Button>
        <Button
          className="flex-1 text-xl p-6"
          onClick={handleConfirm}
        >
          Set Up Reminders
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
        <h2 className="text-4xl font-bold text-green-600">Reminders Set!</h2>
        <p className="text-2xl text-gray-600">
          We've set up reminders for {reminders.length} medication{reminders.length > 1 ? 's' : ''}
        </p>
        <div className="max-w-2xl mx-auto">
          {reminders.map((reminder, index) => (
            <div key={index} className="text-2xl mt-4">
              {reminder.medication} - {reminder.time}
            </div>
          ))}
        </div>
      </div>
      <div className="pt-8 space-y-4">
        <Card className="p-6 max-w-2xl mx-auto">
          <p className="text-xl text-gray-600">
            You will receive reminders via {reminders[0].method} at your scheduled times.
            You can update these settings at any time.
          </p>
        </Card>
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
      title="Medication Reminders"
      description="Set up reminders to take your medications on time"
      showAuth={showAuth}
      onCloseAuth={() => setShowAuth(false)}
      onAuthSuccess={handleAuthSuccess}
      actionName="Set Up Reminders"
      helpText={helpText}
    >
      {step === "selection" && <SelectionScreen />}
      {step === "review" && <ReviewScreen />}
      {step === "confirmed" && <ConfirmedScreen />}
    </BaseFeature>
  );
};
