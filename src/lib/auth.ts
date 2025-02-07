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
