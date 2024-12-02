import { Button, Tooltip } from "@mui/material";
import React, { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import LogoBox from "../GeneralComponents/Logo-Box";
import { useSnackbar } from "notistack";
import { Login } from "../../DAL/Login/Auth";
import { VisibilityOff } from "@mui/icons-material";
import LoadingButton from "../GeneralComponents/buttonLoadingState";
import MailLockIcon from "@mui/icons-material/MailLock";
import { ProfileImageContext } from "../../Hooks/App_Context";
import { s3baseUrl } from "../../config/config";
import { useSidebarStatus } from "../../Hooks/App_Context";
import FormInput from "../GeneralComponents/FormInput";

const LoginForm = ({ Forget }) => {
  const { updateData } = useSidebarStatus();
  const { setProfileImage } = useContext(ProfileImageContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email,
      password,
    };
    setLoading(true);
    const response = await Login(formData);
    if (response.code === 200) {
      updateData({
        privileges: response?.previllages,
        sidebar_status: response?.user?.sidebar_status,
        role: response?.user?.role,
        employee_data: response?.user,
      });
      const Profile_Image = response.user.profile_pic.small;
      setProfileImage(s3baseUrl + Profile_Image);
      localStorage.setItem("UserImage", s3baseUrl + Profile_Image);
      localStorage.setItem("token", response.token);
      localStorage.setItem("UserId", response.user._id);
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/dashboard");
      setLoading(false);
    } else {
      setLoading(false);
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };
  return (
    <div className="login-form text-center">
      <LogoBox />
      <div>
        <h2 style={{ fontWeight: 700, margin: "1.5rem 0" }}>Welcome Back</h2>
      </div>
      <div>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Sign in to continue
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <FormInput
            label="Email"
            fullWidth
            type="email"
            value={email}
            sx={true}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <Tooltip title="Enter Your Email in the Field" arrow>
                  <IconButton>
                    <MailLockIcon style={{ color: "#016699" }} />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
        </div>
        <FormInput
          sx={true}
          label="Password"
          fullWidth
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <Tooltip
                title={showPassword ? "Hide Password" : "Show Password"}
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
        <div className="Forget_Pass_Button mb-1 p-0">
          <Button
            variant="text"
            onClick={Forget}
            style={{ fontSize: "0.9rem", color: "#016699" }}
          >
            Forgot Password?
          </Button>
        </div>
        {loading ? (
          <LoadingButton
            type="submit"
            size="large"
            variant="contained"
            fullWidth
            isLoading={loading}
          >
            Login
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            Login
          </Button>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
