/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import "animate.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

import verifiedImg from "../../assets/email-verified.png";
import "./EmailVerification.scss";
let hasRun = false; // prevents double render && double request

const EmailVerification = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(true);
  const [animateClasses, setAnimateClasses] = useState(
    "animate__animated animate__bounceIn"
  );

  const startTimers = () => {
    // Add classes after one second
    const firstTimer = setTimeout(() => {
      setAnimateClasses("animate__animated animate__zoomOutUp");
    }, 1000);

    // Navigate after one second of the first timer
    const secondTimer = setTimeout(() => {
      navigate("/");
      window.location.reload(); // make sure that the changes from UserContext are applied
    }, 1000 + 600); // 1000ms for the first timer + delay

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
    }; // Cleanup to prevent memory leaks
  };

  useEffect(() => {
    if (!hasRun) {
      // Check the flag
      const token = new URLSearchParams(window.location.search).get("token");
      const verifyEmail = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/verify-email?token=${token}`,
            {
              withCredentials: true, // Enable sending cookies
            }
          );
          console.log(response.data);

          setIsVerified(true);
          startTimers();
        } catch (error) {
          console.log(error);
          console.error("Error verifying email:", error);
          navigate("/error");
        }
      };

      if (token) {
        verifyEmail();
      } else {
        navigate("/error");
      }
      hasRun = true; // Set the flag to true
    }
  }, []);

  return (
    <>
      {" "}
      {!isVerified && <Loader />}
      {isVerified && (
        <div
          className={`email-verified  col-11 col-md-8 col-xl-5 mx-auto my-2 rounded-5 d-flex flex-column justify-content-evenly align-items-center text-center ${animateClasses}`}
        >
          <img src={verifiedImg} alt="Email verified" className="img-fluid" />
          <h1 className=""> Email successfully verified!</h1>
        </div>
      )}
    </>
  );
};

export default EmailVerification;

// animate__tada;
// animate__bounceIn

// animate__zoomOutUp;
