import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import homeIcon from "../../assets/icons/home.png";
import calculatorIcon from "../../assets/icons/calculator.png";
import infoIcon from "../../assets/icons/info.png";
import deficitIcon from "../../assets/icons/deficit.png";
import maleIcon from "../../assets/icons/male.png";
import femaleIcon from "../../assets/icons/female.png";

import LanguageSwitch from "../../components/languageSwitch/LanguageSwitch";
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";

import logo from "../../assets/logo.png";
import useSound from "use-sound";
import bleepSound from "../../assets/sounds/bleep-sound.wav";
import "./Navigation.scss";
const Navigation = () => {
  const [playBleep] = useSound(bleepSound);
  const {
    user,
    loading,
    apiUrl,
    languageText: { navigation: languageText },
  } = useContext(UserContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignout = async (e) => {
    e.preventDefault();
    playBleep();

    try {
      await axios.post(`${apiUrl}/signout`, null, {
        withCredentials: true,
      });
      setTimeout(async () => {
        //delay to playBleep (sound)
        window.location.reload(); // make sure that the changes from UserContext are applied
      }, 800);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {/* //prevent flicking navigation on getting user */}
      {!loading && (
        <div className="container-fluid p-0 m-0 g-0 d-flex flex-column ">
          {/* Desktop view */}
          <div className="desktop-navigation  px-5 d-none d-lg-flex justify-content-around align-items-center">
            <NavLink to="http://localhost:5173/" className="logo">
              {/* change it in styles or the link after deploy - the point is not to have it underscored */}
              <img className="" src={logo} alt="logo" />
            </NavLink>{" "}
            <div className="features d-flex gap-5 align-items-center">
              <NavLink to="/">
                <img src={homeIcon} alt="home icon" />
              </NavLink>
              <NavLink to="/calculator">
                <img src={calculatorIcon} alt="calculator icon" />
              </NavLink>
              <NavLink to="/info">
                {" "}
                <img src={infoIcon} alt="info icon" />
              </NavLink>
              <NavLink to="/deficit">
                {" "}
                <img src={deficitIcon} alt="deficit icon" />
              </NavLink>
            </div>
            <div className="ms-3 ms-xl-0 d-flex flex-column align-items-start">
              <LanguageSwitch className="my-2" />
              <div className="sign mb-5 d-flex gap-3">
                {user ? (
                  <>
                    <button
                      className="sign-in border-0 rounded-pill px-3"
                      onClick={handleSignout}
                    >
                      {languageText.signOut}
                    </button>
                    {user.sex === "male" ? (
                      <img
                        className="profile-pic"
                        src={maleIcon}
                        alt="male icon"
                        onClick={() => navigate("/profile")}
                      />
                    ) : (
                      <img
                        className="profile-pic"
                        src={femaleIcon}
                        alt="female icon"
                        onClick={() => navigate("/profile")}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <button
                      className="sign-in border-0 rounded-pill px-3"
                      onClick={() => navigate("/sign-in")}
                    >
                      {languageText.signIn}
                    </button>
                    <Button
                      text={languageText.signUp}
                      onClick={() => navigate("/sign-up")}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="mobile-navigation  d-flex d-lg-none justify-content-between align-items-center px-5 ">
            <NavLink to="/" className="logo">
              <img className="ms-3 pt-3" src={logo} alt="logo" />
            </NavLink>{" "}
            <div className="dropdown">
              <LanguageSwitch className="mx-auto my-3" />
              <button
                className="dropdown-toggler rounded"
                onClick={toggleDropdown}
              >
                Menu
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className="dropdown-content features d-flex flex-column text-center pb-3 px-2"
                    initial={{ opacity: 0, top: "-100%" }}
                    animate={{ opacity: 1, top: "100%" }}
                    exit={{ opacity: 0, top: "-100%" }}
                  >
                    <NavLink to="/" onClick={toggleDropdown}>
                      <img src={homeIcon} alt="home icon" />
                    </NavLink>
                    <NavLink to="/calculator" onClick={toggleDropdown}>
                      <img src={calculatorIcon} alt="calculator icon" />
                    </NavLink>
                    <NavLink to="/info" onClick={toggleDropdown}>
                      {" "}
                      <img src={infoIcon} alt="info icon" />
                    </NavLink>
                    <NavLink to="/deficit" onClick={toggleDropdown}>
                      {" "}
                      <img src={deficitIcon} alt="deficit icon" />
                    </NavLink>
                    {user ? (
                      <>
                        <button
                          className="sign-in border-0 rounded-pill py-2 px-3 mb-3"
                          onClick={(e) => {
                            handleSignout(e);
                            toggleDropdown();
                          }}
                        >
                          {languageText.signOut}
                        </button>
                        {user.sex === "male" ? (
                          <img
                            className="profile-pic mx-auto"
                            src={maleIcon}
                            alt="male icon"
                            onClick={() => {
                              toggleDropdown();
                              navigate("/profile");
                            }}
                          />
                        ) : (
                          <img
                            className="profile-pic mx-auto"
                            src={femaleIcon}
                            alt="female icon"
                            onClick={() => {
                              toggleDropdown();
                              navigate("/profile");
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <button
                          className="sign-in border-0 rounded-pill py-2"
                          onClick={() => {
                            toggleDropdown();
                            navigate("/sign-in");
                          }}
                        >
                          {languageText.signIn}
                        </button>
                        <Button
                          text={languageText.signUp}
                          className="mt-2 py-2"
                          onClick={() => {
                            toggleDropdown();
                            navigate("/sign-up  ");
                          }}
                        />
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="main-content">
            {" "}
            <Outlet />
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};

export default Navigation;
