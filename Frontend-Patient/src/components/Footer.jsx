import React from "react";
import { Link } from "react-router-dom";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaInstagramSquare } from "react-icons/fa";
import { RxLinkedinLogo } from "react-icons/rx";
import { IoGlobeOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="container">
      <hr />
      <div className="content">
        <div>
          <img src="/logo.png" alt="logo" className="logo-img" />
          <p>
            Providing quality healthcare services with compassion and excellence.
          </p>
          <div className="social-icons">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagramSquare />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <RxLinkedinLogo />
            </a>
            <a href="https://lifecare.com" target="_blank" rel="noopener noreferrer">
              <IoGlobeOutline />
            </a>
          </div>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <Link to="/">Home</Link>
            <Link to="/appointment">Appointment</Link>
            <Link to="/about">About Us</Link>
          </ul>
        </div>

        <div>
          <h4>Contact Info</h4>
          <ul>
            <li>
              <span><FaLocationDot /> Address:</span>
              <span>123 Healthcare Ave, Medical District</span>
            </li>
            <li>
              <span><FaPhone /> Phone:</span>
              <span>+1 (555) 123-4567</span>
            </li>
            <li>
              <span><MdEmail /> Email:</span>
              <span>contact@lifecare.com</span>
            </li>
          </ul>
        </div>

        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Life Care Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
