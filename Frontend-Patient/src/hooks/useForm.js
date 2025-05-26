import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields
    Object.keys(values).forEach(key => {
      if (key !== 'role' && !values[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    // Validate email format
    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Set any validation errors
    setErrors(newErrors);
    
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (submitFunction) => {
    if (!validateForm()) {
      return false;
    }

    try {
      await submitFunction(values);
      return true;
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
      throw error; // Re-throw to handle in component
    }
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    validateForm,
    resetForm,
    setErrors,
  };
}; 