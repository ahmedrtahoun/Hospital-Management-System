import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { authAPI } from "../services/api";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await authAPI.logout();
      toast.success(data.message || "Logged out successfully");
      setIsAuthenticated(false);
      setUser(null);
      navigateTo("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  const gotoLogin = () => {
    navigateTo("/login");
    setShow(false);
  };

  const handleNavClick = (path) => {
    navigateTo(path);
    setShow(false);
  };

  return (
    <nav className="container">
      <div className="logo">
        <img 
          src="/logo.png" 
          alt="Life Care Hospital" 
          className="logo-img" 
          onClick={() => handleNavClick("/")}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to="/" onClick={() => setShow(false)}>Home</Link>
          <Link to="/appointment" onClick={() => setShow(false)}>Appointment</Link>
          <Link to="/about" onClick={() => setShow(false)}>About Us</Link>
        </div>
        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="logoutBtn btn" onClick={gotoLogin}>
            Login
          </button>
        )}
      </div>
      <button 
        className="hamburger" 
        onClick={() => setShow(!show)}
        aria-label={show ? "Close menu" : "Open menu"}
      >
        {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </button>
    </nav>
  );
};

export default Navbar;
