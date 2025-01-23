import { Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const AIAssistant = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const handleProcess = () => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text or record your voice first.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Processing Documentation",
      description: "AI is analyzing your input...",
    });
    // TODO: Implement actual AI processing
    setInput("");
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone.",
      });
    } else {
      toast({
        title: "Recording Stopped",
        description: "Processing your voice input...",
      });
    }
  };

  return (
    <div className="p-4 bg-accent rounded-lg">
      <h3 className="text-lg font-semibold mb-4">AI Documentation Assistant</h3>
      <p className="text-sm text-gray-600 mb-4">
        Use this AI assistant to help with patient documentation, notes, and medical transcription.
      </p>
      <Textarea
        placeholder="Start typing or use voice input for patient notes, documentation, or medical transcription..."
        className="min-h-[100px] mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex justify-between">
        <Button
          variant={isRecording ? "destructive" : "secondary"}
          onClick={handleRecording}
        >
          <Mic className="h-4 w-4 mr-2" />
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
        <Button onClick={handleProcess}>
          <Send className="h-4 w-4 mr-2" />
          Process
        </Button>
      </div>
    </div>
  );
};