import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import Loader from "../../components/loader/Loader";
import Button from "../../components/button/Button";
import calculateVitaminIntake from "../../utils/calculateVitaminIntake";
import vitaminFunFacts from "./vitaminFunFacts";
import vitaminSources from "./vitaminSources";
import vitaminNames from "./vitaminNames";

import "./Calculator.scss";

const Calculator = () => {
  const { user, loading } = useContext(UserContext);
  const [formData, setFormData] = useState({
    vitamin: "c",
    sex: user?.sex || "male",
    age: user?.age || 25,
  });
  const [dailyIntake, setDailyIntake] = useState(null);
  const [response, setResponse] = useState(
    `Did you know that ${vitaminFunFacts[Math.floor(Math.random() * 13)]}`
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  //wait for getting the user data and sets it from context
  useEffect(() => {
    if (!loading) {
      if (user) setFormData({ vitamin: "c", sex: user.sex, age: user.age });
    }
  }, [user, loading]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setResponse("");

    const { vitamin, sex, age } = formData;
    const calculatedIntake = calculateVitaminIntake(vitamin, sex, age);
    const suggestedFood =
      vitaminSources[vitamin].slice(0, 2).join(", ") +
      " and " +
      vitaminSources[vitamin][2];

    setDailyIntake(
      "Your recommended daily intake of vitamin " +
        vitamin.toUpperCase() +
        " amounts to " +
        calculatedIntake +
        ". Great recommended vitamin sources include " +
        suggestedFood
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (response?.length < dailyIntake?.length) {
        setResponse((prev) => prev + dailyIntake[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentIndex(0);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [currentIndex, dailyIntake, response]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="animate__animated animate__fadeInLeft calculator mx-auto">
          <h1 className="text-center p-3 mx-auto rounded my-4 my-sm-2">
            Vitamin Intake Calculator
          </h1>

          <div className="row p-0 g-0 mt-2">
            <form
              className="col-12 col-md-6  d-flex flex-column justify-content-evenly mt-5 mt-sm-0"
              onSubmit={!currentIndex && handleSubmit}
            >
              <div>
                {" "}
                <h3 className="text-center py-3">Choose your vitamin</h3>
                <div className="vitamin-radio d-flex flex-wrap  gap-3 justify-content-center ">
                  {vitaminNames.map((name, index) => (
                    <input
                      key={index}
                      type="radio"
                      name="vitamin"
                      value={name}
                      checked={formData.vitamin === name}
                      data-label={name}
                      onChange={handleInputChange}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 htmlFor="age" className="age-display text-center py-3 ">
                  Age: {formData.age}
                </h3>
                <div className="age-range d-flex justify-content-evenly">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className="">
                      {(index + 1) * 15}
                    </span>
                  ))}
                </div>
                <input
                  type="range"
                  className="form-range custom-range"
                  min="0"
                  max="90"
                  step="1"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>

              <div className="radio-inputs my-3 ">
                <label className="radio">
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    checked={formData.sex === "male"}
                    onChange={handleInputChange}
                  />
                  <span className="name">Male</span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    checked={formData.sex === "female"}
                    onChange={handleInputChange}
                  />
                  <span className="name">Female</span>
                </label>
                <label className="radio">
                  <input type="radio" disabled />
                  <span className="name sex">sex</span>
                </label>
              </div>
              <Button
                text="Check"
                className="d-block mx-auto"
                disabled={currentIndex}
              />
            </form>
            <div className="col-12 col-md-6">
              <p className="response  ms-5 mt-4 ">
                {response ||
                  `Did you know that ${
                    vitaminFunFacts[Math.floor(Math.random() * 13)]
                  }`}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calculator;
