import { useContext, useState } from "react";
import { useFormContext } from "react-hook-form";
import { UploadPhotoType } from "../types";
import ColorPicker from "./color-picker/ColorPicker";
import { ThirdColorContext } from "./third-color/ThirdColorContext";

export interface ValidatedStep1Props {
  onDone: () => void;
  onChange: (val: { rgb: string; uploadPhoto: UploadPhotoType }) => void;
  onBlur: () => void;
}

const Step1 = (props: ValidatedStep1Props) => {
  const {
    getValues,
    formState: { errors },
  } = useFormContext();
  const [wasFileUploadBlurred, setWasFileUploadBlurred] = useState(false);
  const [wasColorPickerBlurred, setWasColorPickerBlurred] = useState(false);
  const { isDefault } = useContext(ThirdColorContext);
  const [fileName, setFileName] = useState("");
  const [rgb, setRgb] = useState("");

  return (
    <>
      <h2 className="text-emerald-700">
        Step 1: give people something to look at
      </h2>
      <div className="flex flex-wrap">
        <span className="w-1/3 flex justify-end p-2">
          <label
            className="block  text-sm  text-gray-900 dark:text-white"
            htmlFor="uploadPhoto"
          >
            Upload a photo:
          </label>
        </span>
        <div className="w-2/3 flex items-center">
          <input
            onChange={(e) => {
              setFileName(e.target.files![0].name);
              const img = {
                preview: URL.createObjectURL(e.target.files![0]),
                data: e.target.files![0],
              };
              props.onChange({
                uploadPhoto: img,
                rgb,
              });
            }}
            onBlur={() => {
              setWasFileUploadBlurred(true);
              if (wasColorPickerBlurred) {
                props.onBlur();
              }
            }}
            type="file"
            className="text-sm text-black
          file:mr-5 file:py-1 file:px-2 file:border-[1px]
          file:text-xs file:font-medium file:rounded-md
          file:bg-emerald-300 
          hover:file:cursor-pointer hover:file:bg-emerald-100
          hover:file:text-stone-800"
          />
        </div>
      </div>

      <ColorPicker
        onColorChosen={(val: string) => {
          setRgb(val);
          props.onChange({
            uploadPhoto: getValues("oneOf.uploadPhoto"),
            rgb: val,
          });
        }}
        onBlur={() => {
          setWasColorPickerBlurred(true);
          if (wasFileUploadBlurred) {
            props.onBlur();
          }
        }}
      />

      <div className="flex flex-row justify-end">
        <button
          className="bg-emerald-300 border-2 text-sm hover:bg-emerald-100 border-emerald-800 p-1 rounded-md disabled:opacity-50"
          disabled={isDefault && !fileName}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();

            if (!errors.atLeastOne) {
              props.onDone();
            }
          }}
        >
          done
        </button>
      </div>
    </>
  );
};

export default Step1;
