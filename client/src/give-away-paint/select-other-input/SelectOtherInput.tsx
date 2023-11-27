import { FocusEvent, useEffect, useState, useRef } from "react";
import FlexSelect from "./FlexSelect";
import { OPTION_DEFAULT } from "../../constants";
import { ALLOWED_IDS_FOR_SELECT } from "../../types";

interface selectOtherInputProps {
  onBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onChange: (newVal: string) => void;
  initialValues: Set<string>;
  label: string;
  id?: ALLOWED_IDS_FOR_SELECT;
  name: ALLOWED_IDS_FOR_SELECT;
  okText?: string;
}
const SelectOtherInput: React.FC<selectOtherInputProps> = ({
  id = "",
  initialValues,
  label,
  onChange,
  onBlur,
  okText = "ok",
  name,
}) => {
  const [customTextVal, setCustomTextVal] = useState("");
  const [
    desiredSelectedValueOfFlexSelect,
    setDesiredSelectedValueOfFlexSelect,
  ] = useState("beta");
  const [stringsImShowing, setStringsImShowing] = useState(initialValues);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const inputBox = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputBox.current !== null) {
      inputBox.current.focus();
    }
  }, [showCustomInput]);

  const customTextHelper = () => {
    if (customTextVal === "") {
      //treat this as the user just trying to toggle <select> back to visible
      setShowCustomInput(false);
      setDesiredSelectedValueOfFlexSelect(OPTION_DEFAULT);
      return;
    }

    setStringsImShowing(stringsImShowing.add(customTextVal));
    setDesiredSelectedValueOfFlexSelect(customTextVal);
    setShowCustomInput(false);
  };

  let controlToShow = showCustomInput ? (
    <div className="sm:flex sm:flex-row bg-blue-400n sm:w-full">
      <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
        <label className="capitalize" htmlFor={name}>
          {label}
        </label>
      </span>
      <div className=" sm:w-2/3 sm:flex sm:flex-row ml-10 sm:ml-0 justify-start">
        <input
          className="rounded-md"
          name={id}
          type="text"
          ref={inputBox}
          placeholder="enter new value"
          value={customTextVal}
          onChange={(e) => {
            setCustomTextVal(e.target.value);
            setDesiredSelectedValueOfFlexSelect(e.target.value);
            onChange(e.target.value);
          }}
          onBlur={(e) => {
            customTextHelper();
            onBlur(e);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setCustomTextVal(inputBox.current?.value || "");
              setDesiredSelectedValueOfFlexSelect(customTextVal);
              //customTextHelper();
            }
          }}
        />
        <button
          className="border border-emerald-800 sm:block sm:flex-row sm:w-1/4 ml-4 px-2 py-2 rounded-md bg-emerald-300  hover:bg-emerald-100"
          onClick={(_e) => {
            customTextHelper();
          }}
        >
          {okText}
        </button>
      </div>
    </div>
  ) : (
    <>
      <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
        <label className="capitalize" htmlFor={id}>
          {label}
        </label>
      </span>
      <div className="ml-0 sm:ml-0 w-2/3 rounded-md">
        <FlexSelect
          stringsToShow={stringsImShowing}
          id={name}
          onBlur={(e) => {
            customTextHelper();
            onBlur(e);
          }}
          onChange={(v: string) => {
            onChange(v);
            setDesiredSelectedValueOfFlexSelect(v);
            setCustomTextVal(v);
          }}
          selectedValue={desiredSelectedValueOfFlexSelect}
          userWantsToCreateCustomValue={(showInputBox: boolean) => {
            setShowCustomInput(showInputBox);
            if (showInputBox === true) setCustomTextVal("");
          }}
        />
      </div>
    </>
  );

  return <>{controlToShow}</>;
};

export default SelectOtherInput;
