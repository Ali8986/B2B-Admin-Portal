// SidebarOption.js
import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const SidebarOption = ({ option, handleMobileViewChange }) => {
  const location = useLocation();

  return (
    <ListItem disablePadding className="position-relative">
      {option.badge && (
        <div className="rounded-circle bg-primary  ms-2 mt-1  p-1 position-absolute start-50 top-0"></div>
      )}
      <ListItemButton
        className={
          location.pathname.includes(option.path)
            ? "active-tab side-bar-btn"
            : "side-bar-btn"
        }
        component={Link}
        to={option.path}
        onClick={handleMobileViewChange}
      >
        <ListItemIcon>{option.icon}</ListItemIcon>
        <ListItemText primary={option.title} />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarOption;
