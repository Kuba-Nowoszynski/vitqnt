import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import Loader from "../../components/loader/Loader";
import Button from "../../components/button/Button";
import calculateVitaminIntake from "../../calculateVitaminIntake";

import "./Calculator.scss";
const vitaminNames = [
  "c",
  "b1",
  "b2",
  "b3",
  "b5",
  "b6",
  "b7",
  "b9",
  "b12",
  "a",
  "d",
  "e",
  "k",
];

const Calculator = () => {
  const { user, loading } = useContext(UserContext);
  const [formData, setFormData] = useState({
    vitamin: "c",
    sex: user?.sex || "male",
    age: user?.age || 25,
  });
  const [dailyIntake, setDailyIntake] = useState(null);

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
    const { vitamin, sex, age } = formData;
    setDailyIntake(
      calculateVitaminIntake(vitamin, sex, age) +
        " of vitamin " +
        vitamin.toUpperCase()
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="calculator mx-auto">
          <h1 className="text-center py-4">CALCULATOR</h1>
          <div className="row p-0 g-0">
            <form
              className="col-12 col-md-6  d-flex flex-column justify-content-evenly "
              onSubmit={handleSubmit}
            >
              <div>
                {" "}
                <h3 className="text-center py-3">Choose your vitamin</h3>
                <div className="vitamin-radio d-flex flex-wrap  gap-3 justify-content-center ">
                  {vitaminNames.map((name, index) => (
                    <input
                      key={index}
                      // className="mx-3 my-2"
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
                {" "}
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
              <Button text="Submit" className="d-block mx-auto" />
            </form>
            <div className="col-12 col-md-6 px-5">
              <p className="text-warning fw-bold fs-1">
                <sub>99</sub>
                {dailyIntake || "Mockup"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calculator;
