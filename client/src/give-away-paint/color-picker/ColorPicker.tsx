import { FocusEvent, useContext, useState } from "react";

import { ColorPixel } from "./ColorPixel";
import ComplementaryColor from "./OppositeColor";
import ThirdColorControl from "../third-color/ThirdColorControl";
import { ThirdColorContext } from "../third-color/ThirdColorContext";

import "../../App.css";

export type ColorPickerProps = {
  onColorChosen: (color: string) => void;
  onBlur: (e: FocusEvent<HTMLButtonElement>) => void;
};
const ColorPicker = ({ onBlur, onColorChosen }: ColorPickerProps) => {
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

  let okBtnStyle = {
    backgroundColor: isDefault ? "" : `#${blueValue.selectedHexValue}`,
    color: isDefault
      ? "black"
      : `#${ComplementaryColor(blueValue.selectedHexValue)}`,
  };

  const [isEditing, setIsEditing] = useState(false);
  if (!isEditing) {
    return (
      <div className="flex flex-wrap">
        <span className="w-1/3 flex justify-end p-2">
          <label
            className="block text-sm  text-gray-900 dark:text-white"
            htmlFor="name"
          >
            Pick a color:
          </label>
        </span>
        <div className="w-2/3 flex">
          <button
            className="border border-emerald-800 bg-emerald-300  hover:bg-emerald-100 px-1 text-xs font-medium rounded-md"
            data-testid="open-color-picker-btn"
            onBlur={onBlur}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsEditing(true);
            }}
          >
            Color picker
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-emerald-600 border-2 rounded-md flex flex-col py-6">
      <div className="flex flex-col items-center h-64 p-2">
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

        <button
          style={okBtnStyle}
          className={`${
            isDefault ? "bg-green-300" : ""
          } px-8 w-full rounded-md hover:bg-emerald-100`}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsEditing(false);
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
