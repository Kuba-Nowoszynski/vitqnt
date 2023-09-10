/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ErrorPopup from "../../components/errorPopup/ErrorPopup";

import useSound from "use-sound";
import buzzSound from "../../assets/sounds/buzz-sound.wav";
import bellsSound from "../../assets/sounds/bells-sound.wav";
import emailImg from "../../assets/email-account.png";
import "./SignUp.scss";

let hasRun = false; // prevents double render && double request
const SignUp = () => {
  const [playBells] = useSound(bellsSound);
  const [playBuzz] = useSound(buzzSound);
  const navigate = useNavigate();
  const {
    user,
    loading,
    apiUrl,
    language,
    languageText: { signUp: languageText },
  } = useContext(UserContext);

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
      setValidationError(languageText.errorInvalidName);
    } else if (!emailIsValid) {
      setValidationError(languageText.errorInvalidEmail);
    } else if (!passwordIsValid) {
      setValidationError(languageText.errorInvalidPassword);
    } else if (!ageIsValid) {
      setValidationError(languageText.errorInvalidAge);
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
          await axios.post(`${apiUrl}/signup`, { formData, language });
          playBells();
          hasRun = true;
          setIsAnimated(true);

          let timeout = setTimeout(() => {
            setIsCreated(true);
          }, 500);
          return () => {
            clearTimeout(timeout);
          };
        } catch (error) {
          setIsFormValid(false);
          setValidationError(languageText.errorUserExists);
          playBuzz();
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
      } else {
        // Check if any of the input fields are empty
        if (!formData.name.trim()) {
          setValidationError(languageText.errorEmptyName);
        } else if (!formData.email.trim()) {
          setValidationError(languageText.errorEmptyEmail);
        } else if (!formData.password.trim()) {
          setValidationError(languageText.errorEmptyPassword);
        } else if (!formData.age.trim()) {
          setValidationError(languageText.errorEmptyAge);
        }
        playBuzz();
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
    e.preventDefault();
  };

  return (
    <>
      {!loading && !user && (
        <div className="animate__animated animate__bounceIn sign-component d-flex justify-content-center align-items-center ">
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
                <span className="title">{languageText.header}</span>
                <span className="subtitle">{languageText.subheader}</span>
                <div className="form-container d-flex flex-column flex-sm-row rounded-5 my-3">
                  {" "}
                  <input
                    type="text"
                    placeholder={languageText.placeholderName}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                  <input
                    type="email"
                    placeholder={languageText.placeholderEmail}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="username email"
                  />
                  <input
                    type="password"
                    placeholder={languageText.placeholderPassword}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                  <input
                    type="number"
                    placeholder={languageText.placeholderAge}
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
                  {languageText.button}
                </button>
              </form>
              <div className="form-section text-center p-4">
                <p className="py-2">
                  {languageText.haveAnAccount}{" "}
                  <NavLink to="/sign-in">{languageText.logIn}</NavLink>
                </p>
              </div>
            </div>
          )}
          {isCreated && (
            <div className="verify-email animate__animated animate__fadeIn mx-auto my-3 py-3 col-11 col-md-6 col-lg-5   d-flex flex-column justify-content-evenly align-items-center  rounded-5 text-center">
              <img src={emailImg} alt="Verify Email" />
              <h1 className="mt-2">
                {languageText.accountCreated}
                <br />
                {languageText.verifyEmail}
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
