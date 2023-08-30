import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import ErrorPopup from "../../components/errorPopup/ErrorPopup";

import "./Profile.scss";

const Profile = () => {
  const navigate = useNavigate();
  const [isFormChanged, setIsFormChanged] = useState(false); // Track form changes
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const [validationError, setValidationError] = useState(""); // State for validation error message
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State to toggle error popup
  const { user } = useContext(UserContext);

  //redirects if user is not signed in
  useEffect(() => {
    if (!user) navigate("/sign-up");
  }, [navigate, user]);

  const [formData, setFormData] = useState({
    name: user?.name,
    sex: user?.sex,
    age: user?.age || "",
  });

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
    const nameIsNotTooLong = formData.name.length <= 50;

    setIsFormValid(nameIsValid && ageIsValid && nameIsNotTooLong);

    // Update validation error message based on validation rules
    if (!nameIsValid) {
      setValidationError(
        "Name cannot be empty and must only contain letters and spaces"
      );
    } else if (!nameIsNotTooLong) {
      setValidationError("Name cannot be longer than 50 characters");
    } else if (!ageIsValid) {
      setValidationError("Age must be between 0 and 90");
    } else {
      setValidationError("");
    }
  }, [formData]);

  const saveChanges = () => {
    if (isFormValid) {
      console.log(formData); // Perform actual saving logic here
    } else {
      // Display the validation error message in a more user-friendly way
      if (validationError) {
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
    }
  };

  const [flashingDivs, setFlashingDivs] = useState([]);

  useEffect(() => {
    // Add div indexes to the flashingDivs array
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 13);
      setFlashingDivs((prevDivs) => {
        if (!prevDivs.includes(randomIndex)) {
          return [...prevDivs, randomIndex];
        }
        return prevDivs;
      });
    }, 1000);

    return () => clearInterval(interval); // Clear the interval on unmount
  }, []);
  return (
    <div className="profile col-11 col-md-7 mx-auto my-3 py-2 d-flex flex-column align-items-center justify-content-around rounded-5">
      <h1 className="py-1">Your Profile</h1>
      <div className="user-data d-flex my-3 px-3 py-3 justify-content-evenly">
        <div className="labels rounded-3 text-center px-2 d-flex flex-column justify-content-evenly">
          <label htmlFor="name">Name</label>
          <label htmlFor="email">Email</label>
          <label htmlFor="age">Age</label>
          <label htmlFor="sex">Sex</label>
        </div>
        <div className="form-container d-flex flex-column rounded-5 my-3">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={50}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            defaultValue={user?.email}
            disabled
          />
          <input
            type="number"
            placeholder="Not set"
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
              <span className="name">Male</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="sex"
                value="female"
                checked={formData.sex === "female"}
                onChange={handleChange}
              />
              <span className="name">Female</span>
            </label>
          </div>
        </div>
        {showErrorPopup && <ErrorPopup message={validationError} />}
      </div>

      <button
        className="mx-auto py-3 px-5 rounded"
        onClick={saveChanges}
        disabled={!isFormChanged}
      >
        Save Changes
      </button>
      <div className="intake col-10 text-center py-3 my-5 rounded">
        <h2 className="py-2">Your daily vitamin intake</h2>

        <div className="vitamin-list d-flex flex-wrap justify-content-center px-1 py-3">
          {user?.vitaminIntake.map((vitamin, index) => (
            <div
              key={vitamin.name}
              className={`d-flex flex-column ${
                flashingDivs.includes(index) ? "flash" : ""
              }`}
            >
              <h5>{vitamin.name}</h5>
              <span>300μ</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
