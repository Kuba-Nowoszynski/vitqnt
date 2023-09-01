import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../../components/errorPopup/ErrorPopup";

import { UserContext } from "../../contexts/UserContext";
import "./SignIn.scss";

const SignIn = () => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const [validationError, setValidationError] = useState(""); // State for validation error message
  const [isDisabled, setIsDisabled] = useState(false); //prevent from multiple submites
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State to toggle error popup

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { user, loading } = useContext(UserContext);
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
        setValidationError("Email cannot be empty");
      } else if (!formData.password.trim()) {
        setValidationError("Password cannot be empty");
      } else {
        setValidationError("Email is not valid");
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
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/signin",
          formData,
          {
            withCredentials: true, // Enable sending cookies
          }
        );

        navigate("/");
        window.location.reload(); // make sure that the changes from UserContext are applied
        console.log(response.data.message); // Handle the response as needed
      } catch (error) {
        setIsFormValid(false);
        setValidationError(error.response.data.message);
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
        <div className="sign-in-component d-flex justify-content-center align-items-center ">
          <div className="form-box mx-auto  rounded-4 my-3">
            <form
              className="form mx-auto py-4 px-4 text-center d-flex flex-column  gap-3"
              onSubmit={!isDisabled ? handleSignin : null}
              autoComplete="on"
            >
              <span className="title">Sign in</span>
              <span className="subtitle">Sign in to your account</span>
              <div className="form-container d-flex flex-column flex-sm-row rounded-5 my-3">
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
                  autoComplete="current-password"
                />
              </div>
              <button
                className=" mx-auto py-3 px-5 rounded"
                onClick={handleSignin}
                disabled={isDisabled}
              >
                Sign in
              </button>
            </form>
            <div className="form-section text-center p-4">
              <p className="py-2">
                No account? <NavLink to="/sign-up">Sign up</NavLink>
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
