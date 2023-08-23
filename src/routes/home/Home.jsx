// import fruit from "../assets/fruit.png";

import "./Home.scss";
import Button from "../../components/button/Button";
import fbIcon from "../../assets/fb.svg";
import xIcon from "../../assets/x.svg";
import instaIcon from "../../assets/insta.svg";

const Home = () => {
  return (
    <div className="home pt-xl-5 ">
      <div className="hero row p-0 g-0 ps-5 align-elements-center ">
        {" "}
        <h1 className="header col-10 col-lg-7 ">
          Crunching Numbers, Boosting Health!
        </h1>
        <div className="row p-0 g-0 ">
          {" "}
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
      {/* <div className="d-flex flex-column  justify-content-center align-items-center text-center">
        <span>Scroll down to see more</span>
        <button>||</button>
      </div> */}
    </div>
  );
};

export default Home;
