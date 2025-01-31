import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, MessageSquare, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const TelehealthOptions = () => {
  const [message, setMessage] = React.useState("");
  const { toast } = useToast();

  const handleMessageSubmit = () => {
    // In a real app, this would send the message to the provider
    toast({
      title: "Message Sent",
      description: "Your provider will respond within 24 hours.",
    });
    setMessage("");
  };

  const scheduleTelemedicine = () => {
    toast({
      title: "Request Submitted",
      description: "We'll contact you to schedule your telemedicine appointment.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Telemedicine Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={scheduleTelemedicine}
            className="w-full flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Schedule Virtual Visit
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Message Your Provider
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            onClick={handleMessageSubmit}
            disabled={!message.trim()}
            className="w-full"
          >
            Send Message
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};