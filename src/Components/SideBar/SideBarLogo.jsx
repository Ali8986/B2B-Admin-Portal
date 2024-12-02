// Logo.js
import React from "react";
import logo from "../../Assets/Images/logo.png"; // Replace with actual logo path

const Logo = () => (
  <div style={{ padding: "30px", textAlign: "center" }}>
    <img
      src={logo}
      alt="Logo"
      style={{ width: "70px", height: "auto" }} // Adjust size as needed
    />
  </div>
);

export default Logo;
