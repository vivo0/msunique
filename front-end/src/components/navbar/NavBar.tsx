import React from "react";
import logo from "../../assets/logo.png";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import profile from "../../assets/profile.jpg";
import "./navbar.css";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          F<span style={{ color: "#e33900" }}>AI</span>nalyst
        </div>
      </div>
      <div className="navbar-right">
        <SettingsSuggestIcon />
        <div className="profile-pic">
          <img src={profile} alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
