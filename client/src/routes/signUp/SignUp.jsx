import { NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import emailImg from "../../assets/email-account.png";
import "./SignUp.scss";

let hasRun = false; // prevents double render && double request
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isCreated, setIsCreated] = useState(false);
  const { user } = useContext(UserContext);

  //redirect user if signed in- show "you are already signed in"  and redirect to /profile
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    if (!hasRun) {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:3000/api/signup",
          formData
        );
        hasRun = true;
        setIsCreated(true);

        console.log(response.data); // Handle the response as needed
      } catch (error) {
        console.error("Error signing up:", error);
        navigate("/error");
      }
    }
  };

  return (
    <div className="sign-up-component d-flex justify-content-center align-items-center ">
      {!isCreated && (
        <div className="form-box mx-auto  rounded-4 my-3">
          <form className="form mx-auto py-4 px-4 text-center d-flex flex-column  gap-3  ">
            <span className="title">Sign up</span>
            <span className="subtitle">
              Create a free account with your email
            </span>
            <div className="form-container d-flex flex-column flex-sm-row rounded-5 my-3">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              className=" mx-auto py-3 px-5 rounded"
              onClick={handleSignup}
            >
              Sign up
            </button>
          </form>
          <div className="form-section text-center p-4">
            <p className="py-2">
              Have an account? <NavLink to="/sign-in">Log in</NavLink>
            </p>
          </div>
        </div>
      )}
      {isCreated && (
        <div className="verify-email mx-auto my-3 d-flex flex-column justify-content-evenly align-items-center  rounded-5 text-center">
          <img src={emailImg} alt="Verify Email" />
          <h1>
            Account created. <br />
            Please verify your email.
          </h1>
        </div>
      )}
    </div>
  );
};

export default SignUp;
