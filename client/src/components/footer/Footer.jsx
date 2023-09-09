import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import fbIcon from "../../assets/fb.svg";
import xIcon from "../../assets/x.svg";
import instaIcon from "../../assets/insta.svg";
import logo from "../../assets/logo.png";
import "./Footer.scss";

const Footer = () => {
  const {
    languageText: { footer: languageText },
  } = useContext(UserContext);

  return (
    <div className="footer rounded-5 rounded-bottom-0  mt-3 py-3 d-flex flex-column flex-lg-row justify-content-evenly align-items-center">
      <NavLink to="/" className="logo">
        <img className="" src={logo} alt="logo" />
      </NavLink>{" "}
      <div className="links d-block d-flex flex-column flex-sm-row gap-0 gap-lg-5  py-3 justify-content-evenly align-items-center ">
        <NavLink to="/contact">{languageText.contact}</NavLink>
        <NavLink to="/about">{languageText.about}</NavLink>
        <NavLink to="/privacy-policy">{languageText.privacyPolicy}</NavLink>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="social-icons d-flex gap-5 py-3">
          <a
            href="https://www.facebook.com/people/VitQnt/61550861919853/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={fbIcon} alt="fbIcon" />
          </a>
          <a
            href="https://twitter.com/QntVit65685"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={xIcon} alt="xIcon" />
          </a>
          <a
            href="https://www.instagram.com/vitqnt/"
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
