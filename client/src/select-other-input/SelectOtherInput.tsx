import React, { useState, useRef, useEffect } from "react";
import FlexSelect from "./FlexSelect";

interface eventArgs {
  target: {
    name: string;
    value: string;
  };
}

interface props {
  onNewValue: (newValue: string) => void;
  onBlur: (event: eventArgs) => void;
  initialValues: string[];
  label: string;
  id?: string;
  okText?: string;
}
const SelectOtherInput: React.FC<props> = ({
  onNewValue,
  onBlur,
  initialValues,
  label,
  id = "gloriousControl",
  okText = "ok",
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTextVal, setCustomTextVal] = useState("");
  const [
    desiredSelectedValueOfFlexSelect,
    setDesiredSelectedValueOfFlexSelect,
  ] = useState("beta");
  const [stringsImShowing, setStringsImShowing] = useState(initialValues);
  const inputBox = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputBox.current !== null) {
      inputBox.current.focus();
    }
  }, [showCustomInput]);

  const spaceRight = {
    // marginRight: "10px"
  };

  const customTextHelper = () => {
    if (customTextVal === "") {
      //treat this as the user just trying to toggle <select> back to visible
      setShowCustomInput(false);
      setDesiredSelectedValueOfFlexSelect(stringsImShowing[0]);
      setShowCustomInput(false);
      onNewValue(stringsImShowing[0]);
      return;
    }
    setStringsImShowing([...stringsImShowing].concat(customTextVal));
    setDesiredSelectedValueOfFlexSelect(customTextVal);
    setShowCustomInput(false);
    onNewValue(customTextVal);
  };

  let controlToShow = showCustomInput ? (
    <>
      <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
        <label htmlFor="email">{label}</label>
      </span>
      <input
        className="ml-10 sm:ml-0 sm:w-2/3"
        name={id}
        type="text"
        ref={inputBox}
        placeholder="enter new value"
        value={customTextVal}
        onChange={(e) => {
          setCustomTextVal(e.target.value);
        }}
        onBlur={(e) => {
          customTextHelper();
          onBlur(e);
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            customTextHelper();
          }
        }}
      />
      <button
        onClick={(e) => {
          customTextHelper();
        }}
      >
        {okText}
      </button>
    </>
  ) : (
    <>
      <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
        <label htmlFor={id}>{label}</label>
      </span>

      <FlexSelect
        stringsToShow={stringsImShowing}
        selectedValue={desiredSelectedValueOfFlexSelect}
        id={id}
        onChange={(v: string) => {
          setCustomTextVal(v);
          setDesiredSelectedValueOfFlexSelect(v);
          onNewValue(v);
        }}
        onBlur={(e: React.ChangeEvent<HTMLSelectElement>) => {
          onBlur(e);
        }}
        userWantsToCreateCustomValue={(showInputBox: boolean) => {
          setShowCustomInput(showInputBox);
          if (showInputBox === true) setCustomTextVal("");
        }}
        StringsToShow={stringsImShowing}
      />
    </>
  );

  return <>{controlToShow}</>;
};

export default SelectOtherInput;
