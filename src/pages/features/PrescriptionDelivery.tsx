import { useState } from "react";
import { BaseFeature } from "@/components/features/BaseFeature";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, ArrowLeft, Pill, MapPin, Calendar, Clock, AlertCircle, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const PrescriptionDelivery = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"selection" | "review" | "confirmed">("selection");
  const [showAuth, setShowAuth] = useState(false);
  const [delivery, setDelivery] = useState({
    prescriptionNumber: "",
    deliveryAddress: "",
    preferredDate: "",
    preferredTime: "",
    specialInstructions: "",
    pharmacy: ""
  });
  const { toast } = useToast();

  // Help text specific to prescription delivery
  const helpText = [
    "Enter your prescription number exactly as it appears on your prescription",
    "Provide your complete delivery address",
    "Choose a delivery date (at least 24 hours in advance)",
    "Select a preferred delivery time window",
    "Add any special delivery instructions if needed",
    "Make sure someone will be available to receive the delivery",
    "Keep your phone nearby for delivery updates"
  ];

  const handleReview = () => {
    if (!delivery.prescriptionNumber || !delivery.deliveryAddress || !delivery.preferredDate || !delivery.preferredTime) {
      toast({
        title: "Please Fill All Required Fields",
        description: "We need all the information to schedule your prescription delivery properly.",
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
    console.log("Delivery scheduled:", {
      ...delivery,
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
              Schedule a convenient delivery of your prescription medications right to your door.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-2xl">Prescription Number</Label>
            <Input
              value={delivery.prescriptionNumber}
              onChange={(e) => setDelivery({ ...delivery, prescriptionNumber: e.target.value })}
              className="text-xl p-6"
              placeholder="Enter your prescription number"
              style={{ fontSize: '20px' }}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-2xl">Delivery Address</Label>
            <Input
              value={delivery.deliveryAddress}
              onChange={(e) => setDelivery({ ...delivery, deliveryAddress: e.target.value })}
              className="text-xl p-6"
              placeholder="Enter your complete delivery address"
              style={{ fontSize: '20px' }}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-2xl">Preferred Delivery Date</Label>
            <Input
              type="date"
              value={delivery.preferredDate}
              onChange={(e) => setDelivery({ ...delivery, preferredDate: e.target.value })}
              className="text-xl p-6"
              min={new Date().toISOString().split('T')[0]}
              style={{ fontSize: '20px' }}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-2xl">Preferred Delivery Time</Label>
            <Select
              value={delivery.preferredTime}
              onValueChange={(value) => setDelivery({ ...delivery, preferredTime: value })}
            >
              <SelectTrigger className="text-xl p-6">
                <SelectValue placeholder="Choose your preferred delivery time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning" className="text-xl">Morning (9 AM - 12 PM)</SelectItem>
                <SelectItem value="afternoon" className="text-xl">Afternoon (12 PM - 4 PM)</SelectItem>
                <SelectItem value="evening" className="text-xl">Evening (4 PM - 7 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-2xl">Preferred Pharmacy</Label>
            <Select
              value={delivery.pharmacy}
              onValueChange={(value) => setDelivery({ ...delivery, pharmacy: value })}
            >
              <SelectTrigger className="text-xl p-6">
                <SelectValue placeholder="Select your preferred pharmacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cvs" className="text-xl">CVS Pharmacy</SelectItem>
                <SelectItem value="walgreens" className="text-xl">Walgreens</SelectItem>
                <SelectItem value="rite-aid" className="text-xl">Rite Aid</SelectItem>
                <SelectItem value="walmart" className="text-xl">Walmart Pharmacy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-2xl">Special Delivery Instructions (Optional)</Label>
            <Input
              value={delivery.specialInstructions}
              onChange={(e) => setDelivery({ ...delivery, specialInstructions: e.target.value })}
              className="text-xl p-6"
              placeholder="Any special instructions for the delivery person"
              style={{ fontSize: '20px' }}
            />
          </div>
        </div>
      </Card>

      <Button
        className="w-full text-2xl p-8"
        onClick={handleReview}
        disabled={!delivery.prescriptionNumber || !delivery.deliveryAddress || !delivery.preferredDate || !delivery.preferredTime}
      >
        Review Delivery Details
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
              <h3 className="text-2xl font-semibold">Review Your Delivery</h3>
              <p className="text-xl text-gray-600">Please check all details before confirming</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <Pill className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Prescription Number:</div>
              </div>
              <div className="pl-9 text-xl">{delivery.prescriptionNumber}</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <Home className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Delivery Address:</div>
              </div>
              <div className="pl-9 text-xl">{delivery.deliveryAddress}</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Delivery Date:</div>
              </div>
              <div className="pl-9 text-xl">{new Date(delivery.preferredDate).toLocaleDateString()}</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Delivery Time:</div>
              </div>
              <div className="pl-9 text-xl">{delivery.preferredTime}</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Pharmacy:</div>
              </div>
              <div className="pl-9 text-xl">{delivery.pharmacy}</div>
            </div>

            {delivery.specialInstructions && (
              <div className="p-6 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-gray-500" />
                  <div className="font-semibold">Special Instructions:</div>
                </div>
                <div className="pl-9 text-xl">{delivery.specialInstructions}</div>
              </div>
            )}
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
          Schedule Delivery
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
        <h2 className="text-4xl font-bold text-green-600">Delivery Scheduled!</h2>
        <p className="text-2xl text-gray-600">
          Your prescription delivery has been successfully scheduled
        </p>
        <div className="text-3xl font-semibold">
          {new Date(delivery.preferredDate).toLocaleDateString()}
        </div>
        <p className="text-2xl">
          Delivery Time: {delivery.preferredTime}
        </p>
      </div>
      <div className="pt-8 space-y-4">
        <Card className="p-6 max-w-2xl mx-auto">
          <div className="space-y-4">
            <p className="text-xl text-gray-600">
              We'll send you a text message with your delivery tracking information.
            </p>
            <p className="text-xl text-gray-600">
              You can modify or cancel your delivery up to 24 hours before the scheduled time.
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
      title="Prescription Delivery"
      description="Schedule a convenient delivery of your medications"
      showAuth={showAuth}
      onCloseAuth={() => setShowAuth(false)}
      onAuthSuccess={handleAuthSuccess}
      actionName="Schedule Delivery"
      helpText={helpText}
    >
      {step === "selection" && <SelectionScreen />}
      {step === "review" && <ReviewScreen />}
      {step === "confirmed" && <ConfirmedScreen />}
    </BaseFeature>
  );
};
