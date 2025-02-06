
import React, { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SendHorizontal, Paperclip } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MessageTemplate {
  id: string;
  title: string;
  content: string;
  category: string;
}

interface NewMessageDialogProps {
  templates?: MessageTemplate[];
  onClose: () => void;
  onMessageSent: () => void;
}

export const NewMessageDialog = ({ templates, onClose, onMessageSent }: NewMessageDialogProps) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"medical_inquiry" | "prescription_refill" | "appointment_scheduling" | "billing" | "other">("other");
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("low");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (messageId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('messageId', messageId);

    const { error } = await supabase.functions.invoke('upload-message-attachment', {
      body: formData,
    });

    if (error) {
      throw error;
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates?.find(t => t.id === templateId);
    if (template) {
      setContent(template.content);
      setCategory(template.category as typeof category);
    }
  };

  const handleSendMessage = async () => {
    if (!subject.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: message, error } = await supabase
        .from("messages")
        .insert({
          subject,
          content,
          category,
          urgency,
          provider_id: "00000000-0000-0000-0000-000000000000",
          user_id: (await supabase.auth.getUser()).data.user?.id,
          estimated_response_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      const files = fileInputRef.current?.files;
      if (files && files.length > 0) {
        await Promise.all(
          Array.from(files).map(file => handleFileUpload(message.id, file))
        );
      }

      toast({
        title: "Message sent",
        description: "Your provider will respond shortly",
      });

      onClose();
      onMessageSent();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Send Message to Provider</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 pt-4">
        {templates && templates.length > 0 && (
          <Select onValueChange={handleTemplateSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <Input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Select value={category} onValueChange={(value: typeof category) => setCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medical_inquiry">Medical Inquiry</SelectItem>
              <SelectItem value="prescription_refill">Prescription Refill</SelectItem>
              <SelectItem value="appointment_scheduling">Appointment Scheduling</SelectItem>
              <SelectItem value="billing">Billing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={urgency} onValueChange={(value: typeof urgency) => setUrgency(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          placeholder="Type your message here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px]"
        />
        <div className="space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            accept="image/*,.pdf,.doc,.docx"
          />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4 mr-2" />
            Attach Files
          </Button>
        </div>
        <Button
          className="w-full flex items-center gap-2"
          onClick={handleSendMessage}
        >
          <SendHorizontal className="h-4 w-4" />
          Send Message
        </Button>
      </div>
    </DialogContent>
  );
};
