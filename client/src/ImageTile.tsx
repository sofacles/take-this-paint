import React from "react";
import { Link } from "react-router-dom";
import { PaintTileProps } from "./types";

export const ImageTile = ({ paintUnit }: PaintTileProps) => {
  const rgbStyle = {
    height: "90%",
    //boxSizing: "borderBox",
    padding: "5px",
  };

  const imgStyle = {
    height: "90%",
    maxWidth: "100%",
  };

  const linkStyle = {
    textDecoration: "none",
  };

  return (
    <Link to="/SendMail" state={paintUnit} style={linkStyle}>
      <div className="paint-cell">
        <span>{paintUnit.name}</span>

        <div style={rgbStyle}>
          <img
            alt="paint color"
            style={imgStyle}
            src={`uploads/resized/${paintUnit.imageName}`}
          />
        </div>
      </div>
    </Link>
  );
};
