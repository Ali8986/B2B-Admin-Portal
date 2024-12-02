import { useState } from "react";
import FormBox from "../GeneralComponents/Form-Box";
import { MuiOtpInput } from "mui-one-time-password-input";
import LogoBox from "../GeneralComponents/Logo-Box";
import LoadingButton from "../GeneralComponents/buttonLoadingState";
import { useSnackbar } from "notistack";
import { _Code_Verification } from "../../DAL/Login/Auth";

const OTP = ({ Default, Confirm }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [email] = useState("aliusama.vectorcoder@gmail.com");
  const handleClick = () => {
    Default();
  };
  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      verification_code: otp,
    };
    setLoading(true);
    const response = await _Code_Verification(formData);
    if (response && response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      Confirm();
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormBox>
        <LogoBox />
        <div className="heading-text mt-3">
          <h2 className="fs-3">Email Verification Code</h2>
          <p>We have sent a code to your email</p>
        </div>
        <div>
          <MuiOtpInput
            value={otp}
            TextFieldsProps={() => ({ size: "small" })}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "0px",
                  borderColor: "#006599", // Desired border color
                },
                "&:hover fieldset": {
                  borderRadius: "0px",
                  borderColor: "#004c80", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderRadius: "0px",
                  borderColor: "#002c50", // Border color when focused
                },
              },
            }}
            className="my-2 px-4 otp-input"
            length={6}
          />
        </div>
        <div className="text-end w-100 px-4 py-0 my-0">
          <a
            href="#home"
            className="Back-To-Login"
            onClick={handleClick}
            style={{ color: "#006599" }}
          >
            Back to Login
          </a>
        </div>
        <div className="w-100">
          <LoadingButton
            type="submit"
            size="large"
            variant="contained"
            className="Loading-BTN mt-3"
            fullWidth
            isLoading={loading}
          >
            Verify Account
          </LoadingButton>
        </div>
      </FormBox>
    </form>
  );
};

export default OTP;
