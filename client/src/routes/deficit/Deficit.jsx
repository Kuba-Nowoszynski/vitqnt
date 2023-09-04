import { useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Button from "../../components/button/Button";

import unauthorisedImg from "../../assets/unauthorised.png";
import { vitaminFoods } from "./vitaminFoods";
import { foodImages } from "./foodImages";

import "./Deficit.scss";

const Deficit = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(UserContext);
  const [selectedFood, setSelectedFood] = useState([]);
  const [opinion, setOpinion] = useState(null);

  //redirect if user is not signed in
  useEffect(() => {
    if (!loading && !user) {
      const timer = setTimeout(() => {
        navigate("/sign-in"); // Navigate after 5 seconds
      }, 4000);
      return () => {
        clearTimeout(timer); // Clear the timer if the component unmounts
      };
    }
  }, [loading, user, navigate]);
  const handleClick = (foodName) => {
    if (selectedFood.includes(foodName)) {
      setSelectedFood(selectedFood.filter((item) => item !== foodName));
    } else setSelectedFood([...selectedFood, foodName]);
  };

  const handleSubmit = () => {
    let result = [];
    let vitamins = {
      a: 0,
      b1: 0,
      b2: 0,
      b3: 0,
      b5: 0,
      b6: 0,
      b7: 0,
      b9: 0,
      b12: 0,
      c: 0,
      d: 0,
      e: 0,
      k: 0,
    };
    selectedFood.forEach((foodName) => {
      const food = vitaminFoods.find((food) => food.name === foodName);
      for (const vitamin in food.vitamins) {
        vitamins[vitamin] += food.vitamins[vitamin];
      }
    });
    for (const vitamin in vitamins) {
      if (vitamins[vitamin] < 50) result.push(`${vitamin}`);
    }
    console.log(vitamins);
    setOpinion(result.join(", "));
  };

  return (
    <>
      {!loading && user && (
        <div className="animate__animated animate__fadeInLeft deficit d-flex flex-column  mx-auto">
          <h1 className="text-center p-3 mx-auto mt-2 mb-5 rounded ">
            Vitamin Deficit Checker
          </h1>
          <div className="d-flex flex-wrap justify-content-center">
            {vitaminFoods.map((food, i) => (
              <button
                className={`food-btn m-2 btn ${
                  food.isVegan ? "btn-info" : "btn-light"
                } ${selectedFood.includes(food.name) && "selected"}`}
                key={i}
                onClick={() => handleClick(food.name)}
              >
                <div className="description rounded ">
                  <p className="">{food.description}</p>
                </div>
                <img src={foodImages[food.name]} alt={food.description} />
              </button>
            ))}
          </div>

          <Button
            text="Check your deficit"
            onClick={handleSubmit}
            className="mx-auto my-2"
          />
          {opinion && (
            <p className="fs-2 text-white text-center">
              You are probably deficient in vitamin: {opinion}
            </p>
          )}
        </div>
      )}
      {!loading && !user && (
        <div className="position-deficit-unauthorised my-5 d-flex flex-column justify-content-center">
          <div className="animate__animated animate__zoomInDown deficit-unauthorised col-11 col-md-8 mx-auto p-3 d-flex flex-column justify-content-center align-items-center rounded-5">
            <h1 className="text-center py-2 my-2">
              You have to be signed in to use this feature
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
