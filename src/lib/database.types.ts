export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Client: {
        Row: {
          id: string
          createdAt: string | null
          name: string | null
          email: string | null
          city: string | null
          state: string | null
          street: string | null
          zip: string | null
          status: string | null
          userId: string
        }
        Insert: {
          id?: string
          createdAt?: string | null
          name?: string | null
          email?: string | null
          city?: string | null
          state?: string | null
          street?: string | null
          zip?: string | null
          status?: string | null
          userId: string
        }
        Update: {
          id?: string
          createdAt?: string | null
          name?: string | null
          email?: string | null
          city?: string | null
          state?: string | null
          street?: string | null
          zip?: string | null
          status?: string | null
          userId?: string
        }
      }
      Invoice: {
        Row: {
          id: string
          createdAt: string | null
          issueDate: string | null
          dueDate: string | null
          invoiceNumber: number | null
          invoiceStatus: string | null
          notes: string | null
          subject: string | null
          terms: string | null
          clientId: string
          userId: string
        }
        Insert: {
          id?: string
          createdAt?: string | null
          issueDate?: string | null
          dueDate?: string | null
          invoiceNumber?: number | null
          invoiceStatus?: string | null
          notes?: string | null
          subject?: string | null
          terms?: string | null
          clientId: string
          userId: string
        }
        Update: {
          id?: string
          createdAt?: string | null
          issueDate?: string | null
          dueDate?: string | null
          invoiceNumber?: number | null
          invoiceStatus?: string | null
          notes?: string | null
          subject?: string | null
          terms?: string | null
          clientId?: string
          userId?: string
        }
      }
      LineItem: {
        Row: {
          id: string
          createdAt: string | null
          amount: number | null
          number: number | null
          description: string | null
          invoiceId: string
        }
        Insert: {
          id?: string
          createdAt?: string | null
          amount?: number | null
          number?: number | null
          description?: string | null
          invoiceId: string
        }
        Update: {
          id?: string
          createdAt?: string | null
          amount?: number | null
          number?: number | null
          description?: string | null
          invoiceId?: string
        }
      }
      Settings: {
        Row: {
          id: string
          createdAt: string | null
          city: string | null
          email: string | null
          myName: string | null
          state: string | null
          street: string | null
          zip: string | null
          userId: string
        }
        Insert: {
          id?: string
          createdAt?: string | null
          city?: string | null
          email?: string | null
          myName?: string | null
          state?: string | null
          street?: string | null
          zip?: string | null
          userId: string
        }
        Update: {
          id?: string
          createdAt?: string | null
          city?: string | null
          email?: string | null
          myName?: string | null
          state?: string | null
          street?: string | null
          zip?: string | null
          userId?: string
        }
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
  }
}
