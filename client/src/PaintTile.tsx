import React from "react";
import { Link } from "react-router-dom";
import { PaintTileProps } from "./types";
import ComplementaryColor from "./OppositeColor";

// Used when there is no image, just an RGB value for the paint
//TODO: unit test that makes sure either RGB or image file is in the POST
export const PaintTile = ({ paintUnit }: PaintTileProps) => {
  const opposite = ComplementaryColor(paintUnit.rgb);
  const { name, rgb } = paintUnit;
  const rgbStyle = {
    alignItems: "center",
    backgroundColor: `#${rgb}`,
    flexDirection: "column",
    height: "90%",
    justifyContent: "space-around",
    padding: "5px",
  };

  const linkStyle = {
    textDecoration: "none",
    flexDirection: "column",
    minWidth: "160px",
    minHeight: "160px",
  };

  return (
    <Link
      to="/SendMail"
      state={paintUnit}
      style={linkStyle as React.CSSProperties}
      className="paint-cell"
    >
      <div style={rgbStyle as React.CSSProperties}>
        <h4
          style={{
            padding: 0,
            margin: 0,
            marginBottom: "10px",
            color: `#${opposite}`,
          }}
        >
          {name}
        </h4>
        <div style={{ color: `#${opposite}` }}>#{rgb}</div>
      </div>
    </Link>
  );
};
