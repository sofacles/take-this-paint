import React from "react";
//A <select> that renders an option for each string in props.StringsToShow, controlled by props.selectedValue
// props.onChange will not be called if the selected option is "other". userWantsToCreateCustomValue is called with true
// in that case.

const FlexSelect = (props) => {
  const ourOptions = props.stringsToShow.map((s) => (
    <option key={s} value={s}>
      {s}
    </option>
  ));

  return (
    <select
      className="flex w-2/3 ml-10 sm:ml-0 "
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
