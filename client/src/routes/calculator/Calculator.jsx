import { useState } from "react";
import Button from "../../components/button/Button";
import "./Calculator.scss";

const Calculator = () => {
  const [formData, setFormData] = useState({
    vitamin: "a",
    gender: "male",
    age: 25,
  });
  const [score, setScore] = useState(null);

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    const { vitamin, gender, age } = formData;

    //handle algorithm
    setScore(
      age * (gender === "male" ? 1.2 : 1.5) +
        " units of vitamin " +
        vitamin.toUpperCase()
    );
  };

  return (
    <div className="calculator mx-auto">
      <h1 className="text-center py-4">CALCULATOR</h1>
      <div className="row p-0 g-0">
        <form
          className="col-12 col-md-6  d-flex flex-column justify-content-evenly "
          onSubmit={handleSubmit}
        >
          <div className="form-floating ">
            <select
              className="form-select "
              id="vitamin-select"
              aria-label="Choose your vitamin"
              name="vitamin"
              value={formData.vitamin}
              onChange={handleInputChange}
            >
              <option value="a">Vitamin A</option>
              <option value="b">Vitamin B</option>
              <option value="c">Vitamin C</option>
            </select>
            <label htmlFor="vitamin-select ">Choose your vitamin</label>
          </div>
          <label htmlFor="age" className="form-label text-center d-block">
            Age: {formData.age}
          </label>
          <div className="d-flex justify-content-evenly">
            {Array.from({ length: 6 }, (_, index) => (
              <span key={index}>{(index + 1) * 10}</span>
            ))}
          </div>

          <input
            type="range"
            className="form-range custom-range"
            min="1"
            max="70"
            step="1"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
          <div className="radio-inputs my-3">
            <label className="radio">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleInputChange}
              />
              <span className="name">Male</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleInputChange}
              />
              <span className="name">Female</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="gender"
                value="sex"
                disabled
                checked={formData.gender === "sex"}
              />
              <span className="name sex">Sex</span>
            </label>
          </div>
          <Button text="Submit" className="d-block mx-auto" />
        </form>
        <div className="col-12 col-md-6 px-5">
          <p className="text-warning fw-bold fs-1">{score || "Mockup"}</p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;