import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import "./LanguageSwitch.scss";

const LanguageSwitch = ({ className }) => {
  const { language, setLanguage } = useContext(UserContext);

  const handleSwitch = () => {
    const newLanguage = language === "polish" ? "english" : "polish";
    setLanguage(newLanguage);
    localStorage.setItem("selectedLanguage", newLanguage);
  };

  return (
    <div
      className={`language-switch rounded-pill ${className} ${
        language === "polish" && "changed"
      }`}
    >
      <div
        className="switch-button rounded-circle"
        onClick={handleSwitch}
      ></div>
    </div>
  );
};

export default LanguageSwitch;
