import { invokeApi } from "../../bl_libs/invokeApi";

export const _Reset_Admin_Password = async (data) => {
  const requestObj = {
    path: `api/app_api/reset_password`,
    method: "POST",
    headers: {
      // 'x-sh-auth': 1234
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
