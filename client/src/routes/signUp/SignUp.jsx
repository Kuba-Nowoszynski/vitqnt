/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ErrorPopup from "../../components/errorPopup/ErrorPopup";
import emailImg from "../../assets/email-account.png";
import "./SignUp.scss";

let hasRun = false; // prevents double render && double request
const SignUp = () => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const [validationError, setValidationError] = useState(""); // State for validation error message
  const [isDisabled, setIsDisabled] = useState(false); //prevent from multiple submites
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State to toggle error popup

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });
  const [isAnimated, setIsAnimated] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const { user, loading, apiUrl } = useContext(UserContext);
  //redirect user if signed in

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, navigate, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const nameIsValid =
      /^[a-zA-Z\s\u00C0-\u024F]+$/.test(formData.name) &&
      formData.name.length <= 50;
    const emailIsValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email);
    const passwordIsValid = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/.test(
      formData.password
    );
    const ageIsValid = formData.age >= 0 && formData.age <= 90;

    setIsFormValid(
      nameIsValid && emailIsValid && passwordIsValid && ageIsValid
    );
    if (!nameIsValid) {
      setValidationError("Name should be alphabetic, max 50 characters");
    } else if (!emailIsValid) {
      setValidationError("Email is not valid");
    } else if (!passwordIsValid) {
      setValidationError(
        "Password must be 8+ characters long, with 1 uppercase and 1 special character"
      );
    } else if (!ageIsValid) {
      setValidationError("Age must be between 0 and 90");
    } else {
      setValidationError("");
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleSignup = async (e) => {
    if (!hasRun && !isDisabled) {
      e.preventDefault();
      if (isFormValid) {
        try {
          const response = await axios.post(`${apiUrl}/signup`, formData);
          hasRun = true;
          setIsAnimated(true);

          let timeout = setTimeout(() => {
            setIsCreated(true);
          }, 500);
          return () => {
            clearTimeout(timeout);
          };
        } catch (error) {
          console.error("Error signing up:", error);
          navigate("/error");
        }
      } else {
        // Check if any of the input fields are empty
        if (!formData.name.trim()) {
          setValidationError("Name cannot be empty");
        } else if (!formData.email.trim()) {
          setValidationError("Email cannot be empty");
        } else if (!formData.password.trim()) {
          setValidationError("Password cannot be empty");
        } else if (!formData.age.trim()) {
          setValidationError("Age cannot be empty");
        }

        setShowErrorPopup(true); // Show error popup when form is not valid
        setIsDisabled(true); //prevent from clicking button
        // Set a timeout to hide the error popup after 2 seconds
        const errorTimeout = setTimeout(() => {
          setShowErrorPopup(false);
          setIsDisabled(false);
        }, 2000);

        return () => {
          clearTimeout(errorTimeout); // Clear the timeout if the component unmounts or if this effect is re-run
        };
      }
    }
  };

  return (
    <>
      {!loading && !user && (
        <div className="animate__animated animate__bounceIn sign-up-component d-flex justify-content-center align-items-center ">
          {!isCreated && (
            <div
              className={`form-box mx-auto  rounded-4 my-3 ${
                isAnimated && "animate__animated animate__fadeOut"
              }`}
            >
              <form
                className="form mx-auto py-4 px-4 text-center d-flex flex-column  gap-3"
                autoComplete="on"
              >
                <span className="title">Sign up</span>
                <span className="subtitle">
                  Create a free account with your email
                </span>
                <div className="form-container d-flex flex-column flex-sm-row rounded-5 my-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min={0}
                    max={90}
                    required
                  />
                </div>

                <button
                  className=" mx-auto py-3 px-5 rounded"
                  onClick={handleSignup}
                  disabled={isDisabled}
                >
                  Sign up
                </button>
              </form>
              <div className="form-section text-center p-4">
                <p className="py-2">
                  Have an account? <NavLink to="/sign-in">Log in</NavLink>
                </p>
              </div>
            </div>
          )}
          {isCreated && (
            <div className="verify-email animate__animated animate__fadeIn mx-auto my-3 py-3 col-11 col-md-6 col-lg-5   d-flex flex-column justify-content-evenly align-items-center  rounded-5 text-center">
              <img src={emailImg} alt="Verify Email" />
              <h1 className="mt-2">
                Account created. <br />
                Please verify your email.
              </h1>
            </div>
          )}
          {showErrorPopup && <ErrorPopup message={validationError} />}
        </div>
      )}
    </>
  );
};

export default SignUp;
