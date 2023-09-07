import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import "./PrivacyPolicy.scss";

const PrivacyPolicy = () => {
  const {
    languageText: { privacyPolicy: languageText },
  } = useContext(UserContext);

  return (
    <div className="animate__animated animate__fadeIn privacy-policy  mx-auto mt-4 mt-lg-0 mb-5 rounded-pill ">
      <div className="text col-9 mx-auto text-center">
        <h1 className="pt-lg-5">{languageText.header}</h1>
        <h6 className="py-2">{languageText.subheader}</h6>
        <h2>{languageText.heading1}</h2>
        <p>{languageText.paragraph1}</p>
        <h3>{languageText.heading2}</h3>
        <p>{languageText.paragraph2}</p>
        <h3>{languageText.heading3}</h3>
        <p>{languageText.paragraph3}</p>
        <h3>{languageText.heading4}</h3>
        <p>{languageText.paragraph4}</p>
        <h3>{languageText.heading5}</h3>
        <p>{languageText.paragraph5}</p>
        <h3>{languageText.heading6}</h3>
        <p className="col-10 col-lg-6 mx-auto">
          {languageText.paragraph6}{" "}
          <a href="mailto:vitqntservice@gmail.com" className="fw-bold">
            vitqntservice@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
