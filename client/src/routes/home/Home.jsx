import { useNavigate } from "react-router";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

import Button from "../../components/button/Button";
import fbIcon from "../../assets/fb.svg";
import xIcon from "../../assets/x.svg";
import instaIcon from "../../assets/insta.svg";
import calculatorPreview from "../../assets/calculator-preview.png";
import deficitPreview from "../../assets/deficit-preview.png";

import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        className="home-1 pt-xl-5 "
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="hero row p-0 g-0 ps-5 align-elements-center ">
          <h1 className="header col-10 col-lg-7 ">
            Crunching Numbers, Boosting Health!
          </h1>
          <div className="row p-0 g-0 ">
            <h3 className="subheader col-8 col-md-6 col-lg-4 my-3 my-xxl-4">
              Discover your personalized daily nutrient needs, explore detailed
              micronutrient insights, and analyze your diet for optimal health.
              Recipe suggestions included.
            </h3>
          </div>
          <div className="row p-0 g-0 ps-3 ">
            <Button
              className="col-6 col-sm-4 col-md-2 ms-5 "
              text={"test here"}
            />
            <div className="social-icons  ps-xxl-5 pt-3 py-xl-5 d-flex gap-5">
              <a
                href="https://www.example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={fbIcon} alt="" />
              </a>
              <a
                href="https://www.example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={xIcon} alt="" />
              </a>
              <a
                href="https://www.example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instaIcon} alt="" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="d-flex flex-column  justify-content-center align-items-center text-center">
        <span>Scroll down to see more</span>
        <button>&darr;</button>
      </div>
      <div className="home-2 pt-xl-5 d-flex flex-column justify-content-center">
        <motion.div
          className="row g-1 p-0 px-5"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="col-5 d-flex align-items-center ">
            <p className="">
              Discover your daily vitamin needs in seconds! Choose your vitamin,
              enter your age and sex, and get personalized recommendations.
              Optimize your wellness effortlessly!
            </p>
          </div>
          <img
            className="col-7 d-block mx-auto rounded-4"
            src={calculatorPreview}
            alt="calculator preview"
            onClick={() => navigate("/calculator")}
          />
        </motion.div>
      </div>
      <div className="home-3 pt-xl-5 d-flex flex-column justify-content-center">
        <motion.div
          className="row g-1 p-0 px-5"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            className="col-6 d-block mx-auto rounded-4"
            src={deficitPreview}
            alt="deficit preview"
            onClick={() => navigate("/deficit")}
          />
          <div className="col-6 d-flex align-items-center text-end ">
            <p className="">
              Log your recent meals and let our smart algorithm identify your
              potential vitamin gaps. From Vitamin A to K, get personalized
              insights to optimize your diet and well-being. Uncover what's
              missing and thrive!
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
