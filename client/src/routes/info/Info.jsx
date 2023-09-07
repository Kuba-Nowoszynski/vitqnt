import InfoTile from "../../components/infoTile/InfoTile";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

// import vitaminInfo from "../../utils/vitaminInfo.json";
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

import "./Info.scss";
const Info = () => {
  const {
    languageText: { info: languageText },
  } = useContext(UserContext);

  const [isAnyTileExpanded, setIsAnyTileExpanded] = useState(false); //make sure only one tile can be expanded at a time
  const [flashingDivs, setFlashingDivs] = useState([]);
  const [usedIndexes, setUsedIndexes] = useState([]);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (usedIndexes.length < vitaminNames.length) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * vitaminNames.length);
        } while (usedIndexes.includes(randomIndex));
        setUsedIndexes((prevUsed) => [...prevUsed, randomIndex]);
        setFlashingDivs((prevDivs) => [...prevDivs, randomIndex]);
      } else {
        clearInterval(interval); // Stop the interval when all indexes are used
      }
    }, 70);

    //bounceIn prevents tiles from expanding - that's why I need to remove bounceIn and add opacity after animation is completed
    const animationTimeout = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 500);

    return () => {
      clearInterval(interval);
      clearTimeout(animationTimeout);
    };
  }, [usedIndexes]);

  return (
    <div className="animate__animated animate__fadeInRight info mt-3 mx-auto rounded-5">
      <h1 className="text-center py-2">{languageText.header}</h1>
      <div className="info-tiles  d-flex justify-content-center flex-wrap d-row g-0 p-0">
        {vitaminNames.map((vitamin, index) => (
          <InfoTile
            key={vitamin + index}
            name={vitamin}
            description={languageText.vitaminInfo[vitamin]}
            className={`col-10 col-lg-3 animate__animated  ${
              !isAnimationComplete && flashingDivs.includes(index)
                ? "animate__bounceIn"
                : ""
            } ${isAnimationComplete ? "opacity" : ""}`}
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
