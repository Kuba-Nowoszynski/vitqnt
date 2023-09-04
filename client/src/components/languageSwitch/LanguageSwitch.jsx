import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import "./LanguageSwitch.scss";

const LanguageSwitch = () => {
  const { language, setLanguage } = useContext(UserContext);

  console.log(language);

  const handleSwitch = () => {
    setLanguage((prev) => (prev === "english" ? "polish" : "english"));
  };

  return (
    <div
      className={`language-switch rounded-pill ${
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
