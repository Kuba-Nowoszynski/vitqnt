import InfoTile from "../../components/infoTile/InfoTile";
import { useState } from "react";
import "./Info.scss";

const Info = () => {
  const [isAnyTileExpanded, setIsAnyTileExpanded] = useState(false); //make sure only one tile can be expanded at a time
  const coreVitamins = [
    "Vitamin C",
    "Vitamin B1",
    "Vitamin B2",
    "Vitamin B3",
    "Vitamin B5",
    "Vitamin B6",
    "Vitamin B7",
    "Vitamin B9",
    "Vitamin B12",
    "Vitamin A",
    "Vitamin D",
    "Vitamin E",
    "Vitamin K",
  ];

  return (
    <div className="info mt-3 mx-auto rounded-5">
      <h1 className="text-center py-2">INFO</h1>
      <div className="info-tiles  d-flex justify-content-center flex-wrap d-row g-0 p-0">
        {coreVitamins.map((vitamin, index) => (
          <InfoTile
            key={vitamin + index}
            title={vitamin}
            content={<div>More details about {vitamin}</div>}
            className={"col-10 col-lg-3"}
            setIsAnyTileExpanded={setIsAnyTileExpanded}
            isAnyTileExpanded={isAnyTileExpanded}
          />
        ))}
      </div>
    </div>
  );
};

export default Info;
