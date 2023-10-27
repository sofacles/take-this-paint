import { Link } from "react-router-dom";
import { PaintTileProps } from "./types";

export const ImageTile = ({ paintUnit }: PaintTileProps) => {
  const { name, rgb } = paintUnit;
  const rgbStyle = {
    backgroundColor: `#${rgb}`,
  };

  return (
    <Link
      to="/SendMail"
      state={paintUnit}
      className={`m-2 border border-black-4 ${
        paintUnit.imageName ? "" : "w-[200px] h-[200px]"
      }`}
    >
      <div className={`p-4 min-h-full`} style={rgbStyle}>
        {paintUnit.imageName && (
          <img
            alt="paint color"
            width={200}
            src={`uploads/resized/${paintUnit.imageName}`}
          />
        )}
        <div className="p-0 m-0 w-full mb-4 ">{name}</div>
      </div>
    </Link>
  );
};
