import logo from "../../assets/logo.png";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loading-container">
      <img src={logo} alt="Logo for Country Score" className="loading-logo" />
    </div>
  );
};

export default Loader;
