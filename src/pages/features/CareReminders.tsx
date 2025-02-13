import { useState } from "react";
import { BaseFeature } from "@/components/features/BaseFeature";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, ArrowLeft, Bell, Calendar, Clock, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CareReminders = () => {
  const [step, setStep] = useState<"selection" | "review" | "confirmed">("selection");
  const [showAuth, setShowAuth] = useState(false);
  const [reminders, setReminders] = useState<Array<{
    type: string;
    date: string;
    time: string;
    notes: string;
  }>>([]);
  const [currentReminder, setCurrentReminder] = useState({
    type: "",
    date: "",
    time: "",
    notes: ""
  });
  const { toast } = useToast();

  const handleAddReminder = () => {
    if (!currentReminder.type || !currentReminder.date || !currentReminder.time) {
      toast({
        title: "Please Fill Required Fields",
        description: "Type, date, and time are required.",
        variant: "destructive",
      });
      return;
    }
    setReminders([...reminders, currentReminder]);
    setCurrentReminder({ type: "", date: "", time: "", notes: "" });
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
      <div className="grid gap-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-2xl">Reminder Type</Label>
              <Select
                value={currentReminder.type}
                onValueChange={(value) => setCurrentReminder({ ...currentReminder, type: value })}
              >
                <SelectTrigger className="text-xl p-6">
                  <SelectValue placeholder="Select reminder type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appointment" className="text-xl">Doctor Appointment</SelectItem>
                  <SelectItem value="medication" className="text-xl">Medication Refill</SelectItem>
                  <SelectItem value="test" className="text-xl">Medical Test</SelectItem>
                  <SelectItem value="exercise" className="text-xl">Exercise Routine</SelectItem>
                  <SelectItem value="diet" className="text-xl">Dietary Reminder</SelectItem>
                  <SelectItem value="other" className="text-xl">Other Care Task</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-2xl">Date</Label>
              <Input
                type="date"
                value={currentReminder.date}
                onChange={(e) => setCurrentReminder({ ...currentReminder, date: e.target.value })}
                className="text-xl p-6"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-2xl">Time</Label>
              <Select
                value={currentReminder.time}
                onValueChange={(value) => setCurrentReminder({ ...currentReminder, time: value })}
              >
                <SelectTrigger className="text-xl p-6">
                  <SelectValue placeholder="Select reminder time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning" className="text-xl">Morning (8 AM)</SelectItem>
                  <SelectItem value="noon" className="text-xl">Noon (12 PM)</SelectItem>
                  <SelectItem value="afternoon" className="text-xl">Afternoon (3 PM)</SelectItem>
                  <SelectItem value="evening" className="text-xl">Evening (6 PM)</SelectItem>
                  <SelectItem value="night" className="text-xl">Night (9 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-2xl">Additional Notes</Label>
              <Input
                value={currentReminder.notes}
                onChange={(e) => setCurrentReminder({ ...currentReminder, notes: e.target.value })}
                className="text-xl p-6"
                placeholder="Any special instructions (optional)"
              />
            </div>

            <Button
              className="w-full text-2xl p-6"
              onClick={handleAddReminder}
              disabled={!currentReminder.type || !currentReminder.date || !currentReminder.time}
            >
              <Plus className="w-6 h-6 mr-2" />
              Add Reminder
            </Button>
          </div>
        </Card>

        {reminders.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Added Reminders</h3>
            {reminders.map((reminder, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="text-xl font-semibold">{reminder.type}</div>
                    <div className="text-lg text-gray-600">
                      {reminder.date} at {reminder.time}
                    </div>
                    {reminder.notes && (
                      <div className="text-lg text-gray-500">{reminder.notes}</div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
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
        Review Reminders
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
              <h3 className="text-2xl font-semibold">Care Reminders</h3>
              <p className="text-xl text-gray-600">Please review your reminders</p>
            </div>
          </div>

          <div className="grid gap-4">
            {reminders.map((reminder, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-gray-500" />
                  <span className="text-xl font-semibold">{reminder.type}</span>
                </div>
                <div className="text-lg text-gray-600 ml-8">
                  <div>Date: {reminder.date}</div>
                  <div>Time: {reminder.time}</div>
                  {reminder.notes && <div>Notes: {reminder.notes}</div>}
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
          Go Back
        </Button>
        <Button
          className="flex-1 text-xl p-6"
          onClick={handleConfirm}
        >
          Set Reminders
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
          We've set up the following reminders:
        </p>
        <div className="text-3xl font-semibold">
          {reminders.length} Reminder{reminders.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className="pt-8 space-y-4">
        <p className="text-xl text-gray-600">
          You'll receive text message reminders at your scheduled times.
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
      title="Care Reminders"
      description="Set up reminders for important care tasks and appointments"
      showAuth={showAuth}
      onCloseAuth={() => setShowAuth(false)}
      onAuthSuccess={handleAuthSuccess}
      actionName="Set Up Reminders"
    >
      {step === "selection" && <SelectionScreen />}
      {step === "review" && <ReviewScreen />}
      {step === "confirmed" && <ConfirmedScreen />}
    </BaseFeature>
  );
};
