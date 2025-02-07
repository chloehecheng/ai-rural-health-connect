export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      health_metrics: {
        Row: {
          id: string
          metric_type: string
          notes: string | null
          recorded_at: string | null
          unit: string
          user_id: string
          value: number
        }
        Insert: {
          id?: string
          metric_type: string
          notes?: string | null
          recorded_at?: string | null
          unit: string
          user_id: string
          value: number
        }
        Update: {
          id?: string
          metric_type?: string
          notes?: string | null
          recorded_at?: string | null
          unit?: string
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      medication_deliveries: {
        Row: {
          actual_delivery_time: string | null
          created_at: string | null
          delivery_address: string
          delivery_status: string | null
          id: string
          medication_id: string
          preferred_delivery_time: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actual_delivery_time?: string | null
          created_at?: string | null
          delivery_address: string
          delivery_status?: string | null
          id?: string
          medication_id: string
          preferred_delivery_time?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actual_delivery_time?: string | null
          created_at?: string | null
          delivery_address?: string
          delivery_status?: string | null
          id?: string
          medication_id?: string
          preferred_delivery_time?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medication_deliveries_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          created_at: string | null
          dosage: string
          frequency: string
          id: string
          medication_name: string
          prescribed_date: string | null
          refill_date: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          dosage: string
          frequency: string
          id?: string
          medication_name: string
          prescribed_date?: string | null
          refill_date?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          dosage?: string
          frequency?: string
          id?: string
          medication_name?: string
          prescribed_date?: string | null
          refill_date?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      message_attachments: {
        Row: {
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          message_id: string | null
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          message_id?: string | null
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      message_notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message_id: string | null
          recipient_id: string
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message_id?: string | null
          recipient_id: string
          type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message_id?: string | null
          recipient_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_notifications_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      message_templates: {
        Row: {
          category: Database["public"]["Enums"]["message_category"]
          content: string
          created_at: string | null
          id: string
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["message_category"]
          content: string
          created_at?: string | null
          id?: string
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["message_category"]
          content?: string
          created_at?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          attachment_url: string | null
          category: Database["public"]["Enums"]["message_category"] | null
          content: string
          created_at: string | null
          estimated_response_time: string | null
          id: string
          is_read: boolean | null
          provider_id: string
          read_at: string | null
          responded_at: string | null
          subject: string | null
          urgency: Database["public"]["Enums"]["message_urgency"] | null
          user_id: string
        }
        Insert: {
          attachment_url?: string | null
          category?: Database["public"]["Enums"]["message_category"] | null
          content: string
          created_at?: string | null
          estimated_response_time?: string | null
          id?: string
          is_read?: boolean | null
          provider_id: string
          read_at?: string | null
          responded_at?: string | null
          subject?: string | null
          urgency?: Database["public"]["Enums"]["message_urgency"] | null
          user_id: string
        }
        Update: {
          attachment_url?: string | null
          category?: Database["public"]["Enums"]["message_category"] | null
          content?: string
          created_at?: string | null
          estimated_response_time?: string | null
          id?: string
          is_read?: boolean | null
          provider_id?: string
          read_at?: string | null
          responded_at?: string | null
          subject?: string | null
          urgency?: Database["public"]["Enums"]["message_urgency"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_provider"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      otp: {
        Row: {
          id: number
          phone: number
        }
        Insert: {
          id?: number
          phone: number
        }
        Update: {
          id?: number
          phone?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          phone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          phone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      "rural health": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      message_category:
        | "medical_inquiry"
        | "prescription_refill"
        | "appointment_scheduling"
        | "billing"
        | "other"
      message_urgency: "low" | "medium" | "high"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
