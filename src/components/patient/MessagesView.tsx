
import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SendHorizontal, Plus, Paperclip, AlertCircle, Clock } from "lucide-react";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  subject: string;
  content: string;
  created_at: string;
  is_read: boolean;
  category: 'medical_inquiry' | 'prescription_refill' | 'appointment_scheduling' | 'billing' | 'other';
  urgency: 'low' | 'medium' | 'high';
  estimated_response_time: string | null;
  read_at: string | null;
  responded_at: string | null;
  provider: {
    full_name: string | null;
  };
  attachments: {
    id: string;
    file_name: string;
    file_type: string;
    file_path: string;
  }[];
}

interface MessageTemplate {
  id: string;
  title: string;
  content: string;
  category: string;
}

export const MessagesView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Message["category"]>("other");
  const [urgency, setUrgency] = useState<Message["urgency"]>("low");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: messages, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select(`
          id,
          subject,
          content,
          created_at,
          is_read,
          category,
          urgency,
          estimated_response_time,
          read_at,
          responded_at,
          provider:profiles!fk_provider (full_name),
          attachments:message_attachments (
            id,
            file_name,
            file_type,
            file_path
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Message[];
    },
  });

  const { data: templates } = useQuery({
    queryKey: ["messageTemplates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("message_templates")
        .select("*");

      if (error) throw error;
      return data as MessageTemplate[];
    },
  });

  const handleTemplateSelect = (templateId: string) => {
    const template = templates?.find(t => t.id === templateId);
    if (template) {
      setContent(template.content);
      setCategory(template.category as Message["category"]);
    }
  };

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
          provider_id: "00000000-0000-0000-0000-000000000000", // This should be replaced with actual provider ID
          user_id: (await supabase.auth.getUser()).data.user?.id,
          estimated_response_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Default 24h response time
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

      setIsOpen(false);
      setSubject("");
      setContent("");
      setCategory("other");
      setUrgency("low");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      refetch();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getUrgencyColor = (urgency: Message["urgency"]) => {
    switch (urgency) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  const downloadAttachment = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('message_attachments')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Error downloading file",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Messages</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Message
            </Button>
          </DialogTrigger>
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
                <Select value={category} onValueChange={(value: Message["category"]) => setCategory(value)}>
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
                <Select value={urgency} onValueChange={(value: Message["urgency"]) => setUrgency(value)}>
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
        </Dialog>
      </div>

      <div className="space-y-4">
        {messages?.map((message) => (
          <DashboardCard key={message.id} title={message.subject}>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>To: {message.provider?.full_name || "Provider"}</span>
                  <Badge className={getUrgencyColor(message.urgency)}>
                    {message.urgency.charAt(0).toUpperCase() + message.urgency.slice(1)} Priority
                  </Badge>
                  <Badge variant="outline">
                    {message.category.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {message.estimated_response_time && (
                    <div className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Est. Response: {new Date(message.estimated_response_time).toLocaleDateString()}
                    </div>
                  )}
                  <span>
                    {new Date(message.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {message.attachments && message.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {message.attachments.map((attachment) => (
                    <Button
                      key={attachment.id}
                      variant="outline"
                      size="sm"
                      onClick={() => downloadAttachment(attachment.file_path, attachment.file_name)}
                      className="text-xs"
                    >
                      <Paperclip className="h-3 w-3 mr-1" />
                      {attachment.file_name}
                    </Button>
                  ))}
                </div>
              )}
              {message.read_at && (
                <div className="text-xs text-muted-foreground">
                  Read: {new Date(message.read_at).toLocaleString()}
                </div>
              )}
            </div>
          </DashboardCard>
        ))}
        {(!messages || messages.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">
            No messages yet
          </div>
        )}
      </div>
    </div>
  );
};
