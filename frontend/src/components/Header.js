import React from "react";
import { faHandHoldingHand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return <div className="header-container">
    <a href="/">
      <FontAwesomeIcon icon= {faHandHoldingHand}  />
    </a>
    <a href="/">
      <h1>QrCode - Helper</h1>
    </a>
  </div>;
};

export default Header;
