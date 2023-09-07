import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../../components/errorPopup/ErrorPopup";

import useSound from "use-sound";
import wooshSound from "../../assets/sounds/woosh-sound.wav";
import buzzSound from "../../assets/sounds/buzz-sound.wav";
import "./Contact.scss";

const Contact = () => {
  const [playWoosh] = useSound(wooshSound);
  const [playBuzz] = useSound(buzzSound);
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const [validationError, setValidationError] = useState(""); // State for validation error message
  const [isDisabled, setIsDisabled] = useState(false); //prevent from multiple submites
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State to toggle error popup
  const [isSent, setIsSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const {
    apiUrl,
    languageText: { contact: languageText },
  } = useContext(UserContext);
  //redirect user if signed in

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
    setIsFormValid(emailIsValid);
  }, [formData.email]);

  const handleSignin = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      if (!formData.email.trim()) {
        setValidationError(languageText.errorEmptyEmail);
      } else if (!formData.subject.trim()) {
        setValidationError(languageText.errorEmptySubject);
      } else if (!formData.message.trim()) {
        setValidationError(languageText.errorEmptyMessage);
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
        const response = await axios.post(`${apiUrl}/contact`, formData, {
          withCredentials: true, // Enable sending cookies
        });
        playWoosh();
        //animate
        setIsSent(true);
        //navigate after 1s
        const timeout = setTimeout(() => {
          navigate("/");
        }, 1000);

        return () => {
          clearTimeout(timeout); // Clear the timeout if the component unmounts or if this effect is re-run
        };
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="animate__animated animate__bounceIn sign-in-component d-flex justify-content-center align-items-center ">
        <div
          className={`form-box mx-auto rounded-4 my-3 animate__animated ${
            isSent && "animate__zoomOutUp"
          }`}
        >
          <form
            className="form mx-auto py-4 px-4 text-center d-flex flex-column  gap-3"
            onSubmit={!isDisabled ? handleSignin : null}
          >
            <span className="title">{languageText.header}</span>
            <span className="subtitle">{languageText.subheader}</span>
            <div className="form-container mx-auto my-3 col-12 col-lg-8 d-flex flex-column rounded-5">
              <input
                type="email"
                placeholder={languageText.placeholderEmail}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder={languageText.placeholderSubject}
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                cols="30"
                rows="10"
                required
                placeholder={languageText.placeholderMessage}
              ></textarea>
            </div>

            <button
              className=" mx-auto py-3 px-5 rounded"
              onClick={handleSignin}
              disabled={isDisabled}
            >
              {languageText.button}
            </button>
          </form>
        </div>
        {showErrorPopup && <ErrorPopup message={validationError} />}
      </div>
    </>
  );
};

export default Contact;
