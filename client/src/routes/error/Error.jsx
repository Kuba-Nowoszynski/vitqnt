import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import errorImg from "../../assets/error.png";
import "./Error.scss";

const Error = () => {
  const {
    languageText: { error: languageText },
  } = useContext(UserContext);
  return (
    <div className="error  d-flex flex-column justify-content-center justify-content-md-evenly align-items-center  ">
      <h1 className="text-white">{languageText.header}</h1>
      <img src={errorImg} alt="Error image" className="py-5 " />
      <NavLink to="/">
        <h2 className="rounded-pill py-3 px-4">{languageText.subheader}</h2>
      </NavLink>
    </div>
  );
};

export default Error;
