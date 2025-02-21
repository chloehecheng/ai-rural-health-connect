import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export const SelectionScreen = ({
  appointment,
  setAppointment,
  reason,
  setReason,
  handleReview,
  navigate
}: {
  appointment: {
    doctor: string;
    appointmentType: string;
    date: string;
    time: string;
    reason: string;
    location: string;
  };
  setAppointment: React.Dispatch<React.SetStateAction<any>>;
  reason: string;
  setReason: React.Dispatch<React.SetStateAction<string>>;
  handleReview: () => void;
  navigate: (path: string) => void;
}) => (
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
        {/* Select Your Doctor */}
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

        {/* Type of Appointment */}
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

        {/* Preferred Date */}
        <FormField label="Preferred Date">
          <Input
            type="date"
            value={appointment.date}
            onChange={(e) => setAppointment(prev => ({ ...prev, date: e.target.value }))}
            className="text-xl p-6"
            min={new Date().toISOString().split('T')[0]}
          />
        </FormField>

        {/* Preferred Time */}
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

        {/* Reason for Visit */}
        <FormField label="Reason for Visit">
          <Input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="text-xl p-6"
            placeholder="Briefly describe why you need to see the doctor"
          />
        </FormField>

        {/* Preferred Location */}
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

      {/* Buttons */}
      <div className="mt-8 space-y-4">
        <Button
          className="w-full text-2xl p-8"
          onClick={handleReview}
          disabled={!appointment.doctor || !appointment.appointmentType || !appointment.date || !appointment.time || !reason}
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
