import { NavLink } from "react-router-dom";

import fbIcon from "../../assets/fb.svg";
import xIcon from "../../assets/x.svg";
import instaIcon from "../../assets/insta.svg";
import logo from "../../assets/logo.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer rounded-5 rounded-bottom-0  mt-3 py-3 d-flex flex-column flex-lg-row justify-content-evenly align-items-center">
      <NavLink to="/" className="logo">
        <img className="" src={logo} alt="logo" />
      </NavLink>{" "}
      <div className="links d-block d-flex gap-0 gap-lg-5 justify-content-evenly py-3 ">
        <NavLink classNameto="/">Home</NavLink>
        <NavLink to="/calculator">Calculator</NavLink>
        <NavLink to="/info">Info</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="social-icons d-flex gap-5 py-3">
          <a
            href="https://www.example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={fbIcon} alt="fbIcon" />
          </a>
          <a
            href="https://www.example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={xIcon} alt="xIcon" />
          </a>
          <a
            href="https://www.example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instaIcon} alt="instaIcon" />
          </a>
        </div>
        <p className="">
          {" "}
          &copy; 2023{" "}
          <a
            href="https://github.com/Kuba-Nowoszynski"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}
          >
            Q8
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
