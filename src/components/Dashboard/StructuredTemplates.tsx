import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

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

export const StructuredTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    setNoteContent(TEMPLATES[value as keyof typeof TEMPLATES].template);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select onValueChange={handleTemplateChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(TEMPLATES).map(([key, { name }]) => (
              <SelectItem key={key} value={key}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline">Save Template</Button>
      </div>
      <Textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        className="min-h-[300px]"
        placeholder="Select a template or start typing..."
      />
    </div>
  );
};