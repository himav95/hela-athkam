import { useState, useEffect } from 'react';
import { userService } from '../../Services/apiService';

// Validation functions
const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  if (name.length > 50) {
    return 'Name must be less than 50 characters';
  }
  return null;
};

const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Invalid email format';
  }
  return null;
};

const validatePhone = (phone) => {
  if (!phone) {
    return null; // Phone is optional
  }
  if (!/^[\+]?[\d\s\-\(\)]{10,20}$/.test(phone)) {
    return 'Invalid phone number format';
  }
  return null;
};

const validateAddress = (address) => {
  if (address && address.length > 500) {
    return 'Address must be less than 500 characters';
  }
  return null;
};

export const UserProfileValidation = (initialData = {}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    ...initialData
  });

  const [originalData, setOriginalData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch user profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setFetchLoading(true);
      const response = await userService.getProfile();

      if (response.data.success) {
        const userData = response.data.user;
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || ''
        });
        setOriginalData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setErrors({ general: 'Failed to load profile data' });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear success message when editing
    if (success) {
      setSuccess('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    newErrors.name = validateName(formData.name);
    newErrors.email = validateEmail(formData.email);
    newErrors.phone = validatePhone(formData.phone);
    newErrors.address = validateAddress(formData.address);

    // Remove null errors
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const response = await userService.updateProfile(formData);

      if (response.data.success) {
        setSuccess('Profile updated successfully!');
        setOriginalData({ ...formData });
        setIsEditing(false);

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);

      if (error.response?.data?.errors) {
        // Handle validation errors from backend
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general: error.response?.data?.message || 'Failed to update profile'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setErrors({});
    setSuccess('');
    setIsEditing(false);
  };

  const hasChanges = () => {
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  };

  return {
    formData,
    isEditing,
    errors,
    success,
    loading,
    fetchLoading,
    handleChange,
    handleSave,
    handleCancel,
    setIsEditing,
    hasChanges: hasChanges()
  };
};