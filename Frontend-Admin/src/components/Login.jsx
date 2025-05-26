import { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "./loading";
import { toast } from "react-toastify";
import { authAPI } from "../services/api";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.login({ email, password, role: "Admin" });

      // Set user data first
      setUser(response.data.user);
      
      // Then set authentication state
      setIsAuthenticated(true);
      
      // Show success message
      toast.success(response.data.message);
      
      // Finally navigate
      navigateTo("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during login."
      );
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      {loading && <Loading />}
      <div className="container form-component">
        <img src="/logo.png" alt="Life Care" className="logo" />
        <h1 className="form-title">Welcome to Life Care</h1>
        <p>Only Admins are allowed to access these resources!</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
