import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Button from "../../components/button/Button";

import arrowDown from "../../assets/arrow-down.png";
import calculatorPreview from "../../assets/calculator-preview.png";
import calculatorPreviewPolish from "../../assets/calculator-preview-polish.png";
import calculatorPreviewMobile from "../../assets/calculator-preview-mobile.png";
import calculatorPreviewMobilePolish from "../../assets/calculator-preview-mobile-polish.png";
import deficitPreview from "../../assets/deficit-preview.png";
import deficitPreviewPolish from "../../assets/deficit-preview-polish.png";
import deficitPreviewMobile from "../../assets/deficit-preview-mobile.png";
import deficitPreviewMobilePolish from "../../assets/deficit-preview-mobile-polish.png";

import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  const {
    language,
    languageText: { home: languageText },
  } = useContext(UserContext);

  const [previewImages, setPreviewImages] = useState({
    calculator: calculatorPreview,
    deficit: deficitPreview,
  });

  //change preivew images depending on viewport and language
  useEffect(() => {
    // Check the viewport width and set the appropriate preview image
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setPreviewImages(
          language === "english"
            ? {
                calculator: calculatorPreviewMobile,
                deficit: deficitPreviewMobile,
              }
            : {
                calculator: calculatorPreviewMobilePolish,
                deficit: deficitPreviewMobilePolish,
              }
        );
      } else {
        setPreviewImages(
          language === "english"
            ? { calculator: calculatorPreview, deficit: deficitPreview }
            : {
                calculator: calculatorPreviewPolish,
                deficit: deficitPreviewPolish,
              }
        );
      }
    };
    // Call the function when the component mounts and on window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [language]);

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
            <p className="subheader col-11 col-md-6 col-lg-4 my-3 my-xxl-4">
              {languageText.subheader}
            </p>
          </div>
          <div className="row p-0 g-0 ps-3 ">
            <Button
              className="col-6 col-sm-4 col-md-3 ms-5 py-xl-4 big-font"
              text={languageText.button}
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
          <img
            className="arrow-down animate__animated animate__bounce   animate__infinite"
            src={arrowDown}
            alt="arrow down"
          />
        </motion.div>
      </motion.div>

      <div className="home-2 pt-xl-5 my-5 d-flex flex-column justify-content-center">
        <motion.div
          className="row g-0 p-0 px-4 d-flex flex-column-reverse flex-xl-row"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="col-xl-5 p-0 g-0 my-3 m-xl-0 d-flex align-items-center ">
            <p className="">{languageText.calculatorDescription}</p>
          </div>
          <img
            className="col-xl-7 p-0 g-0 d-block mx-auto rounded-4 "
            src={previewImages.calculator}
            alt="calculator preview"
            onClick={() => navigate("/calculator")}
          />
        </motion.div>
      </div>
      <div className="home-3 my-5 pt-xl-5 d-flex flex-column justify-content-center">
        <motion.div
          className="row g-2 p-0 px-5"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            className="col-xl-7 p-0 g-0 d-block mx-auto rounded-4 "
            src={previewImages.deficit}
            alt="deficit preview"
            onClick={() => navigate("/deficit")}
          />
          <div className="my-3 col-xl-5  px-2 g-0 d-flex align-items-center text-end ">
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
