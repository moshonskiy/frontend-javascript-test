import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const ArrowIcon = ({ arrowRotateToggle }) => {
  return (
    <FontAwesomeIcon
      icon={faArrowDown}
      rotation={arrowRotateToggle ? 180 : 0}
    />
  );
};
