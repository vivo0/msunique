import React from "react";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.jpg";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img
            src={logo}
            onClick={() => navigate("/")}
            alt="Logo"
            style={{ cursor: "pointer" }}
          />
        </div>
        <div
          onClick={() => navigate("/")}
          style={{ fontSize: "24px", fontWeight: "bold", cursor: "pointer" }}
        >
          F<span style={{ color: "#e33900" }}>AI</span>nalyst
        </div>
      </div>
      <div className="navbar-right">
        <div className="profile-pic">
          <img src={profile} alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
