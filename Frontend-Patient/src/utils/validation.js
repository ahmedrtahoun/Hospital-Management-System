// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const validateAadhar = (aadhar) => {
  const aadharRegex = /^[0-9]{12}$/;
  return aadharRegex.test(aadhar);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const validateDate = (date) => {
  const selectedDate = new Date(date);
  const today = new Date();
  return selectedDate >= today;
};

export const validateName = (name) => {
  return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

// Error messages
export const getErrorMessage = (field, value) => {
  switch (field) {
    case 'email':
      return !validateEmail(value) ? 'Please enter a valid email address' : '';
    case 'phone':
      return !validatePhone(value) ? 'Please enter a valid 10-digit phone number' : '';
    case 'aadhar':
      return !validateAadhar(value) ? 'Please enter a valid 12-digit Aadhar number' : '';
    case 'password':
      return !validatePassword(value) ? 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number' : '';
    case 'name':
      return !validateName(value) ? 'Name must be at least 2 characters and contain only letters' : '';
    case 'date':
      return !validateDate(value) ? 'Please select a future date' : '';
    default:
      return '';
  }
}; 