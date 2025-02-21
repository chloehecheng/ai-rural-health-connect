import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Building, AlertCircle, ArrowLeft } from "lucide-react";

interface ReviewScreenProps {
  appointment: {
    doctor: string;
    appointmentType: string;
    date: string;
    time: string;
    reason: string;
    location: string;
  };
  setStep: (step: "selection" | "review" | "confirmed") => void;
  handleConfirm: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({ appointment, setStep, handleConfirm }) => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Calendar className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-2xl font-semibold">Review Your Appointment</h3>
              <p className="text-xl text-gray-600">Please check all details before confirming.</p>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="grid gap-4">
            {/* Doctor */}
            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-gray-500" />
                <span className="font-semibold">Doctor:</span>
              </div>
              <div className="pl-9 text-xl">{appointment.doctor}</div>
            </div>

            {/* Date */}
            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-gray-500" />
                <span className="font-semibold">Date:</span>
              </div>
              <div className="pl-9 text-xl">{new Date(appointment.date).toLocaleDateString()}</div>
            </div>

            {/* Time */}
            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-gray-500" />
                <span className="font-semibold">Time:</span>
              </div>
              <div className="pl-9 text-xl">{appointment.time}</div>
            </div>

            {/* Appointment Type */}
            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-gray-500" />
                <span className="font-semibold">Type:</span>
              </div>
              <div className="pl-9 text-xl">{appointment.appointmentType}</div>
            </div>

            {/* Location */}
            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <Building className="w-6 h-6 text-gray-500" />
                <span className="font-semibold">Location:</span>
              </div>
              <div className="pl-9 text-xl">{appointment.location}</div>
            </div>

            {/* Reason */}
            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-gray-500" />
                <span className="font-semibold">Reason:</span>
              </div>
              <div className="pl-9 text-xl">{appointment.reason}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1 text-xl p-6" onClick={() => setStep("selection")}>
          <ArrowLeft className="w-6 h-6 mr-2" />
          Make Changes
        </Button>
        <Button className="flex-1 text-xl p-6" onClick={handleConfirm}>
          Confirm Appointment
        </Button>
      </div>
    </div>
  );
};
