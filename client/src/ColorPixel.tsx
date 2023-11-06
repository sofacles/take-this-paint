import { useContext } from "react";
import "./App.css";
import { ThirdColorContext } from "./ThirdColor/ThirdColorContext";
import ComplementaryColor from "./OppositeColor";
import { RGB } from "./types";

const HexValues = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

export interface ColorPixelProps extends RGB {
  updateSelectedValue: (color: string) => void;
}

const ColorPixel = ({ r, g, b, updateSelectedValue }: ColorPixelProps) => {
  const hexValue = HexValues[r] + HexValues[g] + HexValues[b];
  const { blueValue, setBlueValue } = useContext(ThirdColorContext);
  let style = {
    backgroundColor: "#" + hexValue,
    border: `1px solid #${hexValue}`,
  };

  if (blueValue.selectedHexValue === hexValue + "") {
    style.border = `1px solid #${ComplementaryColor(hexValue)}`;
  }

  return (
    <div
      className="color-pixel"
      onClick={() => {
        setBlueValue({ ...blueValue, selectedHexValue: hexValue });
        updateSelectedValue(hexValue);
      }}
      style={style}
    />
  );
};

export { ColorPixel };
