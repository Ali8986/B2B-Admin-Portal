import { useState } from "react";
import FormBox from "../GeneralComponents/Form-Box";
import { MuiOtpInput } from "mui-one-time-password-input";
import LogoBox from "../GeneralComponents/Logo-Box";
import LoadingButton from "../GeneralComponents/buttonLoadingState";
import { useSnackbar } from "notistack";
import { _Code_Verification } from "../../DAL/Login/Auth";
import CustomButton from "../GeneralComponents/CustomTags/CustomButton";

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
        <div className="heading-text">
          <h4>Email Verification Code</h4>
          <p>We have sent a code to your email</p>
        </div>
        <div>
          <MuiOtpInput
            value={otp}
            TextFieldsProps={() => ({ size: "small" })}
            onChange={handleChange}
            length={6}
            className="otp-input"
          />
        </div>
        <div className="text-end w-100 py-2">
          <a href="#home" className="Back-To-Login" onClick={handleClick}>
            Back to Login
          </a>
        </div>
        <div className="w-100">
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
        </div>
      </FormBox>
    </form>
  );
};

export default OTP;
