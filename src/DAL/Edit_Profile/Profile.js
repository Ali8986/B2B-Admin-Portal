import { invokeApi } from "../../bl_libs/invokeApi";

export const Edit_Profile_Settings = async (_id, data) => {
  const requestObj = {
    path: `api/employee/edit_employee_for_settings/${_id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const profile_Detail = async (id) => {
  const requestObj = {
    path: `api/employee/detail_employee_by_id_for_settings/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const changePassword = async (data) => {
  const requestObj = {
    path: `api/app_api/change_password`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const Get_Employee_details = async (id) => {
  const requestObj = {
    path: `api/employee/detail_employee_by_id/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
