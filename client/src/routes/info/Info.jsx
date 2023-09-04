import InfoTile from "../../components/infoTile/InfoTile";
import { useState } from "react";

import vitaminInfo from "../../utils/vitaminInfo.json";
import vitA from "../../assets/vitamins/a.png";
import vitC from "../../assets/vitamins/c.png";
import vitB1 from "../../assets/vitamins/b1.png";
import vitB2 from "../../assets/vitamins/b2.png";
import vitB3 from "../../assets/vitamins/b3.png";
import vitB5 from "../../assets/vitamins/b5.png";
import vitB6 from "../../assets/vitamins/b6.png";
import vitB7 from "../../assets/vitamins/b7.png";
import vitB9 from "../../assets/vitamins/b9.png";
import vitB12 from "../../assets/vitamins/b12.png";
import vitD from "../../assets/vitamins/d.png";
import vitE from "../../assets/vitamins/e.png";
import vitK from "../../assets/vitamins/k.png";

const vitaminImages = {
  a: vitA,
  c: vitC,
  d: vitD,
  e: vitE,
  k: vitK,
  b1: vitB1,
  b2: vitB2,
  b3: vitB3,
  b5: vitB5,
  b6: vitB6,
  b7: vitB7,
  b9: vitB9,
  b12: vitB12,
};

import "./Info.scss";
const Info = () => {
  const [isAnyTileExpanded, setIsAnyTileExpanded] = useState(false); //make sure only one tile can be expanded at a time
  const vitaminNames = [
    "c",
    "b1",
    "b2",
    "b3",
    "b5",
    "b6",
    "b7",
    "b9",
    "b12",
    "a",
    "d",
    "e",
    "k",
  ];

  return (
    <div className="animate__animated animate__fadeInRight info mt-3 mx-auto rounded-5">
      <h1 className="text-center py-2">INFO</h1>
      <div className="info-tiles  d-flex justify-content-center flex-wrap d-row g-0 p-0">
        {vitaminNames.map((vitamin, index) => (
          <InfoTile
            key={vitamin + index}
            name={vitamin}
            description={vitaminInfo[vitamin]}
            className={"col-10 col-lg-3"}
            setIsAnyTileExpanded={setIsAnyTileExpanded}
            isAnyTileExpanded={isAnyTileExpanded}
            vitaminImg={vitaminImages[vitamin]}
          />
        ))}
      </div>
    </div>
  );
};

export default Info;
