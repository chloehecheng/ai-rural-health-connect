
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Plus } from "lucide-react";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Message {
  id: string;
  subject: string;
  content: string;
  created_at: string;
  is_read: boolean;
  provider: {
    full_name: string | null;
  };
}

export const MessagesView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
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
          provider:profiles!fk_provider (full_name)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data as Message[];
    },
  });

  const handleSendMessage = async () => {
    if (!subject.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("messages").insert({
      subject,
      content,
      provider_id: "00000000-0000-0000-0000-000000000000", // This should be replaced with actual provider ID
      user_id: (await supabase.auth.getUser()).data.user?.id,
    });

    if (error) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message sent",
      description: "Your provider will respond shortly",
    });

    setIsOpen(false);
    setSubject("");
    setContent("");
    refetch();
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Message to Provider</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <Textarea
                placeholder="Type your message here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px]"
              />
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
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>To: {message.provider?.full_name || "Provider"}</span>
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
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
