import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

export const ConfirmedScreen = ({ appointment, navigate }) => {
  return (
    <div className="text-center space-y-8 py-8">
      <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
        <AlertCircle className="w-10 h-10 text-green-600" />
      </div>
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-green-600">Appointment Scheduled!</h2>
        <p className="text-2xl text-gray-600">Your appointment has been successfully scheduled</p>
        <div className="text-3xl font-semibold">{new Date(appointment.date).toLocaleDateString()}</div>
        <p className="text-2xl">{appointment.time} with {appointment.doctor}</p>
      </div>
      <div className="pt-8 space-y-4">
        <Card className="p-6 max-w-2xl mx-auto">
          <div className="space-y-4">
            <p className="text-xl text-gray-600">We'll send you a text message reminder 24 hours before your appointment.</p>
            <p className="text-xl text-gray-600">Need to reschedule? You can modify your appointment up to 24 hours before the scheduled time.</p>
          </div>
        </Card>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" className="text-2xl px-8 py-6" onClick={() => navigate("/auth/login?step=features")}>
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
