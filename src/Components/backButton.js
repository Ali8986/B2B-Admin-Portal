import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Importing the back arrow icon

const HeaderWithBackButton = ({ title, path }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (path) {
      navigate(path);
    } else {
      navigate(-1); // Navigate one step back if no path is provided
    }
  };

  return (
    <div className="col-12 d-flex align-items-center mb-4">
      <IconButton
        onClick={handleBackClick}
        style={{ color: "#7396cc" }} // Custom color for the icon
      >
        <ArrowBackIcon />
      </IconButton>
      <h2
        style={{
          color: "#7396cc",
          marginBottom: "5px",
        }}
        className="ms-2"
      >
        {title}
      </h2>
    </div>
  );
};

export default HeaderWithBackButton;