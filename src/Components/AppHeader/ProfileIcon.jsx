import Avatar from "@mui/material/Avatar";
import { useSnackbar } from "notistack";
import { useEffect, useState, useContext, useRef } from "react";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { logout } from "../../DAL/Login/Auth";
import { useNavigate } from "react-router-dom";
import CustomModal from "../GeneralComponents/CustomModal";
import ChangePassword from "./changePassword";
import { ProfileImageContext } from "../../Hooks/App_Context"; // Import context
import LogoutComponent from "./Logout";
import Custom_Slot_Props from "../../Constants/Styling/Toolbar_Menu";
import ProfileMenuItems from "./Profile_Menu_Items";
import { useUserData } from "../../Hooks/App_Context";

export default function ProfileIcon() {
  const { userData } = useUserData();
  const Slot_Props = Custom_Slot_Props();
  const { profileImage } = useContext(ProfileImageContext);
  const [UserData, setUserData] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const profileContainerRef = useRef(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [active, setActive] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleClose = (event) => {
    event.stopPropagation();
    if (anchorEl) {
      setActive(false);
      setAnchorEl(null);
    }
  };

  const confirmLogout = async (event) => {
    handleClose(event);
    setShowLogoutModal(false);
    const response = await logout();
    if (response.code === 200) {
      localStorage.removeItem("token");
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/");
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (anchorEl && !profileContainerRef.current.contains(event.target)) {
        handleClose(event);
      } else {
        setAnchorEl(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
    // eslint-disable-next-line
  }, [anchorEl]);

  useEffect(() => {
    if (userData) {
      setUserData(userData);
    }
    // eslint-disable-next-line
  }, [userData]);

  return (
    <div
      className={`px-0 Main_Profile_container ${
        UserData?.first_name && UserData?.last_name ? "Animation" : ""
      }`}
    >
      <div className="d-flex justify-content-between">
        <div className="left-item"></div>
        <div className="right-item ms-3">
          <div
            className="profile-container my-2"
            ref={profileContainerRef}
            onClick={(event) => {
              if (!anchorEl) {
                setActive(true);
                setAnchorEl(event.currentTarget);
              }
            }}
            aria-controls={anchorEl ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={!!anchorEl}
          >
            <div className="profile-avatar">
              <div className="MuiAvatar-root MuiAvatar-rounded css-ab6sm">
                <div className="Profile-DropDown m-1">
                  <div className="profile-icon">
                    <Tooltip
                      title="Account settings"
                      arrow
                      enterDelay={500}
                      leaveDelay={200}
                    >
                      <div>
                        <Avatar
                          variant="square"
                          sx={{ width: 45, height: 45 }}
                          src={profileImage || null}
                        ></Avatar>
                      </div>
                    </Tooltip>
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={Boolean(anchorEl)}
                    onClick={(event) => event.stopPropagation()} // Stop propagation
                    slotProps={Slot_Props}
                    transformOrigin={{
                      horizontal: "center",
                      vertical: "top",
                    }}
                    anchorOrigin={{
                      horizontal: "center",
                      vertical: "bottom",
                    }}
                  >
                    <ProfileMenuItems
                      Logout={Logout}
                      setShowLogoutModal={setShowLogoutModal}
                      handleClose={handleClose}
                      UserData={UserData}
                      handleEditProfile={handleEditProfile}
                      setShowChangePassword={setShowChangePassword}
                    />
                  </Menu>
                  <CustomModal
                    open={showLogoutModal}
                    CustomSpacing={true}
                    setAnchorEl={setAnchorEl}
                    handleClose={(event) => {
                      handleClose(event);
                      setShowLogoutModal(false);
                    }}
                    component={
                      <LogoutComponent
                        handleCloseLogoutModal={(event) => {
                          handleClose(event);
                          setShowLogoutModal(false);
                        }}
                        confirmLogout={(e) => confirmLogout(e)}
                      />
                    }
                  />
                  <CustomModal
                    open={showChangePassword}
                    handleClose={(event) => {
                      handleClose(event);
                      setShowChangePassword(false);
                    }}
                    component={
                      <ChangePassword
                        handleClose={() => setShowChangePassword(false)}
                      />
                    }
                  />
                </div>
              </div>
            </div>
            <div className="profile-info">
              <span className="user-name">
                {UserData?.first_name + " " + UserData?.last_name}
              </span>
              <span className="user-role">Admin</span>
            </div>
            <span
              className={`pointer ${
                active ? "chevron-icon-0" : "chevron-icon"
              }`}
            >
              <i
                className={`px-3 fa-solid bi bi-chevron-down Profile_Icon`}
              ></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
