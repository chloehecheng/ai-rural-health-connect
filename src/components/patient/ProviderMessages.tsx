
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCard } from "./MessageCard";
import { NewProviderMessageDialog } from "./NewProviderMessageDialog";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface ProviderMessagesProps {
  providerId: string;
  patientId: string;
}

export const ProviderMessages = ({ providerId, patientId }: ProviderMessagesProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select(`
          *,
          provider:profiles!provider_id(full_name),
          attachments:message_attachments(*)
        `)
        .eq("provider_id", providerId)
        .eq("user_id", patientId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      toast({
        title: "Error fetching messages",
        description: "Failed to load messages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel("provider-messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `provider_id=eq.${providerId}`,
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    fetchMessages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [providerId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Messages</h2>
        <NewProviderMessageDialog
          providerId={providerId}
          patientId={patientId}
          onMessageSent={fetchMessages}
        />
      </div>
      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No messages yet. Start a conversation with your patient.
          </p>
        ) : (
          messages.map((message) => (
            <MessageCard key={message.id} {...message} />
          ))
        )}
      </div>
    </div>
  );
};
