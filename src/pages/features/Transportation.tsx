import { useState } from "react";
import { BaseFeature } from "@/components/features/BaseFeature";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, ArrowLeft, Car, MapPin, Calendar, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Transportation = () => {
  const [step, setStep] = useState<"selection" | "review" | "confirmed">("selection");
  const [showAuth, setShowAuth] = useState(false);
  const [rideDetails, setRideDetails] = useState({
    pickupAddress: "",
    destination: "",
    date: "",
    time: "",
    rideType: "",
    specialNeeds: ""
  });
  const { toast } = useToast();

  // Help text specific to transportation
  const helpText = [
    "Enter your pickup address exactly as it appears on your ID or mail",
    "Provide the complete destination address, including building name if applicable",
    "Choose a date at least 24 hours in advance",
    "Select a preferred pickup time that allows for traffic",
    "Let us know if you need any special assistance",
    "You can schedule multiple rides in advance",
    "We'll send you a confirmation text with your driver's details"
  ];

  const handleReview = () => {
    if (!rideDetails.pickupAddress || !rideDetails.destination || !rideDetails.date || !rideDetails.time || !rideDetails.rideType) {
      toast({
        title: "Please Fill All Required Fields",
        description: "We need all the information to schedule your ride safely.",
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
    console.log("Ride scheduled:", {
      ...rideDetails,
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
              Schedule a safe and reliable ride to your healthcare appointments. All our drivers are trained to assist seniors.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-2xl">Pickup Address</Label>
            <Input
              value={rideDetails.pickupAddress}
              onChange={(e) => setRideDetails({ ...rideDetails, pickupAddress: e.target.value })}
              className="text-xl p-6"
              placeholder="Enter your complete pickup address"
              style={{ fontSize: '20px' }}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-2xl">Destination</Label>
            <Input
              value={rideDetails.destination}
              onChange={(e) => setRideDetails({ ...rideDetails, destination: e.target.value })}
              className="text-xl p-6"
              placeholder="Enter the complete destination address"
              style={{ fontSize: '20px' }}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-2xl">Date of Ride</Label>
            <Input
              type="date"
              value={rideDetails.date}
              onChange={(e) => setRideDetails({ ...rideDetails, date: e.target.value })}
              className="text-xl p-6"
              min={new Date().toISOString().split('T')[0]}
              style={{ fontSize: '20px' }}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-2xl">Preferred Pickup Time</Label>
            <Select
              value={rideDetails.time}
              onValueChange={(value) => setRideDetails({ ...rideDetails, time: value })}
            >
              <SelectTrigger className="text-xl p-6">
                <SelectValue placeholder="Choose your preferred time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning-early" className="text-xl">Early Morning (7 AM - 9 AM)</SelectItem>
                <SelectItem value="morning-late" className="text-xl">Late Morning (9 AM - 11 AM)</SelectItem>
                <SelectItem value="afternoon-early" className="text-xl">Early Afternoon (12 PM - 2 PM)</SelectItem>
                <SelectItem value="afternoon-late" className="text-xl">Late Afternoon (2 PM - 4 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-2xl">Type of Ride</Label>
            <Select
              value={rideDetails.rideType}
              onValueChange={(value) => setRideDetails({ ...rideDetails, rideType: value })}
            >
              <SelectTrigger className="text-xl p-6">
                <SelectValue placeholder="Select the type of ride you need" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard" className="text-xl">Standard Car</SelectItem>
                <SelectItem value="wheelchair" className="text-xl">Wheelchair Accessible</SelectItem>
                <SelectItem value="assistance" className="text-xl">Extra Assistance Needed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-2xl">Special Needs or Instructions (Optional)</Label>
            <Input
              value={rideDetails.specialNeeds}
              onChange={(e) => setRideDetails({ ...rideDetails, specialNeeds: e.target.value })}
              className="text-xl p-6"
              placeholder="Any special requirements or instructions for the driver"
              style={{ fontSize: '20px' }}
            />
          </div>
        </div>
      </Card>

      <Button
        className="w-full text-2xl p-8"
        onClick={handleReview}
        disabled={!rideDetails.pickupAddress || !rideDetails.destination || !rideDetails.date || !rideDetails.time || !rideDetails.rideType}
      >
        Review Ride Details
      </Button>
    </div>
  );

  const ReviewScreen = () => (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Car className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-2xl font-semibold">Review Your Ride</h3>
              <p className="text-xl text-gray-600">Please check all details before confirming</p>
            </div>
          </div>

          <div className="grid gap-4 text-xl">
            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Pickup Address:</div>
              </div>
              <div className="pl-9">{rideDetails.pickupAddress}</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Destination:</div>
              </div>
              <div className="pl-9">{rideDetails.destination}</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Date:</div>
              </div>
              <div className="pl-9">{new Date(rideDetails.date).toLocaleDateString()}</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Time:</div>
              </div>
              <div className="pl-9">{rideDetails.time}</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <Car className="w-6 h-6 text-gray-500" />
                <div className="font-semibold">Ride Type:</div>
              </div>
              <div className="pl-9">{rideDetails.rideType}</div>
            </div>

            {rideDetails.specialNeeds && (
              <div className="p-6 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-gray-500" />
                  <div className="font-semibold">Special Instructions:</div>
                </div>
                <div className="pl-9">{rideDetails.specialNeeds}</div>
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
          Schedule Ride
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
        <h2 className="text-4xl font-bold text-green-600">Ride Scheduled!</h2>
        <p className="text-2xl text-gray-600">
          Your ride has been successfully scheduled
        </p>
        <div className="text-3xl font-semibold">
          {new Date(rideDetails.date).toLocaleDateString()}
        </div>
        <p className="text-2xl">
          Pickup Time: {rideDetails.time}
        </p>
      </div>
      <div className="pt-8 space-y-4">
        <Card className="p-6 max-w-2xl mx-auto">
          <div className="space-y-4">
            <p className="text-xl text-gray-600">
              We'll send you a text message with your driver's details 24 hours before your ride.
            </p>
            <p className="text-xl text-gray-600">
              You can cancel or modify your ride up to 12 hours before the scheduled time.
            </p>
          </div>
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
      title="Schedule Transportation"
      description="Book a safe and reliable ride to your healthcare appointments"
      showAuth={showAuth}
      onCloseAuth={() => setShowAuth(false)}
      onAuthSuccess={handleAuthSuccess}
      actionName="Schedule Ride"
      helpText={helpText}
    >
      {step === "selection" && <SelectionScreen />}
      {step === "review" && <ReviewScreen />}
      {step === "confirmed" && <ConfirmedScreen />}
    </BaseFeature>
  );
};
