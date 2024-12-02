import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Importing the back arrow icon

const HeaderWithBackButton = ({ title, path, main = false }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (path && path !== "empty") {
      navigate(path);
    } else if (path === "empty") {
      navigate(-1); // Navigate one step back if no path is provided
    }
  };

  return (
    <>
      <div
        className={
          path && !main ? "col-6 ps-1 d-flex align-items-center" : "d-flex"
        }
      >
        {path ? (
          <IconButton
            onClick={handleBackClick}
            style={{ color: "#006599" }} // Custom color for the icon
          >
            <ArrowBackIcon />
          </IconButton>
        ) : null}
        <h2
          style={{
            color: "#006599",
            marginBottom: "0px",
          }}
          className="ms-0"
        >
          {title}
        </h2>
      </div>
    </>
  );
};

export default HeaderWithBackButton;
