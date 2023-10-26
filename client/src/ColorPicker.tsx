import React, { useContext } from "react";

import { ColorPixel } from "./ColorPixel";
import ComplementaryColor from "./OppositeColor";
import { ColorPickerAxisLabel } from "./ColorPickerAxisLabel";
import ThirdColorControl from "./ThirdColor/ThirdColorControl";
import { ThirdColorContext } from "./ThirdColor/ThirdColorContext";

import "./App.css";

export type ColorPickerProps = { onColorChosen: (color: string) => void };
const ColorPicker = ({ onColorChosen }: ColorPickerProps) => {
  const COLOR_MAX = 15;
  const { blueValue, setBlueValue, isDefault, setIsDefault } =
    useContext(ThirdColorContext);

  // Each row will have all the possible values of green for the given value of red
  const rows = [];
  const onNewValue = (color: string) => {
    onColorChosen(color);
    setBlueValue({ ...blueValue, selectedHexValue: color });
    setIsDefault(false);
  };

  for (let rValue = COLOR_MAX; rValue >= 0; rValue--) {
    let cells = [];
    for (let gValue = 0; gValue <= COLOR_MAX; gValue++) {
      cells.push(
        <ColorPixel
          updateSelectedValue={onNewValue}
          r={rValue}
          g={gValue}
          b={blueValue.thirdColorLevel}
          key={"" + rValue + gValue}
        />
      );
    }
    rows.push(
      <div key={rValue} className="color-row">
        {cells}
      </div>
    );
  }

  let selectedColorStyle = {
    color: "#" + blueValue.selectedHexValue,
  };

  return (
    <div className="flex flex-col items-center justify-items-stretch h-64">
      <div className="flex flex-row">
        <div>
          <div>{rows}</div>
        </div>
        <ThirdColorControl />
      </div>
      <div
        className={`my-6 ${isDefault ? "text-sm" : "text-2xl"}`}
        style={selectedColorStyle}
      >
        {isDefault
          ? "click on the box and arrows to get started"
          : `#${blueValue.selectedHexValue}`}
      </div>
    </div>
  );
};

export default ColorPicker;
