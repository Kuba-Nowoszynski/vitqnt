import errorImg from "../../assets/error.png";
import { NavLink } from "react-router-dom";

import "./Error.scss";

const Error = () => {
  return (
    <div className="error  d-flex flex-column justify-content-center justify-content-md-evenly align-items-center  ">
      <h1 className="text-white">This page does not exist :(</h1>
      <img src={errorImg} alt="Error image" className="py-5 " />
      <NavLink to="/">
        <h2 className="rounded-pill py-3 px-4">Navigate to the home page</h2>
      </NavLink>
    </div>
  );
};

export default Error;
