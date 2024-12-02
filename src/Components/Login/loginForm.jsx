import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import LogoBox from "../GeneralComponents/Logo-Box";
import { useSnackbar } from "notistack";
import { Login } from "../../DAL/Login/Auth";
import { VisibilityOff } from "@mui/icons-material";
import LoadingButton from "../GeneralComponents/buttonLoadingState";
import CustomInput from "../GeneralComponents/CustomTags/CustomInput";
import CustomButton from "../GeneralComponents/CustomTags/CustomButton";
import { ProfileImageContext } from "../../Hooks/createContext";
import { s3baseUrl } from "../../config/config";
import { useSidebarStatus } from "../../Hooks/App_Context";

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
        privileges: response.previllages,
        sidebar_status: response.user.sidebar_status,
        role: response.user.role,
        employee_data: response.user,
      });
      const Profile_Image = response.user.profile_pic.small;
      setProfileImage(s3baseUrl + Profile_Image);
      localStorage.setItem("UserImage", s3baseUrl + Profile_Image);
      localStorage.setItem("token", response.token);
      localStorage.setItem("Email", JSON.stringify(response.user.email));
      localStorage.setItem("UserName", response.user.full_name);
      localStorage.setItem("UserId", response.user._id);
      localStorage.setItem("Roles", JSON.stringify(response.user.role));
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/dashboard");
    } else {
      setLoading(false);
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };
  return (
    <div className="login-form text-center">
      <LogoBox />
      <h2 style={{ fontWeight: 700, margin: "1.5rem 0" }}>Welcome Back</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>Sign in to continue</p>
      <form onSubmit={handleSubmit}>
        <CustomInput
          label="Email*"
          type="email"
          Inputvalue={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <CustomInput
          label="Password*"
          type={showPassword ? "text" : "password"}
          Inputvalue={password}
          autoComplete="password"
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          custom_BootStraps="mb-2"
          endAdornment={
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          }
        />
        {/* <TextField
          label="Password"
          fullWidth
          required
          value={password}
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "0.5rem" }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={HandleShowHidePassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        /> */}
        <div className="Forget_Pass_Button mb-1 p-0">
          <Button
            variant="text"
            onClick={Forget}
            style={{ fontSize: "0.9rem", color: "#1976D2" }}
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
          <CustomButton
            type="submit"
            className="w-100 text-uppercase"
            disabled={loading}
          >
            Login
          </CustomButton>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
