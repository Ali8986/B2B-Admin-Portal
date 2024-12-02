import FormInput from "../GeneralComponents/FormInput";
import FormBox from "../GeneralComponents/Form-Box";
import LogoBox from "../GeneralComponents/Logo-Box";
import { useState } from "react";
import LoadingButton from "../GeneralComponents/buttonLoadingState";
import { useSnackbar } from "notistack";
import { _Email_Verification } from "../../DAL/Login/Auth";
import MailLockIcon from "@mui/icons-material/MailLock";
import { Button, IconButton, Tooltip } from "@mui/material";

const ForgetForm = ({ Default, handleOtp }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleClick = () => {
    Default();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      const formData = {
        email,
      };
      setLoading(true);
      const response = await _Email_Verification(formData);
      if (response.code === 200) {
        handleOtp();
        setLoading(false);
        enqueueSnackbar(response.message, { variant: "success" });
      } else {
        setLoading(false);
        enqueueSnackbar(response.message, { variant: "error" });
      }
    } else {
      e.target.reportValidity();
    }
  };

  return (
    <FormBox>
      <LogoBox />
      <div className="heading-text mb-2 mt-3">
        <h2>Enter Email</h2>
      </div>
      <div className="underline my-3"></div>
      <div className="Forget-Email">
        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            sx={true}
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <Tooltip
                  title="Enter your email to get verification code"
                  arrow
                >
                  <IconButton>
                    <MailLockIcon style={{ color: "#016699" }} />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <div className="text-end w-100 py-0 my-0">
            <Button
              className="my-0 py-0"
              variant="text"
              onClick={handleClick}
              style={{ fontSize: "0.9rem", color: "#1976D2" }}
            >
              Back to Login
            </Button>
          </div>
          <LoadingButton
            type="submit"
            size="large"
            variant="contained"
            className="Loading-BTN mt-0"
            fullWidth
            isLoading={loading}
          >
            Verify Email
          </LoadingButton>
        </form>
      </div>
    </FormBox>
  );
};

export default ForgetForm;
