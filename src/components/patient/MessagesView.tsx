
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { NewMessageDialog } from "./NewMessageDialog";
import { MessageCard } from "./MessageCard";

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
          <NewMessageDialog
            templates={templates}
            onClose={() => setIsOpen(false)}
            onMessageSent={refetch}
          />
        </Dialog>
      </div>

      <div className="space-y-4">
        {messages?.map((message) => (
          <MessageCard key={message.id} {...message} />
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
