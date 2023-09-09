/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { motion } from "framer-motion";

import useSound from "use-sound";
import expandSound from "../../assets/sounds/click-sound.wav";
import closeSound from "../../assets/sounds/tap-sound.wav";
import "./InfoTile.scss";

const InfoTile = ({
  name,
  description,
  className,
  setIsAnyTileExpanded,
  isAnyTileExpanded,
  vitaminImg,
}) => {
  const [playExpand] = useSound(expandSound);
  const [playClose] = useSound(closeSound);
  const {
    languageText: { info: languageText },
  } = useContext(UserContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scale, setScale] = useState("");
  // State to hold the coordinates for animating the expansion
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  // Function to expand the tile if no other tile is expanded
  const toggleExpand = (e) => {
    // Check if no tile is currently expanded
    if (!isAnyTileExpanded) {
      playExpand();
      setIsExpanded(true); // Set the tile as expanded
      setIsAnyTileExpanded(true); // Notify that at least one tile is expanded
      const rect = e.currentTarget.getBoundingClientRect();
      const x = window.innerWidth / 2 - (rect.left + rect.width / 2);
      const y = window.innerHeight / 2 - (rect.top + rect.height / 2);
      setCoordinates({ x, y }); // Set the coordinates for animation

      // Calculate the scale value based on screen width
      const screenWidth = window.innerWidth;
      const scale = screenWidth <= 992 ? 1.15 : 1.9;
      setScale(scale); // Add this line to set the scale value
    }
  };

  const closeExpand = (e) => {
    playClose();
    e.stopPropagation(); // Prevent the click event from affecting other elements outside the tile.
    setIsExpanded(false);
    setIsAnyTileExpanded(false);
  };
  return (
    <motion.div
      //prevent from hovering other tiles if one is expanded
      style={!isExpanded && isAnyTileExpanded ? { pointerEvents: "none" } : {}}
      className={`tile rounded-4 d-flex flex-column justify-content-center align-items-center py-2 ${
        isExpanded ? "expanded justify-content-around" : "not-expanded"
      } ${className}`}
      onClick={toggleExpand}
      initial={{ scale: 1 }}
      animate={
        isExpanded
          ? { scale: scale, x: coordinates.x, y: coordinates.y }
          : { scale: 1, x: 0, y: 0 }
      }
    >
      <div className="tile-header pb-2">
        {isExpanded && (
          <h2>
            {languageText.vitamin} {name[0].toUpperCase()}
            {name.length > 1 && <sub>{name.slice(1)}</sub>}
          </h2>
        )}

        {isExpanded && (
          <button className="close-btn" onClick={closeExpand}></button>
        )}
      </div>
      <div
        className={`description text-center ${
          isExpanded ? "d-block" : "d-none"
        }`}
      >
        {description}
      </div>
      {!isExpanded && (
        <img className="py-2" src={vitaminImg} alt={`vitamin ${name} image`} />
      )}
    </motion.div>
  );
};

export default InfoTile;
