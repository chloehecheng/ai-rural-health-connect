import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lsspifbdaqwclzutcpck.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzc3BpZmJkYXF3Y2x6dXRjcGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3MDkzNDEsImV4cCI6MjA1NDI4NTM0MX0.DLyD3vfyxptthl_L-W3rG_R0mW4ELOyX4iZbp4Cfxos';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);