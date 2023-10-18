import React from "react";
import { Link } from "react-router-dom";
import { PaintTileProps } from "./types";

export const ImageTile = ({ paintUnit }: PaintTileProps) => {
  const { name, rgb } = paintUnit;
  const rgbStyle = {
    height: "90%",
    backgroundColor: `#${rgb}`,
    padding: "5px",
  };

  const imgStyle = {
    maxWidth: "100%",
  };

  const linkStyle = {
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
  };

  return (
    <Link
      to="/SendMail"
      state={paintUnit}
      style={linkStyle as React.CSSProperties}
      className="paint-cell"
    >
      <h4 style={{ padding: 0, margin: 0, marginBottom: "10px" }}>{name}</h4>

      <div style={rgbStyle}>
        <img
          alt="paint color"
          style={imgStyle}
          src={`uploads/resized/${paintUnit.imageName}`}
        />
      </div>
    </Link>
  );
};
