import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Button from "../../components/button/Button";

import arrowDown from "../../assets/arrow-down.png";
import calculatorPreview from "../../assets/calculator-preview.png";
import deficitPreview from "../../assets/deficit-preview.png";

import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  const {
    languageText: { home: languageText },
  } = useContext(UserContext);

  return (
    <div className="home-page">
      <motion.div
        className="home-1 pt-5 "
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="hero row p-0 g-0 ps-5 align-elements-center ">
          <h1 className="header col-10 col-lg-7 ">{languageText.header}</h1>
          <div className="row p-0 g-0 ">
            <h3 className="subheader col-8 col-md-6 col-lg-4 my-3 my-xxl-4">
              {languageText.subheader}
            </h3>
          </div>
          <div className="row p-0 g-0 ps-3 ">
            <Button
              className="col-6 col-sm-4 col-md-2 ms-5 "
              text={"test here"}
              onClick={() => navigate("/calculator")}
            />
          </div>
        </div>
        <motion.div
          className="home-intersection mt-xl-5 pt-xl-5 d-flex flex-column  justify-content-center align-items-center text-center"
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="rounded-5 px-2 my-2">{languageText.scroll}</span>
          <img className="arrow-down" src={arrowDown} alt="arrow down" />
        </motion.div>
      </motion.div>

      <div className="home-2 pt-xl-5 my-5 d-flex flex-column justify-content-center">
        <motion.div
          className="row g-1 p-0 px-5 d-flex flex-column-reverse flex-xl-row"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="col-xl-5 my-3 m-xl-0 d-flex align-items-center ">
            <p className="">{languageText.calculatorDescription}</p>
          </div>
          <img
            className="col-xl-7 d-block mx-auto rounded-4"
            src={calculatorPreview}
            alt="calculator preview"
            onClick={() => navigate("/calculator")}
          />
        </motion.div>
      </div>
      <div className="home-3 my-5 pt-xl-5 d-flex flex-column justify-content-center">
        <motion.div
          className="row g-1 p-0 px-5"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            className="col-xl-6 d-block mx-auto rounded-4"
            src={deficitPreview}
            alt="deficit preview"
            onClick={() => navigate("/deficit")}
          />
          <div className="my-3 col-xl-6 d-flex align-items-center text-end ">
            <p className="">{languageText.deficitDescription}</p>
          </div>
        </motion.div>
      </div>
      <div className="home-4 my-5 pt-xl-5 d-flex flex-column justify-content-center">
        <motion.div
          className="row g-1 p-0 px-5 text-center"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2>{languageText.moreFeatures}</h2>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
