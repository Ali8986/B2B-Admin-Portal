import { invokeApi } from "../../../bl_libs/invokeApi";

export const _dashboard_data = async () => {
  const requestObj = {
    path: `api/dashboard/get_dashboard_data`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const lunchContinue = async (data) => {
  const requestObj = {
    path: `api/lunch/continue_lunch`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
