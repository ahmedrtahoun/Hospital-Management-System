import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "../hooks/useForm";
import { authAPI } from "../services/api";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const navigateTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialState = {
    email: "",
    password: "",
    role: "Patient"
  };

  const {
    values,
    errors,
    handleChange,
    validateForm,
    setErrors
  } = useForm(initialState);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!values.email || !values.password) {
      setErrors({
        email: !values.email ? "Email is required" : "",
        password: !values.password ? "Password is required" : ""
      });
      toast.error("Please fill in all required fields");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      setErrors(prev => ({
        ...prev,
        email: "Please enter a valid email address"
      }));
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await authAPI.login(values);
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success("Welcome back!");
      navigateTo("/");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials and try again.";
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
    <div className="container form-component login-form">
      <div className="form-header">
        <h2>Login</h2>
        <p className="subtitle">Please login to continue</p>
        <p className="welcome-text">
          Welcome to Life Care. Access your appointments and stay connected with your healthcare provider.
        </p>
      </div>

      <form onSubmit={handleLogin} className="auth-form">
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
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? "error" : ""}
              autoComplete="current-password"
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
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
        </div>

        <div className="form-footer">
          <button 
            type="submit" 
            className="submit-button" 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          
          <div className="register-prompt">
            <span>Not registered yet?</span>
            <Link to="/register" className="register-link">
              Create an account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
