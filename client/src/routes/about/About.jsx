import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import "./About.scss";

const About = () => {
  const {
    languageText: { about: languageText },
  } = useContext(UserContext);
  return (
    <div className="animate__animated animate__fadeInUp about mx-auto mt-5 mt-lg-0 mb-5 col-10 col-xl-8 rounded-5">
      <h1 className="mx-auto text-center mb-4">{languageText.header}</h1>
      <p>
        <span>{languageText.welcome}</span> {languageText.subheader}
      </p>
      <h2 className="my-2">{languageText.heading1}</h2>{" "}
      <p>{languageText.paragraph1}</p>
      <h2 className="my-2">{languageText.heading2}</h2>
      <ul>
        <li>
          <b>{languageText.bolded1}</b> {languageText.list1}
        </li>
        <li>
          <b>{languageText.bolded2}</b> {languageText.list2}
        </li>
        <li>
          <b>{languageText.bolded3}</b> {languageText.list3}
        </li>
        <li>
          <b>{languageText.bolded4}</b> {languageText.list4}
        </li>
      </ul>
      <p className="mt-5 fs-5">{languageText.footer}</p>
    </div>
  );
};

export default About;
