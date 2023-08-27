import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import "./SignIn.scss";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/signin",
        formData,
        {
          withCredentials: true, // Enable sending cookies
        }
      );

      navigate("/");
      window.location.reload(); // make sure that the changes from UserContext are applied
      console.log(response.data.message); // Handle the response as needed
    } catch (error) {
      console.error("Error signing up:", error);
      navigate("/error");
    }
  };

  return (
    <div className="sign-in-component d-flex justify-content-center align-items-center ">
      <div className="form-box mx-auto  rounded-4 my-3">
        <form className="form mx-auto py-4 px-4 text-center d-flex flex-column  gap-3  ">
          <span className="title">Sign in</span>
          <span className="subtitle">Sign in to your account</span>
          <div className="form-container d-flex flex-column flex-sm-row rounded-5 my-3">
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
          <button className=" mx-auto py-3 px-5 rounded" onClick={handleSignin}>
            Sign in
          </button>
        </form>
        <div className="form-section text-center p-4">
          <p className="py-2">
            No account? <NavLink to="/sign-up">Sign up</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
