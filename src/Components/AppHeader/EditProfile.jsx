import React, { useState, useEffect, useContext } from "react";
import { Button, Avatar, IconButton, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ProfileImageContext } from "../../Hooks/createContext";
import FormInput from "../GeneralComponents/FormInput";
import { useSnackbar } from "notistack";
import "../../Assets/Styles/EditProfile.css";
import { s3baseUrl } from "../../config/config";
import PhoneInput from "react-phone-number-validation";
import CustomInput from "../GeneralComponents/CustomTags/CustomInput";
import {
  Edit_Profile_Settings,
  profile_Detail,
} from "../../DAL/Edit_Profile/Profile";

const StyledAvatar = styled(Avatar)({
  width: "100px",
  height: "100px",
  marginBottom: "20px",
  position: "relative",
});

const EditProfile = () => {
  // const profileimg = localStorage.getItem("UserImage");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Data, setData] = useState({
    first_name: "",
    last_name: "",
    contact_number: "",
    address: "",
    image: null,
  });
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);

  const handlePhoneChange = (value) => {
    console.log(phoneNumber);
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

    if (profileImage) {
      formData.append("image", Data.image);
    }
    setLoading(true);
    const response = await Edit_Profile_Settings(Data.employee_id, formData);
    if (response.code === 200) {
      localStorage.setItem("UserData", JSON.stringify(Data));
      enqueueSnackbar("Admin details updated successfully", {
        variant: "success",
      });
      setLoading(false);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    localStorage.setItem("UserImage", URL.createObjectURL(e.target.files[0]));
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };
  const getUserDetails = async (id) => {
    setLoading(true);
    const response = await profile_Detail(id);
    if (response.code === 200) {
      const {
        _id,
        first_name,
        last_name,
        contact_number,
        address,
        profile_pic,
      } = response.employee;
      setData({
        ...Data,
        employee_id: _id,
        first_name: first_name || "",
        last_name: last_name || "",
        contact_number: contact_number || "",
        address: address || "",
      });
      setProfileImage(s3baseUrl + profile_pic.small);
      setPhoneNumber(contact_number);
      setLoading(false);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
      setLoading(false);
    }
  };

  useEffect(() => {
    const User_Id = localStorage.getItem("UserId");
    if (User_Id) {
      getUserDetails(User_Id);
    }
    //eslint-disable-next-line
  }, []);

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
              <div className="mt-2">
                <CustomInput
                  label="First Name*"
                  type="text"
                  Inputvalue={Data.first_name || ""} // Bind to Data
                  onChange={(e) =>
                    setData({ ...Data, first_name: e.target.value })
                  }
                />
              </div>
              <CustomInput
                label="Last Name*"
                type="text"
                Inputvalue={Data.last_name || ""} // Bind to Data
                onChange={(e) =>
                  setData({ ...Data, last_name: e.target.value })
                }
              />
              <PhoneInput
                inputClass="Profile_Phone"
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
