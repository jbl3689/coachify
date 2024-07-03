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
      events: {
        Row: {
          created_at: string
          event_date: string | null
          event_end_time: string | null
          event_start_time: string | null
          id: number
          week_id: number | null
        }
        Insert: {
          created_at?: string
          event_date?: string | null
          event_end_time?: string | null
          event_start_time?: string | null
          id?: number
          week_id?: number | null
        }
        Update: {
          created_at?: string
          event_date?: string | null
          event_end_time?: string | null
          event_start_time?: string | null
          id?: number
          week_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "events_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      eventsAttendance: {
        Row: {
          created_at: string
          event_id: number | null
          id: number
          isAttending: boolean | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          event_id?: number | null
          id?: number
          isAttending?: boolean | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          event_id?: number | null
          id?: number
          isAttending?: boolean | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "eventsAttendance_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventsAttendance_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          created_at: string
          event_id: number | null
          id: number
        }
        Insert: {
          created_at?: string
          event_id?: number | null
          id?: number
        }
        Update: {
          created_at?: string
          event_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "games_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: number
          location: string | null
          logo: string | null
          team_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          location?: string | null
          logo?: string | null
          team_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          location?: string | null
          logo?: string | null
          team_name?: string | null
        }
        Relationships: []
      }
      trainings: {
        Row: {
          created_at: string
          event_id: number | null
          id: number
        }
        Insert: {
          created_at?: string
          event_id?: number | null
          id?: number
        }
        Update: {
          created_at?: string
          event_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "trainings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          position_primary: string | null
          position_secondary: string | null
          role: string | null
          team_id: number | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          position_primary?: string | null
          position_secondary?: string | null
          role?: string | null
          team_id?: number | null
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          position_primary?: string | null
          position_secondary?: string | null
          role?: string | null
          team_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "users_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      weeks: {
        Row: {
          created_at: string
          id: number
          team_id: number | null
          week_end_date: string | null
          week_start_date: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          team_id?: number | null
          week_end_date?: string | null
          week_start_date?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          team_id?: number | null
          week_end_date?: string | null
          week_start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "weekSchedule_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
