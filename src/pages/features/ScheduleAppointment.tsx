import { useState, memo } from "react";
import { BaseFeature } from "@/components/features/BaseFeature";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, ArrowLeft, Calendar, Clock, User, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Memoize form fields to prevent unnecessary re-renders
const FormField = memo(({ 
  label, 
  children 
}: { 
  label: string; 
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <Label className="text-2xl">{label}</Label>
    {children}
  </div>
));

export const ScheduleAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"selection" | "review" | "confirmed">("selection");
  const [showAuth, setShowAuth] = useState(false);
  const [appointment, setAppointment] = useState({
    doctor: "",
    appointmentType: "",
    date: "",
    time: "",
    reason: "",
    location: ""
  });
  const { toast } = useToast();

  // Help text specific to scheduling appointments
  const helpText = [
    "Choose your preferred doctor or specialist from the list",
    "Select the type of appointment you need",
    "Pick a date that works best for you (at least 24 hours in advance)",
    "Choose from available time slots",
    "Briefly describe the reason for your visit",
    "Select your preferred location if multiple options are available",
    "You'll receive a confirmation text after scheduling"
  ];

  const handleReview = () => {
    if (!appointment.doctor || !appointment.appointmentType || !appointment.date || !appointment.time || !appointment.reason) {
      toast({
        title: "Please Fill All Required Fields",
        description: "We need all the information to schedule your appointment properly.",
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
    console.log("Appointment scheduled:", {
      ...appointment,
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
              Schedule your next appointment with your healthcare provider. Take your time to fill in all the details.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <FormField label="Select Your Doctor">
            <Select
              value={appointment.doctor}
              onValueChange={(value) => setAppointment(prev => ({ ...prev, doctor: value }))}
            >
              <SelectTrigger className="text-xl p-6">
                <SelectValue placeholder="Choose your healthcare provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dr-smith">Dr. Smith - Primary Care</SelectItem>
                <SelectItem value="dr-jones">Dr. Jones - Cardiology</SelectItem>
                <SelectItem value="dr-wilson">Dr. Wilson - Neurology</SelectItem>
                <SelectItem value="dr-brown">Dr. Brown - Orthopedics</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Type of Appointment">
            <Select
              value={appointment.appointmentType}
              onValueChange={(value) => setAppointment(prev => ({ ...prev, appointmentType: value }))}
            >
              <SelectTrigger className="text-xl p-6">
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="check-up">Regular Check-up</SelectItem>
                <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                <SelectItem value="new-concern">New Health Concern</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Preferred Date">
            <Input
              type="date"
              value={appointment.date}
              onChange={(e) => setAppointment(prev => ({ ...prev, date: e.target.value }))}
              className="text-xl p-6"
              min={new Date().toISOString().split('T')[0]}
            />
          </FormField>

          <FormField label="Preferred Time">
            <Select
              value={appointment.time}
              onValueChange={(value) => setAppointment(prev => ({ ...prev, time: value }))}
            >
              <SelectTrigger className="text-xl p-6">
                <SelectValue placeholder="Choose your preferred time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning-early">Early Morning (8:00 AM - 10:00 AM)</SelectItem>
                <SelectItem value="morning-late">Late Morning (10:00 AM - 12:00 PM)</SelectItem>
                <SelectItem value="afternoon-early">Early Afternoon (1:00 PM - 3:00 PM)</SelectItem>
                <SelectItem value="afternoon-late">Late Afternoon (3:00 PM - 5:00 PM)</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Reason for Visit">
            <Input
              value={appointment.reason}
              onChange={(e) => setAppointment(prev => ({ ...prev, reason: e.target.value }))}
              className="text-xl p-6"
              placeholder="Briefly describe why you need to see the doctor"
            />
          </FormField>

          <FormField label="Preferred Location">
            <Select
              value={appointment.location}
              onValueChange={(value) => setAppointment(prev => ({ ...prev, location: value }))}
            >
              <SelectTrigger className="text-xl p-6">
                <SelectValue placeholder="Choose your preferred location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main-clinic">Main Street Clinic</SelectItem>
                <SelectItem value="north-clinic">North Medical Center</SelectItem>
                <SelectItem value="south-clinic">South Health Complex</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            className="w-full text-2xl p-8"
            onClick={handleReview}
            disabled={!appointment.doctor || !appointment.appointmentType || !appointment.date || !appointment.time || !appointment.reason}
          >
            Review Appointment Details
          </Button>

          <div className="flex gap-4 justify-center mt-8">
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
      </Card>
    </div>
  );

  const ReviewScreen = () => (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Calendar className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-2xl font-semibold">Review Your Appointment</h3>
              <p className="text-xl text-gray-600">Please check all details before confirming</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Doctor:</div>
              </div>
              <div className="pl-9 text-xl">{appointment.doctor}</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Date:</div>
              </div>
              <div className="pl-9 text-xl">{new Date(appointment.date).toLocaleDateString()}</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Time:</div>
              </div>
              <div className="pl-9 text-xl">{appointment.time}</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Type:</div>
              </div>
              <div className="pl-9 text-xl">{appointment.appointmentType}</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <Building className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Location:</div>
              </div>
              <div className="pl-9 text-xl">{appointment.location}</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Reason:</div>
              </div>
              <div className="pl-9 text-xl">{appointment.reason}</div>
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
          Make Changes
        </Button>
        <Button
          className="flex-1 text-xl p-6"
          onClick={handleConfirm}
        >
          Confirm Appointment
        </Button>
      </div>
    </div>
  );

  const ConfirmedScreen = () => (
    <div className="text-center space-y-8 py-8">
      <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
        <AlertCircle className="w-10 h-10 text-green-600" />
      </div>
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-green-600">Appointment Scheduled!</h2>
        <p className="text-2xl text-gray-600">
          Your appointment has been successfully scheduled
        </p>
        <div className="text-3xl font-semibold">
          {new Date(appointment.date).toLocaleDateString()}
        </div>
        <p className="text-2xl">
          {appointment.time} with {appointment.doctor}
        </p>
      </div>
      <div className="pt-8 space-y-4">
        <Card className="p-6 max-w-2xl mx-auto">
          <div className="space-y-4">
            <p className="text-xl text-gray-600">
              We'll send you a text message reminder 24 hours before your appointment.
            </p>
            <p className="text-xl text-gray-600">
              Need to reschedule? You can modify your appointment up to 24 hours before the scheduled time.
            </p>
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
    </div>
  );

  return (
    <BaseFeature
      title="Schedule Appointment"
      description="Book an appointment with your healthcare provider"
      showAuth={showAuth}
      onCloseAuth={() => setShowAuth(false)}
      onAuthSuccess={handleAuthSuccess}
      actionName="Schedule Appointment"
      helpText={helpText}
    >
      {step === "selection" && <SelectionScreen />}
      {step === "review" && <ReviewScreen />}
      {step === "confirmed" && <ConfirmedScreen />}
    </BaseFeature>
  );
};
