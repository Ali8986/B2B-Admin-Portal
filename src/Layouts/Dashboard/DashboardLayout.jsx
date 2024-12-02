import { Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "./TopBar";
import AppSidebar from "./SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { minHeight } from "@mui/system";

const drawerWidth = 250;

const DashboardLayout = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className={"Dashboard-layout-container"}>
      <CssBaseline />
      <AppHeader
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setIsClosing={isClosing}
        drawerWidth={drawerWidth}
      />
      <AppSidebar
        drawerWidth={drawerWidth}
        className="drawer-main-sidebar"
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <div
        className={`Dashboard-layout-main custom-scrollbar ${
          isHovered ? "hovered" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          minHeight: "100vh",
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
