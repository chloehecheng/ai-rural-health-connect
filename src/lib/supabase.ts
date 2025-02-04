import { createClient } from '@supabase/supabase-js';

// These values are automatically injected by Lovable when connected to Supabase
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);