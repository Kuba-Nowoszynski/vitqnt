import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../../components/errorPopup/ErrorPopup";

import useSound from "use-sound";
import retroSound from "../../assets/sounds/retro-sound.wav";
import buzzSound from "../../assets/sounds/buzz-sound.wav";

import "./SignIn.scss";

const SignIn = () => {
  const [playRetro] = useSound(retroSound);
  const [playBuzz] = useSound(buzzSound);
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const [validationError, setValidationError] = useState(""); // State for validation error message
  const [isDisabled, setIsDisabled] = useState(false); //prevent from multiple submites
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State to toggle error popup

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {
    user,
    loading,
    apiUrl,
    languageText: { signIn: languageText },
  } = useContext(UserContext);
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

  useEffect(() => {
    const emailIsValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email);
    const passwordIsValid = formData.password.trim().length > 0;
    setIsFormValid(emailIsValid && passwordIsValid);
  }, [formData]);

  const handleSignin = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      if (!formData.email.trim()) {
        setValidationError(languageText.errorEmptyEmail);
      } else if (!formData.password.trim()) {
        setValidationError(languageText.errorEmptyPassword);
      } else {
        setValidationError(languageText.errorInvalidEmail);
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
    } else {
      try {
        const response = await axios.post(`${apiUrl}/signin`, formData, {
          withCredentials: true, // Enable sending cookies
        });
        playRetro();
        setTimeout(async () => {
          navigate("/");
          window.location.reload(); // make sure that the changes from UserContext are applied
        }, 600);
      } catch (error) {
        setIsFormValid(false);
        const errorMesage =
          error.response.data.error === "Incorrect password"
            ? languageText.errorIncorrectPassword
            : error.response.data.error === "User not found"
            ? languageText.errorUserNotFound
            : languageText.errorNotVerified;
        setValidationError(errorMesage);
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
        <div className="animate__animated animate__bounceIn sign-in-component d-flex justify-content-center align-items-center ">
          <div className="form-box mx-auto  rounded-4 my-3">
            <form
              className="form mx-auto py-4 px-4 text-center d-flex flex-column  gap-3"
              onSubmit={!isDisabled ? handleSignin : null}
              autoComplete="on"
            >
              <span className="title">{languageText.header}</span>
              <span className="subtitle">{languageText.subheader}</span>
              <div className="form-container d-flex flex-column flex-sm-row rounded-5 my-3">
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
                  autoComplete="current-password"
                />
              </div>
              <button
                className=" mx-auto py-3 px-5 rounded"
                onClick={handleSignin}
                disabled={isDisabled}
              >
                {languageText.button}
              </button>
            </form>
            <div className="form-section text-center p-4">
              <p className="py-2">
                {languageText.noAccount}{" "}
                <NavLink to="/sign-up">{languageText.signUp}</NavLink>
              </p>
            </div>
          </div>
          {showErrorPopup && <ErrorPopup message={validationError} />}
        </div>
      )}
    </>
  );
};

export default SignIn;
