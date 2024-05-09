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
      attempts: {
        Row: {
          id: number
          quizId: number | null
          score: number | null
          userId: number | null
        }
        Insert: {
          id: number
          quizId?: number | null
          score?: number | null
          userId?: number | null
        }
        Update: {
          id?: number
          quizId?: number | null
          score?: number | null
          userId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "attempts_quizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attempts_quizId_fkey1"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          added_by_user: number | null
          answer_options: string[] | null
          category: string | null
          correct_answer: string | null
          created_at: string | null
          id: number
          imageurl: string | null
          question: string | null
        }
        Insert: {
          added_by_user?: number | null
          answer_options?: string[] | null
          category?: string | null
          correct_answer?: string | null
          created_at?: string | null
          id?: number
          imageurl?: string | null
          question?: string | null
        }
        Update: {
          added_by_user?: number | null
          answer_options?: string[] | null
          category?: string | null
          correct_answer?: string | null
          created_at?: string | null
          id?: number
          imageurl?: string | null
          question?: string | null
        }
        Relationships: []
      }
      quizQuestionLink: {
        Row: {
          questionId: number
          quizId: number
        }
        Insert: {
          questionId: number
          quizId: number
        }
        Update: {
          questionId?: number
          quizId?: number
        }
        Relationships: [
          {
            foreignKeyName: "quizQuestionLink_questionId_fkey"
            columns: ["questionId"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizQuestionLink_quizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizResponses: {
        Row: {
          answer_selected: string | null
          correct: number | null
          id: number
          questionId: number | null
          quizId: number | null
          userId: number | null
        }
        Insert: {
          answer_selected?: string | null
          correct?: number | null
          id: number
          questionId?: number | null
          quizId?: number | null
          userId?: number | null
        }
        Update: {
          answer_selected?: string | null
          correct?: number | null
          id?: number
          questionId?: number | null
          quizId?: number | null
          userId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quizResponses_quizId_questionId_fkey"
            columns: ["quizId", "questionId"]
            isOneToOne: false
            referencedRelation: "quizQuestionLink"
            referencedColumns: ["quizId", "questionId"]
          },
          {
            foreignKeyName: "quizResponses_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          collection: string | null
          id: number
          title: string | null
        }
        Insert: {
          collection?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          collection?: string | null
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          createdAt: string | null
          id: number
          username: string | null
        }
        Insert: {
          createdAt?: string | null
          id: number
          username?: string | null
        }
        Update: {
          createdAt?: string | null
          id?: number
          username?: string | null
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
