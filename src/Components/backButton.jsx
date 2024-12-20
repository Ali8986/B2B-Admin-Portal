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
          path && !main
            ? "col-12 ps-1 d-flex align-items-center mb-4"
            : "d-flex"
        }
      >
        {path ? (
          <IconButton
            onClick={handleBackClick}
            style={{ color: "#7396cc" }} // Custom color for the icon
          >
            <ArrowBackIcon />
          </IconButton>
        ) : null}
        <h2
          style={{
            color: "#7396cc",
            marginBottom: "0px",
          }}
          className='ms-0'
        >
          {title}
        </h2>
      </div>
    </>
  );
};

export default HeaderWithBackButton;
