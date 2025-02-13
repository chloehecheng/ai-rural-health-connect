import { useState } from "react";
import { BaseFeature } from "@/components/features/BaseFeature";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ArrowLeft, MessageCircle, User, Clock, AlertTriangle, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const MessageCareTeam = () => {
  const [step, setStep] = useState<"selection" | "review" | "confirmed">("selection");
  const [showAuth, setShowAuth] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [urgency, setUrgency] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Help text specific to messaging
  const helpText = [
    "Choose who you want to send your message to from the dropdown menu",
    "Select the urgency level - use 'Urgent' only for matters that need same-day attention",
    "Type your message clearly and include all important details",
    "For emergencies, always call 911 instead of using this messaging system",
    "You'll receive a response based on the urgency level you select",
    "You can always check your message history in the Messages section",
    "Your care team is here to help - don't hesitate to ask questions"
  ];

  const handleReview = () => {
    if (!recipient || !urgency || !message) {
      toast({
        title: "Please Fill All Fields",
        description: "We need all the information to send your message.",
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
    console.log("Message sent:", {
      recipient,
      urgency,
      message,
      user
    });
    setStep("confirmed");
  };

  const SelectionScreen = () => (
    <div className="space-y-8">
      <Card className="p-6 border-2 border-primary">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <HelpCircle className="w-8 h-8" />
            <p className="text-xl font-medium">
              Send a secure message to your healthcare team. They will respond based on the urgency level you select.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-2xl">Who Would You Like to Message?</Label>
              <Select value={recipient} onValueChange={setRecipient}>
                <SelectTrigger className="text-xl p-6">
                  <SelectValue placeholder="Choose who to message" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary-doctor" className="text-xl">Your Primary Doctor</SelectItem>
                  <SelectItem value="nurse" className="text-xl">Your Nurse</SelectItem>
                  <SelectItem value="specialist" className="text-xl">Your Specialist</SelectItem>
                  <SelectItem value="care-coordinator" className="text-xl">Care Coordinator</SelectItem>
                  <SelectItem value="entire-team" className="text-xl">Entire Care Team</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-2xl">How Urgent Is Your Message?</Label>
              <Select value={urgency} onValueChange={setUrgency}>
                <SelectTrigger className="text-xl p-6">
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="routine" className="text-xl">Routine Question (3-5 days)</SelectItem>
                  <SelectItem value="important" className="text-xl">Important (24hr response)</SelectItem>
                  <SelectItem value="urgent" className="text-xl">Urgent (Same day)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-2xl">Write Your Message</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="text-xl p-6 min-h-[200px]"
                placeholder="Type your message here... Include any specific questions or concerns you have."
                style={{ fontSize: '20px' }}
              />
            </div>

            {urgency === "urgent" && (
              <Card className="p-6 border-yellow-500 bg-yellow-50">
                <div className="flex gap-3 items-center text-yellow-800">
                  <AlertTriangle className="w-8 h-8" />
                  <div className="space-y-2">
                    <p className="text-xl font-semibold">
                      Important Notice About Urgent Messages
                    </p>
                    <p className="text-lg">
                      For medical emergencies, please call 911 or go to the nearest emergency room.
                      Urgent messages will receive a same-day response during business hours (8 AM - 5 PM).
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>
      </div>

      <Button
        className="w-full text-2xl p-8"
        onClick={handleReview}
        disabled={!recipient || !urgency || !message}
      >
        Review Your Message
      </Button>
    </div>
  );

  const ReviewScreen = () => (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <MessageCircle className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-2xl font-semibold">Review Your Message</h3>
              <p className="text-xl text-gray-600">Please check all details before sending</p>
            </div>
          </div>

          <div className="grid gap-4 text-xl">
            <div className="p-6 bg-gray-50 rounded-lg flex gap-3">
              <User className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">Sending To:</div>
                <div className="text-2xl">{recipient}</div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg flex gap-3">
              <Clock className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">Urgency Level:</div>
                <div className="text-2xl">{urgency}</div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg flex gap-3">
              <MessageCircle className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">Your Message:</div>
                <div className="whitespace-pre-wrap text-2xl mt-2">{message}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button
          variant="outline"
          className="text-2xl px-8 py-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back
        </Button>
        <Button
          className="text-2xl px-8 py-6"
          onClick={() => navigate("/")}
        >
          Return to Dashboard
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
        <h2 className="text-4xl font-bold text-green-600">Message Sent!</h2>
        <p className="text-2xl text-gray-600">
          Your message has been sent to:
        </p>
        <div className="text-3xl font-semibold">
          {recipient}
        </div>
        <p className="text-2xl">
          Urgency Level: {urgency}
        </p>
      </div>
      <div className="pt-8 space-y-4">
        <Card className="p-6 max-w-2xl mx-auto">
          <p className="text-xl text-gray-600">
            {urgency === "urgent" 
              ? "You will receive a response today during business hours (8 AM - 5 PM)."
              : urgency === "important"
              ? "You will receive a response within 24 hours."
              : "You will receive a response within 3-5 business days."}
          </p>
        </Card>
        <Button
          className="text-2xl px-8 py-6"
          onClick={() => navigate("/features")}
        >
          Return to Features
        </Button>
      </div>
    </div>
  );

  return (
    <BaseFeature
      title="Message Care Team"
      description="Send secure messages to your healthcare providers"
      showAuth={showAuth}
      onCloseAuth={() => setShowAuth(false)}
      onAuthSuccess={handleAuthSuccess}
      actionName="Send Message"
      helpText={helpText}
    >
      {step === "selection" && <SelectionScreen />}
      {step === "review" && <ReviewScreen />}
      {step === "confirmed" && <ConfirmedScreen />}
    </BaseFeature>
  );
};
