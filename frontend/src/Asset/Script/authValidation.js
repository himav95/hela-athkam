// Login validation script for the login form is here.

export const  validateLogin = (email, password) => {
  if (!email || !password) return 'Email and Password are required.';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format.';
  if(password.length < 6) return 'Password must be at least 6 characters.';
  return null; // meaning no errors found.
};

// Sign up validation script for the sign up form is here.
export const validateSignUp = (name, email, password, confirmPassword) => {
  if (!name || !email || !password || !confirmPassword) {
    return 'All fields are required.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  return null; // No errors
};