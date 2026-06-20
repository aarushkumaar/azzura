// Supabase CDN client — ESM module
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ⚠️ DEVELOPER: Replace these with your actual Supabase project credentials
// Go to: https://supabase.com → Your Project → Settings → API
const SUPABASE_URL = 'YOUR_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
