/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Loader from "../../components/loader/Loader";

import verifiedImg from "../../assets/email-verified.png";
import "./EmailVerification.scss";

let hasRun = false; // prevents double render && double request

const EmailVerification = () => {
  const navigate = useNavigate();
  const {
    apiUrl,
    loading,
    user,
    languageText: { emailVerification: languageText },
  } = useContext(UserContext);
  const [isVerified, setIsVerified] = useState(false);
  const [hasExpired, setHasExpired] = useState(false);
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
      navigate("/deficit");
      window.location.reload(); // make sure that the changes from UserContext are applied
    }, 1000 + 700); // 1000ms for the first timer + delay

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
            `${apiUrl}/verify-email?token=${token}`,
            {
              withCredentials: true, // Enable sending cookies
            }
          );
          setIsVerified(true);
          startTimers();
        } catch (error) {
          console.error("Error verifying email:", error);
          setHasExpired(true);
        }
      };

      if (token && !user) {
        verifyEmail();
      } else if (user) {
        navigate("/");
      } else {
        setHasExpired(true);
      }
      hasRun = true; // Set the flag to true
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && isVerified && !user && !hasExpired && (
        <div
          className={`email-verified  col-11 col-md-8 col-xl-5 mx-auto my-2 rounded-5 d-flex flex-column justify-content-evenly align-items-center text-center ${animateClasses}`}
        >
          <img src={verifiedImg} alt="Email verified" className="img-fluid" />
          <h1 className="">{languageText.verified}</h1>
        </div>
      )}
      {!loading && !isVerified && hasExpired && (
        <div className="position-expired my-5 my-md-2 d-flex flex-column justify-content-center">
          <div className="expired animate__animated animate__bounceIn col-11 col-md-10 mx-auto my-auto d-flex flex-column justify-content-center align-items-center text-center rounded-5">
            <h1 className="">
              {languageText.expired}
              <NavLink to="/sign-up" className="again mt-3 py-3 rounded-5">
                {languageText.signAgain}
              </NavLink>
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailVerification;
