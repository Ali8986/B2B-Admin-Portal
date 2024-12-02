import ComponentState from "../Components/Login/switching";

const LoginPage = () => {
  return (
    <div className="background-Container">
      <div className="row w-100 justify-content-center hv-100">
        <div className="form-container col-12 row justify-content-evenly h-100">
          <div className="col-12 col-md-4 my-auto">
            <ComponentState />
          </div>
          <div className="d-none d-md-block col-md-7 Login_Page_Right"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
