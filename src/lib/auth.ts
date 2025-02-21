export const isLoggedIn = () => {
  const phoneNumber = localStorage.getItem('phoneNumber');
  const verifiedAt = localStorage.getItem('verifiedAt');
  return phoneNumber && verifiedAt;
};

export const getPhoneNumber = () => {
  return localStorage.getItem('phoneNumber');
};

export const logout = () => {
  localStorage.removeItem('phoneNumber');
  localStorage.removeItem('verifiedAt');
};

interface Provider {
  email: string;
  id: string;
  name: string;
}

interface ProviderAuth {
  provider: Provider | null;
  isAuthenticated: boolean;
  requires2FA: boolean;
}

// Store the current provider authentication state
let currentProviderAuth: ProviderAuth = {
  provider: null,
  isAuthenticated: false,
  requires2FA: false,
};

export const authenticateProvider = async (email: string, password: string): Promise<ProviderAuth> => {
  // TODO: Replace with actual API call to authenticate provider
  // This is a mock implementation
  if (email && password) {
    currentProviderAuth = {
      provider: {
        email,
        id: '123',
        name: 'Dr. Smith',
      },
      isAuthenticated: false,
      requires2FA: true,
    };
    return currentProviderAuth;
  }
  throw new Error('Invalid credentials');
};

export const verify2FA = async (code: string): Promise<ProviderAuth> => {
  // TODO: Replace with actual API call to verify 2FA code
  // This is a mock implementation
  if (currentProviderAuth.provider && code) {
    currentProviderAuth = {
      ...currentProviderAuth,
      isAuthenticated: true,
      requires2FA: false,
    };
    localStorage.setItem('provider', JSON.stringify(currentProviderAuth.provider));
    localStorage.setItem('providerAuthTime', new Date().toISOString());
    return currentProviderAuth;
  }
  throw new Error('Invalid verification code');
};

export const isProviderLoggedIn = (): boolean => {
  const provider = localStorage.getItem('provider');
  const authTime = localStorage.getItem('providerAuthTime');
  if (!provider || !authTime) return false;
  
  // Session expires after 12 hours
  const expirationTime = new Date(authTime).getTime() + (12 * 60 * 60 * 1000);
  if (new Date().getTime() > expirationTime) {
    logoutProvider();
    return false;
  }
  
  return true;
};

export const logoutProvider = () => {
  localStorage.removeItem('provider');
  localStorage.removeItem('providerAuthTime');
  currentProviderAuth = {
    provider: null,
    isAuthenticated: false,
    requires2FA: false,
  };
};
