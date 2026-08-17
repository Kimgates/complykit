import { supabase } from '@/lib/supabase/client';

export interface HealthCheckResult {
  ok: boolean;
  hasKey: boolean;
  user: string;
  error?: string;
}

/**
 * Calls the Supabase Edge Function 'health' with the current user's
 * access token. Returns the health check result or an error object.
 */
export async function callHealth(): Promise<HealthCheckResult> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('No active session. Sign in first.');
  }

  const { data, error } = await supabase.functions.invoke('health', {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) {
    throw error;
  }

  return data as HealthCheckResult;
}

