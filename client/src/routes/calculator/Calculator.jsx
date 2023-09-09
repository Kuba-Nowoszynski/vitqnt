import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import Loader from "../../components/loader/Loader";
import Button from "../../components/button/Button";
import calculateVitaminIntake from "../../utils/calculateVitaminIntake";
import vitaminFunFacts from "./vitaminFunFacts";
import vitaminNames from "./vitaminNames";
import { foodImages } from "../deficit/foodImages";

import useSound from "use-sound";
import clickSound from "../../assets/sounds/click-sound.wav";
import tapSound from "../../assets/sounds/tap-sound.wav";
import wooshSound from "../../assets/sounds/woosh-sound.wav";
import submitSound from "../../assets/sounds/correct-sound.wav";
import "./Calculator.scss";

const Calculator = () => {
  const [playClick] = useSound(clickSound);
  const [playTap] = useSound(tapSound);
  const [playWoosh] = useSound(wooshSound);
  const [playSubmit] = useSound(submitSound);
  const {
    user,
    loading,
    languageText: { calculator: languageText },
  } = useContext(UserContext);
  const [formData, setFormData] = useState({
    vitamin: "c",
    sex: user?.sex || "male",
    age: user?.age || 25,
  });
  const [dailyIntake, setDailyIntake] = useState(null);
  const [response, setResponse] = useState(
    `${languageText.didYouKnow} ${
      languageText.vitaminFunFacts[Math.floor(Math.random() * 13)]
    }`
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomFoodImg, setRandomFoodImg] = useState(null);

  //wait for getting the user data and sets it from context
  useEffect(() => {
    if (!loading) {
      if (user) setFormData({ vitamin: "c", sex: user.sex, age: user.age });
    }
  }, [user, loading]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "vitamin") playClick();
    if (name === "sex") playTap();
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    playSubmit();

    event.preventDefault();
    setResponse("");
    const { vitamin, sex, age } = formData;
    const calculatedIntake = calculateVitaminIntake(vitamin, sex, age);
    const suggestedFood = `${languageText.vitaminSources[vitamin]
      .slice(0, 2)
      .join(", ")} ${languageText.and} ${
      languageText.vitaminSources[vitamin][2]
    }`;

    setDailyIntake(
      `${languageText.recommendedIntake} ${vitamin.toUpperCase()} ${
        languageText.amountsTo
      } ${calculatedIntake}. ${
        languageText.recommendedSources
      } ${suggestedFood}.`
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

  //set random img on component mount
  useEffect(() => {
    const imagesArray = Object.values(foodImages);
    const randomIndex = Math.floor(Math.random() * imagesArray.length);
    setRandomFoodImg(imagesArray[randomIndex]);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="animate__animated animate__fadeInLeft calculator mx-auto">
          <h1 className="text-center p-2 mx-auto rounded my-4 my-sm-2">
            {languageText.header}
          </h1>

          <div className="row p-0 g-0 mt-2">
            <form
              className="col-12 col-md-6  d-flex flex-column justify-content-between mt-md-3 mb-xl-4"
              onSubmit={!currentIndex ? handleSubmit : null}
            >
              <div>
                {" "}
                <h3 className="text-center py-3">{languageText.choose}</h3>
                <div className="vitamin-radio d-flex flex-wrap  gap-3 justify-content-center col-xl-8 mx-auto">
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
                  {languageText.age}: {formData.age}
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
                  onMouseDown={playWoosh}
                  onMouseUp={playWoosh}
                />
              </div>

              <div className="radio-inputs my-3">
                <label className="radio">
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    checked={formData.sex === "male"}
                    onChange={handleInputChange}
                  />
                  <span className="name">{languageText.male}</span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    checked={formData.sex === "female"}
                    onChange={handleInputChange}
                  />
                  <span className="name">{languageText.female}</span>
                </label>
                <label className="radio">
                  <input type="radio" disabled />
                  <span className="name sex">{languageText.sex}</span>
                </label>
              </div>
              <Button
                text={languageText.button}
                className="d-block mx-auto mb-md-0"
                disabled={currentIndex}
              />
            </form>
            <div className="col-12 col-md-6 mt-5 mt-md-0">
              <p className="response  ms-5 mt-4 ">
                {response ||
                  `Did you know that ${
                    vitaminFunFacts[Math.floor(Math.random() * 13)]
                  }`}
              </p>
              <img
                src={randomFoodImg}
                alt="random food img"
                className="food-img d-none d-xl-block m-auto ms-auto"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calculator;
