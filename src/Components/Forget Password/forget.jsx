import FormInput from "../GeneralComponents/FormInput";
import FormBox from "../GeneralComponents/Form-Box";
import LogoBox from "../GeneralComponents/Logo-Box";
import { useState } from "react";
import LoadingButton from "../GeneralComponents/buttonLoadingState";
import { useSnackbar } from "notistack";
import { _Email_Verification } from "../../DAL/Login/Auth";
import CustomInput from "../GeneralComponents/CustomTags/CustomInput";

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
      <div className="heading-text mb-2">
        <h2>Enter Email</h2>
      </div>
      <div className="underline my-3"></div>
      <div className="Forget-Email">
        <form onSubmit={handleSubmit} noValidate>
          <CustomInput
            label="Email*"
            type="email"
            Inputvalue={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <div className="text-end w-100">
            <a href="#home" className="Back-To-Login" onClick={handleClick}>
              Back to Login
            </a>
          </div>
          <LoadingButton
            type="submit"
            size="large"
            variant="contained"
            className="Loading-BTN mt-3"
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
