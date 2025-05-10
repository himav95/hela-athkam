import { useState } from "react";

export const UserProfileValidation = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (!formData.phone.match(/^\+?[0-9\s-]+$/)) newErrors.phone = "Invalid phone";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log("Saved data:", formData); // Replace with API call
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
    setErrors({});
  };

  return {
    formData,
    isEditing,
    errors,
    success,
    handleChange,
    handleSave,
    handleCancel,
    setIsEditing,
  };
};