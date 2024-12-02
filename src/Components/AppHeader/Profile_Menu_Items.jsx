import { Divider, ListItemIcon, MenuItem } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import KeyIcon from "@mui/icons-material/Key";

const ProfileMenuItems = ({
  handleClose,
  UserData,
  handleEditProfile,
  setShowChangePassword,
  setShowLogoutModal,
  Logout,
}) => {
  return (
    <>
      <MenuItem
        className="Profile-Icon-Link"
        onClick={(e) => handleClose(e)}
        sx={{ fontWeight: "600" }}
      >
        {UserData?.first_name + " " + UserData?.last_name}
      </MenuItem>
      <MenuItem
        className="Profile-Icon-Link"
        onClick={(e) => handleClose(e)}
        sx={{
          fontStyle: "italic",
          fontWeight: "200",
          color: "#a3a3a3",
          fontSize: "14px",
          marginTop: "-10px",
        }}
      >
        {UserData.email || "No Email Provided"}
      </MenuItem>
      <Divider />
      <MenuItem
        className="Profile-Icon-Link"
        onClick={(e) => {
          handleEditProfile();
          handleClose(e);
        }}
      >
        <ListItemIcon className="me-1">
          <EditNoteIcon className="fs-3" color="primary" />
        </ListItemIcon>
        Edit Profile
      </MenuItem>
      <MenuItem
        className="Profile-Icon-Link"
        onClick={(e) => {
          handleClose(e);
          setShowChangePassword(true);
        }}
      >
        <ListItemIcon className="me-1">
          <KeyIcon color="primary" />
        </ListItemIcon>
        Change Password
      </MenuItem>
      <MenuItem
        className="Profile-Icon-Link"
        onClick={(e) => {
          handleClose(e);
          setShowLogoutModal(true);
        }}
      >
        <ListItemIcon className="me-1">
          <Logout color="primary" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </>
  );
};

export default ProfileMenuItems;
