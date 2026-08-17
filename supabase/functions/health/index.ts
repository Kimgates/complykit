// supabase/functions/health/index.ts
// Dev-only health check: verifies JWT, confirms ANTHROPIC_API_KEY secret exists,
// returns user ID. Does NOT call Anthropic.

import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Reject non-POST
  if (req.method !== 'POST') {
    return jsonResponse({ ok: false, error: 'Method not allowed' }, 405);
  }

  // Verify JWT: extract Authorization header and validate with Supabase
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return jsonResponse({ ok: false, error: 'Server misconfiguration' }, 500);
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(
    authHeader.replace('Bearer ', '')
  );

  if (authError || !user) {
    return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);
  }

  // Check ANTHROPIC_API_KEY secret exists (do NOT call the API)
  const hasKey = Boolean(Deno.env.get('ANTHROPIC_API_KEY'));

  return jsonResponse({
    ok: true,
    hasKey,
    user: user.id,
  });
});
