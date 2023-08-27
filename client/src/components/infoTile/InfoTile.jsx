/* eslint-disable react/prop-types */
import { useState } from "react";

import vitImg from "../../assets/vita.png";
import "./InfoTile.scss";

const InfoTile = ({
  title,
  content,
  className,
  setIsAnyTileExpanded,
  isAnyTileExpanded,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    if (!isAnyTileExpanded) {
      setIsExpanded(true);
      setIsAnyTileExpanded(true);
    }
  };

  const closeExpand = (e) => {
    e.stopPropagation(); // Prevent the click event from affecting other elements outside the tile.
    setIsExpanded(false);
    setIsAnyTileExpanded(false);
  };
  return (
    <div
      className={`tile rounded-4 d-flex flex-column justify-content-center align-items-center py-2 ${
        isExpanded ? "expanded" : ""
      } ${className}`}
      onClick={toggleExpand}
    >
      <div className="tile-header">
        {title}{" "}
        {isExpanded && (
          <button className="close-btn" onClick={closeExpand}>
            X
          </button>
        )}
      </div>
      <img className="py-2" src={vitImg} alt="vitamin img" />
      <div className="tile-content">{content}</div>
    </div>
  );
};

export default InfoTile;
