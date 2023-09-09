import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import useSound from "use-sound";
import retroSound from "../../assets/sounds/retro-sound.wav";
import correctSound from "../../assets/sounds/correct-sound.wav";
import "./LanguageSwitch.scss";

const LanguageSwitch = ({ className }) => {
  const [playRetro] = useSound(retroSound);
  const [playCorrect] = useSound(correctSound);
  const { language, setLanguage } = useContext(UserContext);

  const handleSwitch = () => {
    const newLanguage = language === "polish" ? "english" : "polish";
    if (newLanguage === "polish") playCorrect();
    else playRetro();
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
