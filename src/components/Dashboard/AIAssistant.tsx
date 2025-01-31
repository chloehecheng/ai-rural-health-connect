import { Mic, Send, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const TEMPLATES = {
  soap: {
    name: "SOAP Note",
    template: "Subjective:\n\nObjective:\n\nAssessment:\n\nPlan:\n"
  },
  followUp: {
    name: "Follow-up Visit",
    template: "Reason for Visit:\n\nProgress Notes:\n\nMedication Changes:\n\nNext Steps:\n"
  },
  diagnosis: {
    name: "New Diagnosis",
    template: "Primary Diagnosis:\n\nSymptoms:\n\nTreatment Plan:\n\nFollow-up Timeline:\n"
  }
};

export const AIAssistant = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [input, setInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const { toast } = useToast();

  const handleTemplateSelect = (value: string) => {
    setSelectedTemplate(value);
    setInput(TEMPLATES[value as keyof typeof TEMPLATES].template);
    toast({
      title: "Template Loaded",
      description: `${TEMPLATES[value as keyof typeof TEMPLATES].name} template has been loaded.`,
    });
  };

  const handleProcess = () => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text or record your voice first.",
        variant: "destructive",
      });
      return;
    }

    // Validate input based on selected template
    if (selectedTemplate && !validateTemplateFormat(input, selectedTemplate)) {
      toast({
        title: "Invalid Format",
        description: "Please ensure all template sections are filled out properly.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Processing Documentation",
      description: "AI is analyzing your input and generating suggestions...",
    });

    // Simulate AI processing with template-aware context
    setTimeout(() => {
      toast({
        title: "Documentation Complete",
        description: "Your notes have been processed and saved successfully.",
      });
      // Reset form after successful processing
      setInput("");
      setSelectedTemplate("");
    }, 2000);
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone. AI will transcribe in real-time.",
      });
    } else {
      toast({
        title: "Recording Stopped",
        description: "Processing your voice input with medical context awareness...",
      });
      // Simulate voice processing
      setTimeout(() => {
        const transcribedText = selectedTemplate 
          ? TEMPLATES[selectedTemplate as keyof typeof TEMPLATES].template
          : "Patient presents with...";
        setInput(transcribedText);
      }, 1500);
    }
  };

  const validateTemplateFormat = (text: string, templateKey: string) => {
    const template = TEMPLATES[templateKey as keyof typeof TEMPLATES].template;
    const sections = template.split('\n\n').map(section => section.split(':')[0]);
    return sections.every(section => text.includes(`${section}:`));
  };

  return (
    <div className="p-4 bg-accent rounded-lg space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">AI Documentation Assistant</h3>
          <p className="text-sm text-gray-600">
            Use AI to help with patient documentation, notes, and medical transcription.
          </p>
        </div>
        <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(TEMPLATES).map(([key, { name }]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  {name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Textarea
        placeholder="Start typing or use voice input for patient notes, documentation, or medical transcription..."
        className="min-h-[200px] mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Button
            variant={isRecording ? "destructive" : "secondary"}
            onClick={handleRecording}
            className="relative"
          >
            <Mic className="h-4 w-4 mr-2" />
            {isRecording ? "Stop Recording" : "Start Recording"}
            {isRecording && (
              <span className="absolute top-0 right-0 h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </Button>
        </div>
        <Button onClick={handleProcess} className="min-w-[120px]">
          <Send className="h-4 w-4 mr-2" />
          Process
        </Button>
      </div>
    </div>
  );
};