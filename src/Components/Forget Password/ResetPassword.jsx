import FormInput from "../GeneralComponents/FormInput";
import { useState } from "react";
import FormBox from "../GeneralComponents/Form-Box";
import LogoBox from "../GeneralComponents/Logo-Box";
import LoadingButton from "../GeneralComponents/buttonLoadingState";
import { useSnackbar } from "notistack";
import { _Reset_Admin_Password } from "../../DAL/Login/ResetPassword";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

const ResetPassword = ({ size, Default, onChange, handleSnackbarClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "aliusama.vectorcoder@gmail.com",
    password: "",
    confirm_password: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.confirm_password !== formData.password) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      setLoading(false);
      return;
    }
    if (event.target.checkValidity()) {
      setLoading(true);
      const response = await _Reset_Admin_Password(formData);
      if (response.code === 200) {
        enqueueSnackbar(response.message, { variant: "success" });
        Default();
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
        setLoading(false);
      }
    } else {
      enqueueSnackbar("Fields Cannot be Empty", { variant: "error" });
    }
  };
  return (
    <FormBox>
      <LogoBox />
      <div className="heading-text py-2">
        <h2>Change Password</h2>
      </div>
      <div className="underline"></div>
      <form onSubmit={handleSubmit}>
        <FormInput
          sx={true}
          label="Password"
          fullWidth
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          InputProps={{
            endAdornment: (
              <Tooltip
                title={showPassword ? "Hide New Password" : "Show New Password"}
                enterDelay={500}
                leaveDelay={200}
                arrow
              >
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Visibility style={{ color: "#016699" }} />
                  ) : (
                    <VisibilityOff style={{ color: "#016699" }} />
                  )}
                </IconButton>
              </Tooltip>
            ),
          }}
        />
        <FormInput
          sx={true}
          label="Confirm Password*"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirm_password}
          autoComplete="confirm_password"
          onChange={(e) => handleChange("confirm_password", e.target.value)}
          required={true}
          InputProps={{
            // Use InputProps here
            endAdornment: (
              <Tooltip
                title={
                  showPassword
                    ? "Hide Confirm Password"
                    : "Show Confirm Password"
                }
                enterDelay={500}
                leaveDelay={200}
                arrow
              >
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Visibility style={{ color: "#016699" }} />
                  ) : (
                    <VisibilityOff style={{ color: "#016699" }} />
                  )}
                </IconButton>
              </Tooltip>
            ),
          }}
        />

        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          isLoading={loading}
        >
          Confirm
        </LoadingButton>
      </form>
    </FormBox>
  );
};

export default ResetPassword;
