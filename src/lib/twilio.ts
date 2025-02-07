const TWILIO_ACCOUNT_SID = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
const TWILIO_VERIFY_SERVICE_SID = import.meta.env.VITE_TWILIO_VERIFY_SERVICE_SID;

// Test verification codes
const TEST_VERIFICATION_CODES = ['000000', '111111', '999999'];

// Function to start the verification process
export const sendVerificationCode = async (phoneNumber: string) => {
  try {
    console.log('Sending verification to:', phoneNumber);
    console.log('Using Verify Service SID:', TWILIO_VERIFY_SERVICE_SID);

    // For test numbers (starting with +1555), just return success
    if (phoneNumber.startsWith('+1555') && phoneNumber.length === 12) {
      console.log('Test mode detected. Valid test codes:', TEST_VERIFICATION_CODES);
      return { 
        data: {
          status: 'pending',
          to: phoneNumber
        }, 
        error: null 
      };
    }
    
    const response = await fetch(
      `https://verify.twilio.com/v2/Services/${TWILIO_VERIFY_SERVICE_SID}/Verifications`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
        },
        body: new URLSearchParams({
          To: phoneNumber,
          Channel: 'sms'
        }).toString(),
      }
    );

    const data = await response.json();
    console.log('Twilio send response:', data);

    if (!response.ok) {
      console.error('Error response:', data);
      throw new Error(data.message || 'Failed to send verification code');
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error sending verification code:', error);
    return { data: null, error };
  }
};

// Function to check the verification code
export const verifyCode = async (phoneNumber: string, code: string) => {
  try {
    console.log('Verifying code for:', phoneNumber);
    console.log('Code to verify:', code);

    // For test numbers, accept any of the test codes
    if (phoneNumber.startsWith('+1555') && phoneNumber.length === 12 && TEST_VERIFICATION_CODES.includes(code)) {
      console.log('Test mode: Using valid test code');
      return {
        data: {
          status: 'approved',
          valid: true,
          to: phoneNumber,
        },
        error: null
      };
    }
    
    const response = await fetch(
      `https://verify.twilio.com/v2/Services/${TWILIO_VERIFY_SERVICE_SID}/VerificationCheck`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
        },
        body: new URLSearchParams({
          To: phoneNumber,
          Code: code
        }).toString(),
      }
    );

    const data = await response.json();
    console.log('Twilio verify response:', data);

    if (!response.ok) {
      console.error('Error response:', data);
      throw new Error(data.message || 'Failed to verify code');
    }

    return { 
      data: {
        ...data,
        valid: data.status === 'approved'
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Error verifying code:', error);
    return { data: null, error };
  }
};
