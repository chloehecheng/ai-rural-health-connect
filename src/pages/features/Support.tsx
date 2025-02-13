import { useState } from "react";
import { BaseFeature } from "@/components/features/BaseFeature";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, ArrowLeft, HelpCircle, Phone, MessageSquare, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Support = () => {
  const [step, setStep] = useState<"selection" | "review" | "confirmed">("selection");
  const [showAuth, setShowAuth] = useState(false);
  const [category, setCategory] = useState("");
  const [issue, setIssue] = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [contactTime, setContactTime] = useState("");
  const { toast } = useToast();

  const handleReview = () => {
    if (!category || !issue || !preferredContact || !contactTime) {
      toast({
        title: "Please Fill All Fields",
        description: "We need all the information to assist you better.",
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
    console.log("Support request confirmed:", {
      category,
      issue,
      preferredContact,
      contactTime,
      user
    });
    setStep("confirmed");
  };

  const FAQSection = () => (
    <div className="space-y-6 mb-8">
      <h3 className="text-2xl font-semibold">Common Questions</h3>
      <div className="grid gap-4">
        <Card className="p-4 cursor-pointer hover:bg-gray-50">
          <div className="flex gap-3">
            <Search className="w-6 h-6 text-primary" />
            <div>
              <h4 className="text-xl font-medium">How do I reset my password?</h4>
              <p className="text-gray-600">Click "Forgot Password" on the login screen</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 cursor-pointer hover:bg-gray-50">
          <div className="flex gap-3">
            <Search className="w-6 h-6 text-primary" />
            <div>
              <h4 className="text-xl font-medium">How do I schedule an appointment?</h4>
              <p className="text-gray-600">Use the Schedule Appointment feature in the main menu</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 cursor-pointer hover:bg-gray-50">
          <div className="flex gap-3">
            <Search className="w-6 h-6 text-primary" />
            <div>
              <h4 className="text-xl font-medium">How do I update my contact information?</h4>
              <p className="text-gray-600">Visit your profile settings to update your information</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const SelectionScreen = () => (
    <div className="space-y-8">
      <FAQSection />

      <Card className="p-6">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Still Need Help?</h3>

          <div className="space-y-4">
            <Label className="text-2xl">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="text-xl p-6">
                <SelectValue placeholder="Select help category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical" className="text-xl">Technical Support</SelectItem>
                <SelectItem value="account" className="text-xl">Account Help</SelectItem>
                <SelectItem value="features" className="text-xl">Feature Questions</SelectItem>
                <SelectItem value="feedback" className="text-xl">Feedback</SelectItem>
                <SelectItem value="other" className="text-xl">Other Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-2xl">Describe Your Issue</Label>
            <Textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="text-xl p-6 min-h-[150px]"
              placeholder="Please provide details about your issue..."
            />
          </div>

          <div className="space-y-4">
            <Label className="text-2xl">Preferred Contact Method</Label>
            <Select value={preferredContact} onValueChange={setPreferredContact}>
              <SelectTrigger className="text-xl p-6">
                <SelectValue placeholder="How should we contact you?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone" className="text-xl">Phone Call</SelectItem>
                <SelectItem value="text" className="text-xl">Text Message</SelectItem>
                <SelectItem value="email" className="text-xl">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-2xl">Best Time to Contact</Label>
            <Select value={contactTime} onValueChange={setContactTime}>
              <SelectTrigger className="text-xl p-6">
                <SelectValue placeholder="When should we contact you?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning" className="text-xl">Morning (9 AM - 12 PM)</SelectItem>
                <SelectItem value="afternoon" className="text-xl">Afternoon (12 PM - 4 PM)</SelectItem>
                <SelectItem value="evening" className="text-xl">Evening (4 PM - 7 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Button
        className="w-full text-2xl p-8"
        onClick={handleReview}
        disabled={!category || !issue || !preferredContact || !contactTime}
      >
        Review Support Request
      </Button>
    </div>
  );

  const ReviewScreen = () => (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <HelpCircle className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-2xl font-semibold">Support Request</h3>
              <p className="text-xl text-gray-600">Please review your request details</p>
            </div>
          </div>

          <div className="grid gap-4 text-xl">
            <div className="p-4 bg-gray-50 rounded-lg flex gap-3">
              <HelpCircle className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">Category:</div>
                <div>{category}</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg flex gap-3">
              <MessageSquare className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">Issue:</div>
                <div className="whitespace-pre-wrap">{issue}</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg flex gap-3">
              <Phone className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">Contact Preference:</div>
                <div>{preferredContact} during {contactTime}</div>
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
          Submit Request
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
        <h2 className="text-4xl font-bold text-green-600">Request Submitted!</h2>
        <p className="text-2xl text-gray-600">
          We've received your support request
        </p>
        <div className="text-3xl font-semibold">
          Category: {category}
        </div>
        <p className="text-2xl">
          We'll contact you via {preferredContact} during {contactTime}
        </p>
      </div>
      <div className="pt-8 space-y-4">
        <p className="text-xl text-gray-600">
          A support team member will reach out to assist you soon.
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
      title="Support & Help"
      description="Get help with using the platform or submit feedback"
      showAuth={showAuth}
      onCloseAuth={() => setShowAuth(false)}
      onAuthSuccess={handleAuthSuccess}
      actionName="Submit Support Request"
    >
      {step === "selection" && <SelectionScreen />}
      {step === "review" && <ReviewScreen />}
      {step === "confirmed" && <ConfirmedScreen />}
    </BaseFeature>
  );
};
