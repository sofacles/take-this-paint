import { CSSProperties, SyntheticEvent, useContext } from "react";
import { ThirdColorContext } from "./ThirdColorContext";
import Arrow from "./Arrow";

const ThirdColorControl = () => {
  const { blueValue, setBlueValue, isDefault, setIsDefault } =
    useContext(ThirdColorContext);

  const MAX_COLOR = 15;
  const upClick = (event: SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    setBlueValue((b) => {
      if (b.thirdColorLevel < MAX_COLOR) {
        const oldBlu = parseInt(isDefault ? "7" : b.selectedHexValue[2], 16);
        let newBlu = oldBlu + 1;
        return {
          ...blueValue,
          thirdColorLevel: b.thirdColorLevel + 1,
          selectedHexValue: (
            b.selectedHexValue.substring(0, 2) + newBlu.toString(16)
          ).toUpperCase(),
        };
      }
      return { ...blueValue };
    });
    setIsDefault(false);

    return false;
  };

  const downClick = (event: SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    setBlueValue((b) => {
      if (b.thirdColorLevel > 0) {
        const oldBlu = parseInt(b.selectedHexValue[2], 16);
        let newBlu = oldBlu - 1;

        return {
          ...blueValue,
          thirdColorLevel: b.thirdColorLevel - 1,
          selectedHexValue: (
            b.selectedHexValue.substring(0, 2) + newBlu.toString(16)
          ).toUpperCase(),
        };
      }
      return { ...blueValue };
    });
    setIsDefault(false);
    return false;
  };

  const sliderContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "10px",
    position: "relative",
  };

  return (
    <div style={sliderContainerStyle as CSSProperties}>
      <div title="increase blue" onMouseDown={upClick} onTouchStart={upClick}>
        <Arrow direction="up" text="+" />
      </div>
      <div className="text-xs">blue</div>
      <div
        title="decrease blue"
        onMouseDown={downClick}
        onTouchStart={downClick}
      >
        <Arrow direction="down" text="-" />
      </div>
    </div>
  );
};

//<div>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
export default ThirdColorControl;
