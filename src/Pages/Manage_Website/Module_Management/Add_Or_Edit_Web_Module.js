import React, { useState, useEffect } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import FormInput from "../../../Components/GeneralComponents/FormInput";
import HeaderWithBackButton from "../../../Components/backButton";
import {
  Create_Website_Module,
  Get_Web_Mod_Detail,
  Updating_Website_Module,
} from "../../../DAL/Login/Login";

function AddorEditCompany({ type }) {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location || {};
  const { ModuleData, webPageID, value } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    module_title: "",
    module_configuration: ModuleData?._id || "",
    web_page_id: webPageID || "",
    status: true,
  });

  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormateData = (data) => {
    setFormData((prev) => ({
      ...prev,
      module_title: data?.module_title,
      module_configuration: data?.module_configuration,
      web_page_id: data?.web_page_id,
      status: data?.status,
      module_title_slug: data?.module_title_slug,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const slug = formData?.module_title_slug;
    if (formData.module_title_slug) {
      delete formData.module_title_slug;
    }
    const response =
      type === Create_Website_Module
        ? await Create_Website_Module(formData)
        : await Updating_Website_Module(slug, formData);
    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      // navigate("/company");
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };

  const Web_Mod_detail = async () => {
    const response = await Get_Web_Mod_Detail(id);
    if (response.code === 200) {
      handleFormateData(response.website_module);
      enqueueSnackbar(response.message, { variant: "success" });
      setLoading(false);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  useEffect(() => {
    if (state) {
      if (!state.isAdding) {
        handleFormateData(state?.pageData);
      }
    } else if (type === Updating_Website_Module) {
      Web_Mod_detail();
    }
  }, []);

  return (
    <>
      <div className='px-3 px-md-4 py-1 py-md-3'>
        <form onSubmit={handleSubmit}>
          <div className='row p-0 p-lg-3 mt-5 mt-md-2'>
            <HeaderWithBackButton
              title={
                type === Create_Website_Module
                  ? `Add ${ModuleData?.module_configuration_name}`
                  : `Editing ${ModuleData?.module_configuration_name}`
              }
              path='empty'
            />
            <div className='col-6 mb-3'>
              <FormInput
                label={`Enter ${ModuleData?.module_configuration_name} Title`}
                variant='outlined'
                name='module_title'
                value={formData.module_title}
                onChange={handleInputChange}
                type='text'
                required={true}
              />
            </div>
            <div className='col-6 mt-2 mb-3'>
              <Select
                fullWidth
                name='status'
                value={formData.status ?? true}
                onChange={handleInputChange}
              >
                <MenuItem value={true} selected>
                  Active
                </MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </div>
            <div className='images_box px-0'></div>
            <div className='col-12 d-flex flex-wrap justify-content-end mt-3'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                size='large'
                disabled={loading}
                style={{ backgroundColor: "#7396CC" }}
              >
                {loading ? (
                  type === Create_Website_Module ? (
                    <div className='d-flex align-items-center'>
                      <CircularProgress size={15} className='color' />
                      <p className='ms-2 mb-0 font-size'>Update</p>
                    </div>
                  ) : (
                    <div className='d-flex align-items-center'>
                      <CircularProgress size={15} className='color' />
                      <p className='ms-2 mb-0 font-size'>Submit</p>
                    </div>
                  )
                ) : type === Create_Website_Module ? (
                  "Submit"
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddorEditCompany;
