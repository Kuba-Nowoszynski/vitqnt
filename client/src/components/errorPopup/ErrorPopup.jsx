/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./ErrorPopup.scss";

const ErrorPopup = ({ message, className }) => {
  const [popupClass, setPopupClass] = useState("animate__fadeInUp");

  useEffect(() => {
    // Set timeout to change class after 1 second
    const timeoutId = setTimeout(() => {
      setPopupClass("animate__fadeOutDown");
    }, 1100);

    return () => clearTimeout(timeoutId); // Clear timeout on unmount or re-render
  }, []);

  return (
    <div
      className={`error-popup rounded-pill text-center animate__animated ${popupClass} ${className}`}
    >
      {message}
    </div>
  );
};

export default ErrorPopup;
