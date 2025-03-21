import { createClient } from '@supabase/supabase-js';


const isServer = typeof window === "undefined";

if (isServer) {
  const dotenv = await import("dotenv");
  dotenv.config();
}

const supabaseUrl = isServer ? process.env.VITE_SUPABASE_URL : import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = isServer ? process.env.VITE_SUPABASE_ANON_KEY : import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});

// Function to sign in with phone
export const signInWithPhone = async (phoneNumber: string) => {
  console.log('Attempting to sign in with phone:', phoneNumber);
  return await supabase.auth.signInWithOtp({
    phone: phoneNumber,
    options: {
      channel: 'sms'
    }
  });
};

// Function to verify phone OTP
export const verifyPhoneOTP = async (phoneNumber: string, token: string) => {
  console.log('Attempting to verify OTP for:', phoneNumber);
  return await supabase.auth.verifyOtp({
    phone: phoneNumber,
    token,
    type: 'sms'
  });
};