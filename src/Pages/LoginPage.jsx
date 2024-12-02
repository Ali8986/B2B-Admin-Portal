import React from "react";
import ComponentState from "../Components/Login/switching";
import SideImage from "../Assets/Images/Login_Left.png";

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="background-image">
        <div className="overlay"></div>
      </div>
      <div className="form-container">
        <div className="login-form-section col-4">
          <ComponentState />
        </div>
        <div className="image-section d-none d-md-block col-8">
          <img
            src={SideImage}
            alt="login-page-right"
            className="img-fluid side-image"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
