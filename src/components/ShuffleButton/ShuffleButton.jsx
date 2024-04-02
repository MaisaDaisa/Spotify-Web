import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { ToggleShuffle } from "./../../lib/API/getInfo";

const ShuffleButton = ({ size }) => {
  const [shuffle, setShuffle] = useState(false);
  const [iconColor, setIconColor] = useState("#B2B2B2");

  function handleShuffle() {
    if (!shuffle) {
      setShuffle(true);
      ToggleShuffle(true);
      setIconColor("#1db954");
    } else {
      setShuffle(false);
      ToggleShuffle(false);
      setIconColor("#B2B2B2");
    }
  
  }

  return (
    <>
      <FontAwesomeIcon
        icon={faShuffle}
        size={size}
        style={{ color: iconColor }}
        className="cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
        onMouseEnter={() => {
          if (!shuffle) {
            setIconColor("#ffffff");
          }
        }}
        onMouseLeave={() => {
          if (!shuffle) {
            setIconColor("#B2B2B2");
          } 
        }}
        onClick={handleShuffle}
      />
    </>
  );
};

export default ShuffleButton;
