import { invokeApi } from "../../../bl_libs/invokeApi";

export const Feedback_listing = async (page, rows, search) => {
  const requestObj = {
    path: `api/feedback/search_feedback?page=${page}&limit=${rows}`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: search || {},
  };

  return invokeApi(requestObj);
};

export const _get_active_employees_for_loan = async (value) => {
  const requestObj = {
    path: `api/employee/get_active_employees_for_loan?search=${value}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
