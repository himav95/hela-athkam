// Login validation script for the login form is here.

export const  validateLogin = (email, password) => {
  if (!email || !password) return 'Email and Password are required.';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format.';
  if(password.length < 6) return 'Password must be at least 6 characters.';
  return null; // meaning no errors found.
};

