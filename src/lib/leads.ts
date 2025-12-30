import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Validation schema for lead submission
const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 characters"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
  source: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export interface Lead {
  id: string;
  name: string;
  phone: string;
  message: string | null;
  source: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export async function submitLead(data: LeadInput): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate input
    const validated = leadSchema.parse(data);
    
    const { error } = await supabase
      .from('leads')
      .insert({
        name: validated.name,
        phone: validated.phone,
        message: validated.message || null,
        source: validated.source || 'contact_form',
      });

    if (error) {
      console.error('Error submitting lead:', error);
      return { success: false, error: 'Failed to submit. Please try again.' };
    }

    return { success: true };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0].message };
    }
    console.error('Unexpected error:', err);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

export async function fetchLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching leads:', error);
    return [];
  }

  return data as Lead[];
}

export async function updateLeadStatus(id: string, status: string): Promise<boolean> {
  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Error updating lead:', error);
    return false;
  }

  return true;
}

export async function updateLeadNotes(id: string, notes: string): Promise<boolean> {
  const { error } = await supabase
    .from('leads')
    .update({ notes })
    .eq('id', id);

  if (error) {
    console.error('Error updating lead notes:', error);
    return false;
  }

  return true;
}
