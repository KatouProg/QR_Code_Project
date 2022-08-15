import React from "react";
import { faHandHoldingHand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return <div className="header-container">
    <FontAwesomeIcon icon= {faHandHoldingHand} />
    <h1>QrCode - Helper</h1>
  </div>;
};

export default Header;
