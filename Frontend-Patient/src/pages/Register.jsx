import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "../hooks/useForm";
import { authAPI } from "../services/api";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    aadhar: "",
    dob: "",
    role: "Patient"
  };

  const {
    values,
    errors,
    handleChange,
    setErrors
  } = useForm(initialState);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Name validation
    if (!values.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!values.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    // Email validation
    if (!values.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation
    if (!values.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(values.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    // Password validation
    if (!values.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Gender validation
    if (!values.gender) {
      newErrors.gender = "Please select your gender";
      isValid = false;
    }

    // Aadhar validation
    if (!values.aadhar) {
      newErrors.aadhar = "Aadhar number is required";
      isValid = false;
    } else if (!/^\d{12}$/.test(values.aadhar)) {
      newErrors.aadhar = "Please enter a valid 12-digit Aadhar number";
      isValid = false;
    }

    // Date of birth validation
    if (!values.dob) {
      newErrors.dob = "Date of birth is required";
      isValid = false;
    } else {
      const dobDate = new Date(values.dob);
      const today = new Date();
      if (dobDate > today) {
        newErrors.dob = "Date of birth cannot be in the future";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await authAPI.register(values);
      toast.success("Registration successful! Please log in.");
      navigateTo("/login");
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container form-component register-form">
      <div className="form-header">
        <h2>Create Account</h2>
        <p className="subtitle">Join Life Care Hospital</p>
      </div>

      <form onSubmit={handleRegister} className="auth-form">
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className={errors.firstName ? "error" : ""}
              autoComplete="given-name"
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className={errors.lastName ? "error" : ""}
              autoComplete="family-name"
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? "error" : ""}
              autoComplete="email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={errors.phone ? "error" : ""}
              autoComplete="tel"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={errors.password ? "error" : ""}
              autoComplete="new-password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? "error" : ""}
              autoComplete="new-password"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
        </div>

        <div className="show-password-toggle">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span>Show password</span>
          </label>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              className={errors.gender ? "error" : ""}
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="aadhar">Aadhar Number</label>
            <input
              id="aadhar"
              type="text"
              name="aadhar"
              value={values.aadhar}
              onChange={handleChange}
              placeholder="Enter your 12-digit Aadhar number"
              className={errors.aadhar ? "error" : ""}
              maxLength="12"
            />
            {errors.aadhar && <span className="error-message">{errors.aadhar}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              type="date"
              name="dob"
              value={values.dob}
              onChange={handleChange}
              className={errors.dob ? "error" : ""}
              max={new Date().toISOString().split("T")[0]}
            />
            {errors.dob && <span className="error-message">{errors.dob}</span>}
          </div>
        </div>

        <div className="form-footer">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
          
          <div className="login-prompt">
            <span>Already have an account?</span>
            <Link to="/login" className="login-link">
              Log in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
