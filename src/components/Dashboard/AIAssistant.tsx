import { Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const AIAssistant = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="p-4 bg-accent rounded-lg">
      <h3 className="text-lg font-semibold mb-4">AI Documentation Assistant</h3>
      <Textarea
        placeholder="Start typing or use voice input..."
        className="min-h-[100px] mb-4"
      />
      <div className="flex justify-between">
        <Button
          variant={isRecording ? "destructive" : "secondary"}
          onClick={() => setIsRecording(!isRecording)}
        >
          <Mic className="h-4 w-4 mr-2" />
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Process
        </Button>
      </div>
    </div>
  );
};