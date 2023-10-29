import { useContext, useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import SelectOtherInput from "./select-other-input/SelectOtherInput";
import {
  DEFAULT_PAINTS,
  DEFAULT_QUANTITIES,
  OPTION_DEFAULT,
} from "../constants";
import { Inputs } from "../types";

import { v4 as uuidv4 } from "uuid";
import querystring from "querystring";
import { useNavigate } from "react-router-dom";

function GiveAwayPaint() {
  const navigate = useNavigate();
  const [image, setImage] = useState({ preview: "", data: "" });
  const [showColorPicker, setShowColorPicker] = useState(false);
  // whether they've selected a color in the color picker
  const [colorSelected, setColorSelected] = useState(false);

  const [step1Completed, setStep1Completed] = useState(false);

  const {
    control,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "all" });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="mt-8 bg-green-50 sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg lg:max-w-3xl">
      <div className="py-8 px-6 shadow rounded-lg sm:px-10 ">
        <form
          className="space-y-6 mb-0"
          name="give-away-paint"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-lg font-semibold text-emerald-700">
            Give somebody your old paint.
          </h1>

          <div className="sm:flex sm:flex-wrap">
            <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
              <label htmlFor="name">Color name:</label>
            </span>
            <input
              className="ml-10 sm:ml-0 w-2/3 rounded-md"
              {...register("name", { required: "Please add a name" })}
            />
          </div>

          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right text-sm">
                {message}
              </p>
            )}
          />

          <div className="sm:flex sm:flex-wrap">
            <Controller
              control={control}
              name="brand"
              defaultValue={OPTION_DEFAULT}
              render={({ field: { onChange, onBlur } }) => (
                <SelectOtherInput
                  id="brand"
                  name="brand"
                  initialValues={DEFAULT_PAINTS}
                  label="Brand:"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
              rules={{
                validate: (value) => {
                  if (value === OPTION_DEFAULT || value == "other") {
                    return "Please enter a brand";
                  }
                },
              }}
            />
          </div>

          <ErrorMessage
            errors={errors}
            name="brand"
            render={({ message }) => (
              <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right text-sm">
                {message}
              </p>
            )}
          />
          <div className="sm:flex sm:flex-wrap">
            <Controller
              control={control}
              name="quantity"
              defaultValue={OPTION_DEFAULT}
              render={({ field: { onChange, onBlur } }) => (
                <SelectOtherInput
                  id="quantity"
                  name="quantity"
                  initialValues={DEFAULT_QUANTITIES}
                  label="quantity:"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
              rules={{
                validate: (value) => {
                  if (value === OPTION_DEFAULT || value == "other") {
                    return "Please enter a quantity";
                  }
                },
              }}
            />
          </div>

          <ErrorMessage
            errors={errors}
            name="quantity"
            render={({ message }) => (
              <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right text-sm">
                {message}
              </p>
            )}
          />

          <div className="sm:flex sm:flex-wrap sm:justify-end">
            <input
              className="bg-emerald-300 border-2 hover:bg-emerald-100 border-emerald-800 p-2 rounded-md"
              type="submit"
              value="save"
              id="save"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default GiveAwayPaint;
