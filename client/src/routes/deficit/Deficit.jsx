import { useState } from "react";
import Button from "../../components/button/Button";

import { vitaminFoods } from "./vitaminFoods";
import { foodImages } from "./foodImages";

import "./Deficit.scss";

const Deficit = () => {
  const [selectedFood, setSelectedFood] = useState([]);
  const [opinion, setOpinion] = useState(null);

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
    <div className="deficit mx-auto">
      <h1>DEFICIT</h1>
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

      <Button text="Check your deficity" onClick={handleSubmit} />
      {opinion && (
        <p className="fs-2 text-white">
          You are probably deficient in vitamin: {opinion}
        </p>
      )}
    </div>
  );
};

export default Deficit;
