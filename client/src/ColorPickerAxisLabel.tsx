//maybe get rid of this?
import "./App.css";

export interface ColorPickerAxisLabelProps {
  cssClass?: string;
  color: "red" | "green";
  orientation: string;
}
const ColorPickerAxisLabel = (props: ColorPickerAxisLabelProps) => {
  const { color, orientation } = props;
  let { cssClass: otherName } = props;
  if (orientation === "vertical") {
    otherName += " -rotate-90 ";
  }
  return (
    <div className={`${otherName} vertical-label`}>
      {color} increases &rarr;
    </div>
  );
};

export { ColorPickerAxisLabel };
