import { FocusEvent } from "react";
import { ALLOWED_IDS_FOR_SELECT } from "../../types";

//A <select> that renders an option for each string in props.StringsToShow, controlled by props.selectedValue
// props.onChange will not be called if the selected option is "other". userWantsToCreateCustomValue is called with true
// in that case.

export type FlexSelectProps = {
  id: ALLOWED_IDS_FOR_SELECT;
  selectedValue: string;
  stringsToShow: Set<string>;
  onBlur: (e: FocusEvent<HTMLSelectElement | HTMLInputElement>) => void;
  onChange: (e: string) => void;
  userWantsToCreateCustomValue: (val: boolean) => void;
};
const FlexSelect = (props: FlexSelectProps) => {
  const ourOptions = [...props.stringsToShow].map((s) => (
    <option key={s} value={s}>
      {s}
    </option>
  ));

  return (
    <select
      className="flex w-full ml-10 sm:ml-0 rounded-md"
      data-testid={`select-${props.id}`}
      value={props.selectedValue}
      id={props.id}
      name={props.id}
      onChange={(e) => {
        props.onChange(e.target.value);
        if (e.target.value === "other") {
          props.userWantsToCreateCustomValue(true);
        } else {
          props.userWantsToCreateCustomValue(false);
        }
      }}
      onBlur={(e) => {
        props.onBlur(e);
      }}
    >
      {ourOptions}
    </select>
  );
};

export default FlexSelect;
