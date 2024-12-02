import { AppBar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import ProfileIcon from "../../Components/AppHeader/ProfileIcon";

const AppHeader = ({ handleDrawerToggle, drawerWidth, PageName }) => {
  return (
    <AppBar
      className="App-bar"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        height: "64px",
      }}
    >
      <div
        className="App-header-icon-menu"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </div>
      <div>
        <h4 className="Top_Bar_Heading mb-0">{PageName}</h4>
      </div>
      <ProfileIcon />
    </AppBar>
  );
};

export default AppHeader;
