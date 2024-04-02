import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { SetRepeatMode } from "./../../lib/API/getInfo";

const RepeatButton = ({ size }) => {
  const [repeat, setRepeat] = useState(false);
  const [iconColor, setIconColor] = useState("#B2B2B2");

  function handleRepeat() {
    if (!repeat) {
      setRepeat(true);
      SetRepeatMode("context");
      setIconColor("#1db954");
    } else {
      setRepeat(false);
      SetRepeatMode("off");
      setIconColor("#B2B2B2");
    }
  }

  return (
    <>
      <FontAwesomeIcon
        icon={faRepeat}
        size={size}
        style={{ color: iconColor }}
        className="cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out "
        onMouseEnter={() => {
          if (!repeat) {
            setIconColor("#ffffff");
          }
        }}
        onMouseLeave={(e) => {
          if (!repeat) {
            setIconColor("#B2B2B2");
          }
        }}
        onClick={handleRepeat}
      />
    </>
  );
};

export default RepeatButton;
