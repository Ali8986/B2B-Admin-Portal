import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, IconButton, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { changePassword } from "../../DAL/Edit_Profile/Profile";

const ChangePassword = ({ handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);

  const showOrHidePassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const showOrHideConfirmPassword = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };
  const showOrHideOldPassword = () => {
    setOldPasswordVisibility(!oldPasswordVisibility);
  };

  const formData = {
    old_password: oldPassword,
    new_password: newPassword,
    confirm_password: confirmPassword,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Password Don't Match", { variant: "error" });
      return;
    }
    const response = await changePassword(formData);
    if (response.code === 200) {
      handleClose(); //
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  return (
    <>
      <div>
        <div className="text-center">
          <h5>Change Password</h5>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 my-3">
              <TextField
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={showOrHideOldPassword}>
                      {oldPasswordVisibility ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  ),
                }}
                type={oldPasswordVisibility ? "password" : "text"}
                variant="outlined"
                label="Old Password"
                fullWidth
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-6 mb-3 my-md-0 ">
              <TextField
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={showOrHidePassword}>
                      {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                type={passwordVisibility ? "password" : "text"}
                variant="outlined"
                label="New Password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={showOrHideConfirmPassword}>
                      {confirmPasswordVisibility ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  ),
                }}
                type={confirmPasswordVisibility ? "password" : "text"}
                variant="outlined"
                label="Confirm Password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="my-3">
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
