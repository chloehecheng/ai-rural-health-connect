import { useState } from "react";
import { BaseFeature } from "@/components/features/BaseFeature";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, ArrowLeft, Users, Phone, Shield, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const FamilyAccess = () => {
  const [step, setStep] = useState<"selection" | "review" | "confirmed">("selection");
  const [showAuth, setShowAuth] = useState(false);
  const [familyMemberName, setFamilyMemberName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const { toast } = useToast();

  const handleReview = () => {
    if (!familyMemberName || !relationship || !phoneNumber || !accessLevel) {
      toast({
        title: "Please Fill All Fields",
        description: "We need all the information to set up family access.",
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
    console.log("Family access confirmed:", {
      familyMemberName,
      relationship,
      phoneNumber,
      accessLevel,
      user
    });
    setStep("confirmed");
  };

  const SelectionScreen = () => (
    <div className="space-y-8">
      <div className="grid gap-6">
        <div className="space-y-4">
          <Label className="text-2xl">Family Member's Name</Label>
          <Input
            value={familyMemberName}
            onChange={(e) => setFamilyMemberName(e.target.value)}
            className="text-xl p-6"
            placeholder="Enter full name"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-2xl">Relationship</Label>
          <Select value={relationship} onValueChange={setRelationship}>
            <SelectTrigger className="text-xl p-6">
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spouse" className="text-xl">Spouse</SelectItem>
              <SelectItem value="child" className="text-xl">Child</SelectItem>
              <SelectItem value="parent" className="text-xl">Parent</SelectItem>
              <SelectItem value="sibling" className="text-xl">Sibling</SelectItem>
              <SelectItem value="other" className="text-xl">Other Family Member</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label className="text-2xl">Phone Number</Label>
          <Input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="text-xl p-6"
            placeholder="(555) 555-5555"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-2xl">Access Level</Label>
          <Select value={accessLevel} onValueChange={setAccessLevel}>
            <SelectTrigger className="text-xl p-6">
              <SelectValue placeholder="Select access level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full" className="text-xl">Full Access</SelectItem>
              <SelectItem value="limited" className="text-xl">Limited Access</SelectItem>
              <SelectItem value="emergency" className="text-xl">Emergency Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        className="w-full text-2xl p-8"
        onClick={handleReview}
        disabled={!familyMemberName || !relationship || !phoneNumber || !accessLevel}
      >
        Review Access Settings
      </Button>
    </div>
  );

  const ReviewScreen = () => (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-2xl font-semibold">Family Access Details</h3>
              <p className="text-xl text-gray-600">Please review access settings</p>
            </div>
          </div>

          <div className="grid gap-4 text-xl">
            <div className="p-4 bg-gray-50 rounded-lg flex gap-3">
              <UserPlus className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">Family Member:</div>
                <div>{familyMemberName}</div>
                <div className="text-gray-500">{relationship}</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg flex gap-3">
              <Phone className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">Phone Number:</div>
                <div>{phoneNumber}</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg flex gap-3">
              <Shield className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">Access Level:</div>
                <div>{accessLevel}</div>
              </div>
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
          Go Back
        </Button>
        <Button
          className="flex-1 text-xl p-6"
          onClick={handleConfirm}
        >
          Grant Access
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
        <h2 className="text-4xl font-bold text-green-600">Access Granted!</h2>
        <p className="text-2xl text-gray-600">
          Family member has been added:
        </p>
        <div className="text-3xl font-semibold">
          {familyMemberName}
        </div>
        <p className="text-2xl">
          {relationship} - {accessLevel} Access
        </p>
      </div>
      <div className="pt-8 space-y-4">
        <p className="text-xl text-gray-600">
          They will receive an invitation via text message to set up their account.
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
      title="Family Access"
      description="Grant secure access to family members who help manage your care"
      showAuth={showAuth}
      onCloseAuth={() => setShowAuth(false)}
      onAuthSuccess={handleAuthSuccess}
      actionName="Grant Family Access"
    >
      {step === "selection" && <SelectionScreen />}
      {step === "review" && <ReviewScreen />}
      {step === "confirmed" && <ConfirmedScreen />}
    </BaseFeature>
  );
};
