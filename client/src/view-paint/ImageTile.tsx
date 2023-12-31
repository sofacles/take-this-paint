import { Link } from "react-router-dom";
import { PaintTileProps } from "../types";
import ComplementaryColor from "../give-away-paint/color-picker/OppositeColor";

export const ImageTile = ({ paintUnit }: PaintTileProps) => {
  const { name, rgb, zipCode } = paintUnit;
  const rgbStyle = {
    backgroundColor: `#${rgb}`,
  };

  const tileTextStyle = {
    color: "#333",
  };

  if (rgb) {
    tileTextStyle.color = `#${ComplementaryColor(rgb)}`;
  }

  return (
    <Link
      to="/send-message"
      state={paintUnit}
      className={`m-2 border j border-black-4 `}
    >
      <div className={`p-4 h-128 min-h-full`} style={rgbStyle}>
        {paintUnit.imageName ? (
          <img alt="paint color" width={200} src={paintUnit.imageName} />
        ) : (
          <img
            alt="paint color"
            className="opacity-0"
            width={200}
            src={`uploads/blank.png`}
          />
        )}
        <div className="relative bottom-2 right-2"></div>
        <div className="p-0 m-0 w-full mb-4" style={tileTextStyle}>
          {name}, {zipCode}
        </div>
      </div>
    </Link>
  );
};
