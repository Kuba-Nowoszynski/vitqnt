import { useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Button from "../../components/button/Button";

import unauthorisedImg from "../../assets/unauthorised.png";
import arrowRestart from "../../assets/arrow-restart.png";
import { vitaminFoods } from "./vitaminFoods";
import { defaultVitaminValues } from "./defaultVitaminValues";
import { foodImages } from "./foodImages";

import useSound from "use-sound";
import clickSound from "../../assets/sounds/click-sound.wav";
import submitSound from "../../assets/sounds/drop-sound.wav";
import restartSound from "../../assets/sounds/correct-sound.wav";

import "./Deficit.scss";

const Deficit = () => {
  const [playClick] = useSound(clickSound);
  const [playSubmit] = useSound(submitSound);
  const [playRestart] = useSound(restartSound);

  const navigate = useNavigate();
  const {
    user,
    loading,
    languageText: { deficit: languageText },
  } = useContext(UserContext);
  const [selectedFood, setSelectedFood] = useState([]);
  const [response, setResponse] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opinion, setOpinion] = useState(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false); // Track animation completion
  const [animationIndex, setAnimationIndex] = useState(0);

  //redirect if user is not signed in
  useEffect(() => {
    if (!loading && !user) {
      const timer = setTimeout(() => {
        navigate("/sign-in"); // Navigate after 4 seconds
      }, 4000);
      return () => {
        clearTimeout(timer); // Clear the timer if the component unmounts
      };
    }
  }, [loading, user, navigate]);
  const handleClick = (foodName) => {
    playClick();
    setSelectedFood((prevSelectedFood) => {
      if (prevSelectedFood.includes(foodName)) {
        return prevSelectedFood.filter((item) => item !== foodName);
      } else {
        return [...prevSelectedFood, foodName];
      }
    });
  };

  const handleSubmit = () => {
    playSubmit();
    setResponse("");
    let result = [];
    let vitamins = defaultVitaminValues;
    selectedFood.forEach((foodName) => {
      const food = vitaminFoods.find((food) => food.name === foodName);
      for (const vitamin in food.vitamins) {
        vitamins[vitamin] += food.vitamins[vitamin];
      }
    });
    for (const vitamin in vitamins) {
      if (vitamins[vitamin] < 70) {
        result.push(`${vitamin.toUpperCase()}`);
      }
    }
    if (result.length)
      setOpinion(
        `${languageText.opinionBadStart} ${result.join(", ")}. ${
          languageText.opinionBadEnd
        }`
      );
    else setOpinion(languageText.opinionGood);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (response?.length < opinion?.length) {
        setResponse((prev) => prev + opinion[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentIndex(0);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [currentIndex, opinion, response]);

  const clearSelected = () => {
    playRestart();
    setSelectedFood([]);
    setOpinion(null);
  };

  useEffect(() => {
    // Function to add animation class to buttons with a wave effect
    const addAnimationClass = () => {
      setAnimationIndex((prev) => {
        if (prev + 1 > vitaminFoods.length) {
          // Stop condition
          setIsAnimationComplete(true);
          clearInterval(animationInterval); // Clear interval
          return prev;
        }
        return prev + 1;
      });
    };

    // Call the function initially
    addAnimationClass();

    // Set an interval to call the function every 70 milliseconds
    const animationInterval = setInterval(addAnimationClass, 70);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(animationInterval);
  }, []);

  return (
    <>
      {!loading && user && (
        <div className="animate__animated animate__fadeInLeft deficit d-flex flex-column  mx-auto mt-3 mt-lg-0">
          <h1 className="text-center p-2 mx-auto my-2 rounded ">
            {languageText.header}
          </h1>
          <h2 className="mx-auto my-2 text-center ">
            {languageText.subheader}
          </h2>
          <div className="d-flex flex-wrap justify-content-center">
            {vitaminFoods.map((food, i) => (
              <button
                className={`animate__animated food-btn m-2 btn rounded-4 ${
                  food.isVegan ? "btn-info" : "btn-light"
                } ${selectedFood.includes(food.name) && "selected"} ${
                  animationIndex >= i && "animate__bounceIn"
                }`}
                key={i}
                onClick={() => handleClick(food.name)}
              >
                <div className="description rounded">
                  <p className="">{languageText.foodDescriptions[food.name]}</p>
                </div>
                <img
                  src={foodImages[food.name]}
                  alt={languageText.foodDescriptions[food.name]}
                />
              </button>
            ))}
          </div>
          <div className="buttons mx-auto my-3">
            <Button
              text={languageText.check}
              onClick={handleSubmit}
              className={`check-btn ms-auto my-2 animate__animated ${
                isAnimationComplete && "animate__bounceIn"
              }`}
              disabled={currentIndex}
            />
            <button
              className={`restart-btn ms-sm-5 mx-auto d-block d-sm-inline btn btn-light rounded-circle mx-auto animate__animated ${
                isAnimationComplete && "animate__bounceIn"
              }`}
              onClick={clearSelected}
            >
              <img src={arrowRestart} alt="arrow restart" />
            </button>
          </div>
          {opinion && (
            <p className="fs-2 mb-3 text-white text-center">{response}</p>
          )}
        </div>
      )}
      {!loading && !user && (
        <div className="position-deficit-unauthorised my-5 d-flex flex-column justify-content-center">
          <div className="animate__animated animate__zoomInDown deficit-unauthorised col-11 col-md-8 mx-auto p-3 d-flex flex-column justify-content-center align-items-center rounded-5">
            <h1 className="text-center py-2 my-2">
              {languageText.unauthorised}
            </h1>
            <img
              src={unauthorisedImg}
              alt="unauthorised image"
              onClick={() => navigate("/sign-in")}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Deficit;
