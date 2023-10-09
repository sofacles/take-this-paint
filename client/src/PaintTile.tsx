import React from "react";
import { Link } from "react-router-dom";
import { PaintTileProps } from "./types";
import OppositeColor from "./OppositeColor";

// Used when there is no image, just an RGB value for the paint
//TODO: unit test that makes sure either RGB or image file is in the POST
export const PaintTile = ({ paintUnit }: PaintTileProps) => {
  const { name, rgb } = paintUnit;
  const rgbStyle = {
    height: "100%",
    width: "100%",
    backgroundColor: `#${rgb}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const linkStyle = {
    textDecoration: "none",
    color: `#8c8`,
  };

  return (
    <Link to="/SendMail" state={paintUnit} style={linkStyle}>
      <div className="paint-cell">
        <div style={rgbStyle}>
          <div>{name}</div>
          <div>#{rgb}</div>
        </div>
      </div>
    </Link>
  );
};
