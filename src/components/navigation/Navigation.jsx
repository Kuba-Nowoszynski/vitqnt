import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";
import Button from "../button/Button";
import { useState } from "react";

import "./Navigation.scss";
const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="container-fluid p-0 m-0 g-0">
      {/* Desktop view */}
      <div className="desktop-navigation pt-4 px-5 d-none d-md-flex justify-content-around align-items-center">
        <NavLink to="http://localhost:5173/" className="logo">
          <img className="" src={logo} alt="logo" />
        </NavLink>{" "}
        <div className="features d-flex gap-5">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/calculator">Calculator</NavLink>
          <NavLink to="/info">Info</NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
        </div>
        <div className="sign d-flex gap-2">
          <button className="sign-in  border-0 rounded-pill px-3">
            Sign in
          </button>
          <Button text={"Sign Up"} />
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
                <NavLink to="/">Info</NavLink>
                <NavLink to="/">Recipes</NavLink>
                <button className="sign-in border-0 rounded-pill py-2 ">
                  Sign in
                </button>
                <Button text="sign up" className="mt-2 " />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
