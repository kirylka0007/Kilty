"use server";

import { createServerSupabase } from "@/lib/supabase/server-auth";

interface ProfileResult {
  success: boolean;
  error?: string;
}

export async function updateProfile(fullName: string): Promise<ProfileResult> {
  const name = fullName.trim();
  if (!name || name.length < 2) {
    return { success: false, error: "Name must be at least 2 characters." };
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "You must be signed in." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: name, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: "Failed to update profile." };
  }

  return { success: true };
}
