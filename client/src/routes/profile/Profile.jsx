import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import axios from "axios";
import ErrorPopup from "../../components/errorPopup/ErrorPopup";
import Loader from "../../components/loader/Loader";
import setVitaminIntake from "../../utils/setVitaminIntake";

import useSound from "use-sound";
import bellsSound from "../../assets/sounds/bells-sound.wav";
import buzzSound from "../../assets/sounds/buzz-sound.wav";
import "./Profile.scss";

const Profile = () => {
  const [playBells] = useSound(bellsSound);
  const [playBuzz] = useSound(buzzSound);
  const navigate = useNavigate();
  const {
    user,
    setUser,
    loading,
    apiUrl,
    languageText: { profile: languageText },
  } = useContext(UserContext);
  const [isFormChanged, setIsFormChanged] = useState(false); // Track form changes
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const [validationError, setValidationError] = useState(""); // State for validation error message
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State to toggle error popup
  const [showSavePopup, setShowSavePopup] = useState(false); // State to toggle save popup
  const [formData, setFormData] = useState({
    name: user?.name || "",
    sex: user?.sex || "male",
    age: user?.age || "",
    email: user?.email || "",
  });
  //redirects if user is not signed in
  useEffect(() => {
    if (!loading) {
      if (!user) navigate("/sign-up");
      else {
        const { name, sex, age, email } = user;
        setFormData({ name, sex, age, email });
      }
    }
  }, [navigate, user, loading]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setIsFormChanged(true);
    setValidationError(""); // Reset validation error message on change
    setShowErrorPopup(false); // Hide error popup when changes are made
  };

  useEffect(() => {
    const nameIsValid = /^[a-zA-Z\s\u00C0-\u024F]+$/.test(formData.name);
    const ageIsValid = formData.age >= 0 && formData.age <= 90;
    const nameIsNotTooLong = formData?.name?.length <= 50;

    setIsFormValid(nameIsValid && ageIsValid && nameIsNotTooLong);

    if (!nameIsValid) {
      setValidationError(languageText.errorEmptyName);
    } else if (!nameIsNotTooLong) {
      setValidationError(languageText.errorLongName);
    } else if (!ageIsValid) {
      setValidationError(languageText.errorInvalidAge);
    } else {
      setValidationError("");
    }
  }, [formData]);

  const saveChanges = async () => {
    if (isFormValid) {
      try {
        const response = await axios.put(`${apiUrl}/updateProfile`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        //update UserContext
        const updatedUser = response.data.user;
        setUser((prev) => ({
          ...prev,
          name: updatedUser.name,
          age: updatedUser.age,
          sex: updatedUser.sex,
          vitaminIntake: setVitaminIntake(updatedUser.sex, updatedUser.age),
        }));
        playBells();
        setShowSavePopup(true); // Show save popup when form is valid
        setIsFormChanged(false); // Prevent from clicking the button
        // Set a timeout to hide the save popup after 2 seconds
        const savePopupTimeout = setTimeout(() => {
          setShowSavePopup(false);
          setIsFormChanged(true);
        }, 2000);

        return () => {
          clearTimeout(savePopupTimeout); // Clear the timeout if the component unmounts or if this effect is re-run
        };
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else if (validationError) {
      playBuzz();

      setShowErrorPopup(true); // Show error popup when form is not valid
      setIsFormChanged(false); // Prevent from clicking the button

      // Set a timeout to hide the error popup after 2 seconds
      const errorTimeout = setTimeout(() => {
        setShowErrorPopup(false);
        setIsFormChanged(true);
      }, 2000);

      return () => {
        clearTimeout(errorTimeout); // Clear the timeout if the component unmounts or if this effect is re-run
      };
    }
  };

  const [flashingDivs, setFlashingDivs] = useState([]);
  const [usedIndexes, setUsedIndexes] = useState([]);

  // Manages a flashing effect on div elements
  useEffect(() => {
    const interval = setInterval(() => {
      if (usedIndexes.length < user.vitaminIntake.length) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * user.vitaminIntake.length);
        } while (usedIndexes.includes(randomIndex));
        setUsedIndexes((prevUsed) => [...prevUsed, randomIndex]);
        setFlashingDivs((prevDivs) => [...prevDivs, randomIndex]);
      } else {
        clearInterval(interval); // Stop the interval when all indexes are used
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [usedIndexes]);

  return (
    <>
      {!loading && user && (
        <div className="animate__animated animate__fadeInDown profile col-11 col-md-7 mx-auto my-3 py-2 d-flex flex-column align-items-center justify-content-around rounded-5">
          <h1 className="py-1">{languageText.header}</h1>
          <div className="intake col-10 text-center py-3 my-5 rounded">
            {loading && <Loader />}
            <h2 className="py-2">{languageText.dailyIntake}</h2>
            <div className="vitamin-list d-flex flex-wrap justify-content-center px-1 py-3">
              {user?.vitaminIntake.map((vitamin, index) => (
                <div
                  key={vitamin.name}
                  className={`d-flex rounded-pill ${
                    flashingDivs.includes(index)
                      ? "animate__animated animate__bounceIn"
                      : ""
                  }`}
                >
                  <h5 className="pe-2">
                    {languageText.vitamin} {vitamin.name[0].toUpperCase()}
                    {vitamin.name.length > 1 && (
                      <sub>{vitamin.name.slice(1)}</sub>
                    )}
                  </h5>
                  <span className="ps-2">{vitamin.amount}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="user-data d-flex my-3 px-3 py-3 justify-content-evenly">
            <div className="labels rounded-3 text-center px-2 d-flex flex-column justify-content-evenly">
              <label htmlFor="name">{languageText.name}</label>
              <label htmlFor="email">{languageText.email}</label>
              <label htmlFor="age">{languageText.age}</label>
              <label htmlFor="sex">{languageText.sex}</label>
            </div>
            <div className="form-container d-flex flex-column rounded-5 my-3">
              <input
                type="text"
                placeholder={languageText.placeholderName}
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                maxLength={50}
                required
              />
              <input
                type="email"
                placeholder={languageText.placeholderEmail}
                name="email"
                id="email"
                defaultValue={formData.email}
                disabled
              />
              <input
                type="number"
                placeholder={languageText.placeholderAge}
                name="age"
                id="age"
                value={formData.age}
                onChange={handleChange}
                min={0}
                max={90}
                required
              />
              <div className="radio-inputs px-4 py-3 ">
                <label className="radio">
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    checked={formData.sex === "male"}
                    onChange={handleChange}
                  />
                  <span className="name">{languageText.male}</span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    checked={formData.sex === "female"}
                    onChange={handleChange}
                  />
                  <span className="name">{languageText.female}</span>
                </label>
              </div>
            </div>
            {showErrorPopup && <ErrorPopup message={validationError} />}
            {showSavePopup && (
              <ErrorPopup message={languageText.saved} className="green" />
            )}
          </div>

          <button
            className="mx-auto py-3 px-5  mb-4 rounded"
            onClick={saveChanges}
            disabled={!isFormChanged}
          >
            {languageText.button}
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
