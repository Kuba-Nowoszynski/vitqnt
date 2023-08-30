import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";

import logo from "../../assets/logo.png";
import "./Navigation.scss";
const Navigation = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/signout", null, {
        withCredentials: true,
      });
      window.location.reload(); // make sure that the changes from UserContext are applied
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="container-fluid p-0 m-0 g-0 d-flex flex-column ">
      {/* Desktop view */}
      <div className="desktop-navigation pt-4 px-5 d-none d-md-flex justify-content-around align-items-center">
        <NavLink to="http://localhost:5173/" className="logo">
          {/* change it in styles or the link after deploy - the point is not to have it underscored */}
          <img className="" src={logo} alt="logo" />
        </NavLink>{" "}
        <div className="features d-flex gap-5">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/calculator">Calculator</NavLink>
          <NavLink to="/info">Info</NavLink>
          {/* TO BE ADDED LATER */}
          {/* <NavLink to="/recipes">Recipes</NavLink> */}
        </div>
        <div className="sign d-flex gap-2">
          {user ? (
            <>
              <button
                className="sign-in border-0 rounded-pill px-3"
                onClick={handleSignout}
              >
                Sign Out
              </button>
              <Button text={"Profile"} onClick={() => navigate("/profile")} />
            </>
          ) : (
            <>
              <button
                className="sign-in border-0 rounded-pill px-3"
                onClick={() => navigate("/sign-in")}
              >
                Sign in
              </button>
              <Button text={"Sign Up"} onClick={() => navigate("/sign-up")} />
            </>
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="mobile-navigation  d-flex d-md-none justify-content-between align-items-center  pt-3 px-5 ">
        <NavLink to="/" className="logo">
          <img className="ms-3" src={logo} alt="logo" />
        </NavLink>{" "}
        <div className="dropdown">
          <button className="dropdown-toggler rounded" onClick={toggleDropdown}>
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
                <NavLink to="/">Home</NavLink>
                <NavLink to="/calculator">Calculator</NavLink>
                <NavLink to="/info">Info</NavLink>
                {/* TO BE ADDED LATER */}
                {/* <NavLink to="/">Recipes</NavLink> */}
                <button
                  className="sign-in border-0 rounded-pill py-2"
                  onClick={() => navigate("/sign-in")}
                >
                  Sign in
                </button>
                <Button
                  text="sign up"
                  className="mt-2 "
                  onClick={() => navigate("/sign-up")}
                />
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
  );
};

export default Navigation;
