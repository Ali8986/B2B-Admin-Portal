import React, { useState, useContext } from "react";
import { Button, Avatar, IconButton, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ProfileImageContext } from "../../Hooks/App_Context";
import FormInput from "../../Components/GeneralComponents/FormInput";
import { useSnackbar } from "notistack";
import "../../Assets/Styles/EditProfile.css";
import { s3baseUrl } from "../../config/config";
import PhoneInput from "react-phone-number-validation";
import { Edit_Profile_Settings } from "../../DAL/Edit_Profile/Profile";
import Iconify from "../GeneralComponents/Iconify";

const StyledAvatar = styled(Avatar)({
  width: "100px",
  height: "100px",
  marginBottom: "20px",
  position: "relative",
});

const EditProfile = () => {
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);
  const UserData = JSON.parse(localStorage.getItem("UserData"));
  // eslint-disable-next-line
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Data, setData] = useState({
    employee_id: UserData?.employee_id,
    first_name: UserData?.first_name,
    last_name: UserData?.last_name,
    contact_number: UserData?.contact_number,
    address: UserData?.address,
    profile_image: null,
  });
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    setData((prevState) => ({
      ...prevState,
      contact_number: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("employee_id", parseInt(Data.employee_id));
    formData.append("first_name", Data.first_name);
    formData.append("last_name", Data.last_name);
    formData.append("contact_number", Data.contact_number.trim());
    formData.append("address", Data.address.trim());

    if (Data.profile_image && Data.profile_image instanceof File) {
      console.log("I am running profile");
      formData.append("image", Data.profile_image);
    }
    setLoading(true);
    const response = await Edit_Profile_Settings(Data.employee_id, formData);
    if (response.code === 200) {
      enqueueSnackbar("Admin details updated successfully", {
        variant: "success",
      });
      localStorage.setItem("UserData", JSON.stringify(Data));
      localStorage.setItem(
        "UserImage",
        s3baseUrl + response?.employee?.profile_pic?.small
      );
      setProfileImage(s3baseUrl + response?.employee?.profile_pic?.small);
      setLoading(false);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setData((prevState) => ({
      ...prevState,
      profile_image: e.target.files[0],
    }));
  };

  return (
    <div className="p-3">
      {/* <HeaderWithBackButton title="Edit Profile" path="/dashboard" /> */}
      <div className="ProfileContainer">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className="Position_update">
              <StyledAvatar alt="Profile Image" src={profileImage} />
              <h5>Edit Profile</h5>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-button"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="upload-button">
                <IconButton
                  className="Profile-Image-Change"
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <CameraAltIcon />
                </IconButton>
              </label>
            </div>
            <form onSubmit={handleSubmit} className="w-100">
              <div className="mt-2 mb-2">
                <FormInput
                  label="First Name"
                  fullWidth
                  type="text"
                  value={Data.first_name || ""}
                  sx={false}
                  onChange={(e) =>
                    setData({ ...Data, first_name: e.target.value })
                  }
                  InputProps={{
                    endAdornment: (
                      <Iconify
                        icon={"wpf:name"}
                        width={20}
                        height={20}
                        color={"#006599"}
                      />
                    ),
                  }}
                />
              </div>
              <div className="mb-z">
                <FormInput
                  label="Last Name"
                  fullWidth
                  type="text"
                  sx={false}
                  value={Data.last_name || ""}
                  onChange={(e) =>
                    setData({ ...Data, last_name: e.target.value })
                  }
                  InputProps={{
                    endAdornment: (
                      <Iconify
                        icon={"wpf:name"}
                        width={20}
                        height={20}
                        color={"#006599"}
                      />
                    ),
                  }}
                />
              </div>
              <PhoneInput
                inputClass="Profile_Phone_Input"
                countryCodeEditable={false}
                dropdownClass="select-div2"
                required={true}
                autoSelectCountry={true}
                country="pk"
                value={Data.contact_number || ""} // Directly bind to state
                onChange={handlePhoneChange}
                setValue={setPhoneNumber}
                enableSearch={true}
              />

              <div className="mt-2">
                <FormInput
                  label="Address"
                  name="address"
                  required={true}
                  type="text"
                  multline={true}
                  value={Data.address || ""} // Bind to Data
                  onChange={(e) =>
                    setData({ ...Data, address: e.target.value })
                  }
                />
              </div>
              <div className="col-12 d-flex justify-content-end">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Update
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
