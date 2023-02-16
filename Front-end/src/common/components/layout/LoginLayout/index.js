//react
import React from "react";
//component
import Login from "@/modules/Auth/pages/Login/index";

const LoginLayout = () => {
  return (
    <>
      <div className="header"></div>;
      <>
        <Login />
      </>
      <div className="footer"></div>
    </>
  );
};

export default LoginLayout;
