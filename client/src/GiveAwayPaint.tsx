import React, { useContext, useState } from "react";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import querystring from "querystring";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import UseForm from "./UseForm";
import ColorPicker from "./ColorPicker";
import ComplementaryColor from "./OppositeColor";
import ValidationRulesObj from "./PaintFormValidationRules";
import { ThirdColorContext } from "./ThirdColor/ThirdColorContext";
import SelectOtherInput from "./select-other-input/SelectOtherInput";
interface KeyValueCollection {
  [key: string]: string;
}

const GiveAwayPaint = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState({ preview: "", data: "" });
  const [showColorPicker, setShowColorPicker] = useState(false);
  // whether they've selected a color in the color picker
  const [colorSelected, setColorSelected] = useState(false);

  const [step1Completed, setStep1Completed] = useState(false);

  const { blueValue, isDefault } = useContext(ThirdColorContext);

  const onValidationSuccess = async (fields: KeyValueCollection) => {
    let formData = new FormData();
    formData.append("imageName", uuidv4());
    formData.append("uploadPhoto", image.data);

    let qs = querystring.encode(fields);
    const response = await fetch(`/api/paints/?${qs}`, {
      method: "POST",
      body: formData,
    });
    if (response && response.status === 200) {
      navigate("/thank-you");
    }
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const { setField, blurField, errors, handleSubmit } = UseForm(
    onValidationSuccess,
    ValidationRulesObj
  );
  const onColorSelected = (color: string) => {
    setField({
      target: {
        name: "rgb",
        value: color,
      },
    });
  };

  let okBtnStyle = {
    backgroundColor: isDefault ? "" : `#${blueValue.selectedHexValue}`,
    color: isDefault
      ? "black"
      : `#${ComplementaryColor(blueValue.selectedHexValue)}`,
  };

  let selectedColorText = {
    color: "#" + blueValue.selectedHexValue,
  };

  return (
    <div className="mt-8 bg-green-50 sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg lg:max-w-3xl">
      <div className="py-8 px-6 shadow rounded-lg sm:px-10 ">
        <form
          className="space-y-6 mb-0"
          name="give-away-paint"
          encType="multipart/form-data"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 className="text-lg font-semibold text-emerald-700">
            Give somebody your old paint.
          </h1>
          <section
            className={`space-y-6 mb-0 ${step1Completed ? "hidden" : ""}`}
          >
            <h2 className="text-emerald-700">
              Step 1: give people something to look at
            </h2>
            <div className="flex flex-wrap">
              <span className="w-1/3 flex justify-end p-2">
                <label
                  className="block  text-sm  text-gray-900 dark:text-white"
                  htmlFor="name"
                >
                  Upload a photo:
                </label>
              </span>
              <div className="w-2/3 flex items-center">
                <input
                  type="file"
                  className="text-sm text-black
                  file:mr-5 file:py-1 file:px-2 file:border-[1px]
                  file:text-xs file:font-medium file:rounded-md
                  file:bg-emerald-300 
                  hover:file:cursor-pointer hover:file:bg-emerald-100
                  hover:file:text-stone-800"
                  id="uploadPhoto"
                  name="uploadPhoto"
                  onChange={(e) => {
                    handleFileChange(e);
                    setField(e);
                  }}
                />
              </div>
            </div>

            {!colorSelected && (
              <div className="flex flex-wrap">
                <span className="w-1/3 flex justify-end p-2">
                  <label
                    className="block text-sm  text-gray-900 dark:text-white"
                    htmlFor="name"
                  >
                    Or pick a color:
                  </label>
                </span>
                <div className="w-2/3 flex items-center">
                  <button
                    className="border border-emerald-800 bg-emerald-300  hover:bg-emerald-100 p-1 text-xs font-medium rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setShowColorPicker(true);
                    }}
                  >
                    Color picker
                  </button>
                </div>
              </div>
            )}
            {colorSelected && (
              <h2 style={selectedColorText} className="text-2xl">
                color #{blueValue.selectedHexValue}
              </h2>
            )}
            {showColorPicker && (
              <div className="border-slate-800 border-2 flex flex-col py-6">
                <ColorPicker onColorChosen={onColorSelected} />
                <button
                  style={okBtnStyle}
                  className={`${
                    isDefault ? "bg-green-300" : ""
                  } mx-8 rounded-md hover:bg-emerald-100`}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowColorPicker(false);
                    setColorSelected(true);
                  }}
                >
                  OK
                </button>
              </div>
            )}
            {errors.atLeastOne && (
              <p className="error">
                <span data-testid="confirm-email-error">
                  {errors.atLeastOne}
                </span>
              </p>
            )}
            <div className="flex flex-row justify-end">
              <button
                className="bg-emerald-300 border-2 text-sm hover:bg-emerald-100 border-emerald-800 p-1 rounded-md disabled:opacity-50"
                disabled={isDefault && image.data.length === 0}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (!errors.atLeastOne) {
                    setStep1Completed(true);
                    setColorSelected(!isDefault);
                  }
                }}
              >
                done
              </button>
            </div>
          </section>

          <section
            className={`space-y-6 mb-0 ${step1Completed ? "" : "hidden"}`}
          >
            <div className="w-full pr-16 text-right">
              <a
                href="#"
                className="text-sm underline hover:text-emerald-500 hover:no-underline"
                onClick={(e) => {
                  setStep1Completed(false);
                  setShowColorPicker(true);
                }}
              >
                edit
              </a>
            </div>
            <div
              className={`flex flex-row justify-center ${
                image.data.length === 0 ? "hidden" : ""
              }`}
            >
              <img src={image.preview} width="100px" height="100px" />
            </div>
            {colorSelected && (
              <span
                style={selectedColorText}
                className="text-2xl flex flex-row justify-center"
              >
                #{blueValue.selectedHexValue}
              </span>
            )}
          </section>
          <section
            className={`space-y-3 sm:space-y-6 mb-0 ${
              step1Completed ? "" : "hidden"
            }`}
          >
            <h2 className="text-emerald-700">
              Last step: Enter paint details and an email address for us to
              relay
            </h2>
            <div className="sm:flex sm:flex-wrap">
              <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
                <label htmlFor="name">Color name:</label>
              </span>
              <input
                className="ml-10 sm:ml-0 w-2/3 rounded-md"
                name="name"
                id="name"
                onChange={(e) => {
                  setField(e);
                }}
                onBlur={(e) => {
                  blurField(e);
                }}
              />
              {errors.name && (
                <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right">
                  <span>{errors.name}</span>
                </p>
              )}
            </div>
            <div className="sm:flex sm:flex-wrap">
              <SelectOtherInput
                id="brand"
                onNewValue={(newValue) => {
                  setField({
                    target: {
                      name: "brand",
                      value: newValue,
                    },
                  });
                }}
                onBlur={(e) => {
                  blurField(e);
                }}
                initialValues={[
                  "- choose -",
                  "Sherwin-Williams",
                  "Farrow & Ball",
                  "Miller",
                  "Behr",
                  "Dunn-Edwards",
                  "Glidden",
                  "Rodda",
                  "Benjamin Moore",
                  "other",
                ]}
                label="Brand:"
              />
              {errors.brand && (
                <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right">
                  <span>{errors.brand}</span>
                </p>
              )}
            </div>
            <div className="sm:flex sm:flex-wrap">
              <SelectOtherInput
                id="quantity"
                onNewValue={(newValue) => {
                  setField({
                    target: {
                      name: "quantity",
                      value: newValue,
                    },
                  });
                }}
                onBlur={(e) => {
                  blurField(e);
                }}
                initialValues={[
                  "- choose -",
                  "about a quart",
                  "less than a gallon",
                  "less than two gallons",
                  "less than five gallons",
                  "other",
                ]}
                label="Quantity:"
              />
              {errors.quantity && (
                <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right">
                  <span>{errors.quantity}</span>
                </p>
              )}
            </div>
            <div className="sm:flex sm:flex-wrap">
              <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
                <label htmlFor="email">Email:</label>
              </span>
              <input
                className="ml-10 sm:ml-0 w-2/3 rounded-md"
                name="email"
                id="email"
                onChange={(e) => {
                  setField(e);
                }}
                onBlur={(e) => {
                  blurField(e);
                }}
              />
              {errors.email && (
                <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right">
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
            <div className="sm:flex sm:flex-wrap">
              <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
                <label htmlFor="confirmEmail">Confirm email:</label>
              </span>
              <input
                className="ml-10 sm:ml-0 w-2/3 rounded-md"
                name="confirmEmail"
                id="confirmEmail"
                onChange={(e) => {
                  setField(e);
                }}
                onBlur={(e) => {
                  blurField(e, true);
                }}
              />
              {errors.confirmEmail && (
                <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right">
                  <span data-testid="confirm-email-error">
                    {errors.confirmEmail}
                  </span>
                </p>
              )}
            </div>
            <div className="sm:flex sm:flex-wrap justify-end">
              <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
                <label htmlFor="zipCode">Zip code:</label>
              </span>
              <input
                className="ml-10 sm:ml-0 w-2/3 rounded-md"
                name="zipCode"
                id="zipCode"
                onChange={(e) => {
                  setField(e);
                }}
                onBlur={(e) => {
                  blurField(e, true);
                }}
              />
              {errors.zipCode && (
                <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right">
                  <span data-testid="zip-code-error">{errors.zipCode}</span>
                </p>
              )}
            </div>
            <div className="sm:flex sm:flex-wrap justify-end">
              <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
                <label htmlFor="sheen">Sheen:</label>
              </span>
              <select
                className="ml-10 sm:ml-0 w-2/3 rounded-md"
                name="sheen"
                id="sheen"
                onChange={(e) => {
                  setField(e);
                }}
                onBlur={(e) => {
                  blurField(e);
                }}
              >
                <option value="">--</option>
                <option value="flat">flat</option>
                <option value="eggshell">eggshell</option>
                <option value="semi">semi gloss</option>
                <option value="gloss">high gloss</option>
              </select>
            </div>
            <div className="sm:flex sm:flex-wrap sm:justify-end">
              <input
                className="bg-emerald-300 border-2 hover:bg-emerald-100 border-emerald-800 p-2 rounded-md"
                type="submit"
                value="save"
                id="save"
              />
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default GiveAwayPaint;
