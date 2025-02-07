import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { Twilio } from 'https://deno.land/x/twilio@0.1.1/mod.ts';

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { phoneNumber, message } = await req.json();

    // Initialize Twilio client
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const fromNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

    if (!accountSid || !authToken || !fromNumber) {
      throw new Error('Missing Twilio environment variables');
    }

    const client = new Twilio(accountSid, authToken);

    // Send SMS
    const response = await client.messages.create({
      body: message,
      from: fromNumber,
      to: phoneNumber,
    });

    return new Response(
      JSON.stringify({ success: true, messageId: response.sid }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});
