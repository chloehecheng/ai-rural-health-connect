
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Clock } from "lucide-react";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MessageAttachment {
  id: string;
  file_name: string;
  file_type: string;
  file_path: string;
}

interface MessageCardProps {
  id: string;
  subject: string;
  content: string;
  created_at: string;
  category: 'medical_inquiry' | 'prescription_refill' | 'appointment_scheduling' | 'billing' | 'other';
  urgency: 'low' | 'medium' | 'high';
  estimated_response_time: string | null;
  read_at: string | null;
  responded_at: string | null;
  provider: {
    full_name: string | null;
  };
  attachments: MessageAttachment[];
}

export const MessageCard = ({ 
  subject,
  content,
  created_at,
  category,
  urgency,
  estimated_response_time,
  read_at,
  provider,
  attachments
}: MessageCardProps) => {
  const { toast } = useToast();

  const getUrgencyColor = (urgency: MessageCardProps["urgency"]) => {
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
    <DashboardCard title={subject}>
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>To: {provider?.full_name || "Provider"}</span>
            <Badge className={getUrgencyColor(urgency)}>
              {urgency.charAt(0).toUpperCase() + urgency.slice(1)} Priority
            </Badge>
            <Badge variant="outline">
              {category.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {estimated_response_time && (
              <div className="flex items-center text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Est. Response: {new Date(estimated_response_time).toLocaleDateString()}
              </div>
            )}
            <span>
              {new Date(created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        {attachments && attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {attachments.map((attachment) => (
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
        {read_at && (
          <div className="text-xs text-muted-foreground">
            Read: {new Date(read_at).toLocaleString()}
          </div>
        )}
      </div>
    </DashboardCard>
  );
};
