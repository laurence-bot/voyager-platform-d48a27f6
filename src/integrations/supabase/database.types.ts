// Manually maintained Supabase types (schema mirrored from the external project).
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_slot: string
          contact_mode: string
          created_at: string
          destination: string | null
          email: string
          full_name: string
          id: string
          message: string | null
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_slot: string
          contact_mode?: string
          created_at?: string
          destination?: string | null
          email: string
          full_name: string
          id?: string
          message?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_slot?: string
          contact_mode?: string
          created_at?: string
          destination?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_requests: {
        Row: {
          budget: string
          created_at: string
          destination: string
          email: string
          id: string
          ip_hash: string | null
          message: string
          name: string
          period: string
          phone: string | null
          status: string
          travelers: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          budget: string
          created_at?: string
          destination: string
          email: string
          id?: string
          ip_hash?: string | null
          message: string
          name: string
          period: string
          phone?: string | null
          status?: string
          travelers: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          budget?: string
          created_at?: string
          destination?: string
          email?: string
          id?: string
          ip_hash?: string | null
          message?: string
          name?: string
          period?: string
          phone?: string | null
          status?: string
          travelers?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          created_at: string
          id: string
          invoice_number: string
          issued_at: string
          pdf_path: string | null
          trip_id: string | null
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          invoice_number: string
          issued_at?: string
          pdf_path?: string | null
          trip_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          invoice_number?: string
          issued_at?: string
          pdf_path?: string | null
          trip_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          birth_date: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          first_name: string | null
          id: string
          last_name: string | null
          nationality: string | null
          notes: string | null
          passport_expiry: string | null
          passport_number: string | null
          phone: string | null
          postal_code: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          nationality?: string | null
          notes?: string | null
          passport_expiry?: string | null
          passport_number?: string | null
          phone?: string | null
          postal_code?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          nationality?: string | null
          notes?: string | null
          passport_expiry?: string | null
          passport_number?: string | null
          phone?: string | null
          postal_code?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      trip_documents: {
        Row: {
          category: string
          created_at: string
          file_name: string
          file_path: string
          id: string
          title: string
          trip_id: string
          user_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          file_name: string
          file_path: string
          id?: string
          title: string
          trip_id: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          file_name?: string
          file_path?: string
          id?: string
          title?: string
          trip_id?: string
          user_id?: string
        }
        Relationships: []
      }
      trips: {
        Row: {
          amount: number | null
          created_at: string
          destination: string
          end_date: string | null
          id: string
          notes: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["trip_status"]
          title: string
          travelers: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          destination: string
          end_date?: string | null
          id?: string
          notes?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["trip_status"]
          title: string
          travelers?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          destination?: string
          end_date?: string | null
          id?: string
          notes?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["trip_status"]
          title?: string
          travelers?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "customer" | "agence"
      trip_status: "devis" | "confirme" | "en_cours" | "termine" | "annule"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "customer", "agence"],
      trip_status: ["devis", "confirme", "en_cours", "termine", "annule"],
    },
  },
} as const
