import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// UI Components
import { BaseFeature } from "@/components/features/BaseFeature";
import { Button } from "@/components/ui/button";

// Screens (Now in separate files)
import { SelectionScreen } from "@/pages/features/SelectionScreen";
import { ReviewScreen } from "@/pages/features/ReviewScreen";
import { ConfirmedScreen } from "@/pages/features/ConfirmedScreen";

export const ScheduleAppointment = React.memo(() => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<"selection" | "review" | "confirmed">("selection");
  const [showAuth, setShowAuth] = useState(false);
  const [reason, setReason] = useState("");
  const [appointment, setAppointment] = useState({
    doctor: "",
    appointmentType: "",
    date: "",
    time: "",
    reason: "",
    location: ""
  });

  const handleReview = () => {
    if (!appointment.doctor || !appointment.appointmentType || !appointment.date || !appointment.time || !reason) {
      toast({
        title: "Please Fill All Required Fields",
        description: "We need all the information to schedule your appointment properly.",
        variant: "destructive",
      });
      return;
    }
    setAppointment((prev) => ({
        ...prev,
        reason,
      }));
    setStep("review");
  };

  const handleConfirm = () => {
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("Appointment scheduled:", { ...appointment, user });
    setStep("confirmed");
  };

  return (
    <BaseFeature
      title="Schedule Appointment"
      description="Book an appointment with your healthcare provider"
      showAuth={showAuth}
      onCloseAuth={() => setShowAuth(false)}
      onAuthSuccess={handleAuthSuccess}
      actionName="Schedule Appointment"
    >
      {step === "selection" && (
        <SelectionScreen 
          reason={reason} 
          setReason={setReason} 
          appointment={appointment} 
          setAppointment={setAppointment} 
          handleReview={handleReview} 
          navigate={navigate}
        />
      )}
      {step === "review" && (
        <ReviewScreen 
          appointment={appointment} 
          setStep={setStep} 
          handleConfirm={handleConfirm} 
        />
      )}
      {step === "confirmed" && (
        <ConfirmedScreen 
          appointment={appointment} 
          navigate={navigate} 
        />
      )}
    </BaseFeature>
  );
});
