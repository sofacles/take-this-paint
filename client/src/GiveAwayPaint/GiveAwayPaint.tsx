import { useContext, useState } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import ValidatedSelectOtherInput from "./select-other-input/ValidatedSelectOtherInput";
import LabeledInput from "./LabeledInput";
import {
  DEFAULT_PAINTS,
  DEFAULT_QUANTITIES,
  DEFAULT_SHEENS,
} from "../constants";
import { Inputs } from "../types";

import { v4 as uuidv4 } from "uuid";
import querystring from "querystring";
import { useNavigate } from "react-router-dom";
import ValidatedStep1 from "./ValidatedStep1";

function GiveAwayPaint() {
  const navigate = useNavigate();
  const [step1Completed, setStep1Completed] = useState(false);

  const methods = useForm<Inputs>({ mode: "all" });
  const { getValues, handleSubmit } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const {
      brand,
      email,
      confirmEmail,
      name,
      quantity,
      oneOf: { rgb, uploadPhoto },
      sheen,
    } = data;
    let formData = new FormData();
    formData.append("imageName", uuidv4());
    formData.append("uploadPhoto", uploadPhoto.data!); //fix

    let qs = querystring.encode({
      brand,
      email,
      confirmEmail,
      name,
      quantity,
      rgb,
      sheen,
    });
    const response = await fetch(`/api/paints/?${qs}`, {
      method: "POST",
      body: formData,
    });
    if (response && response.status === 200) {
      navigate("/thank-you");
    }
  };

  let selectedColorText = {
    color: "#" + getValues("oneOf.rgb"),
    display: getValues("oneOf.rgb") ? "flex" : "none",
  };

  return (
    <div className="mt-8 bg-green-50 sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg lg:max-w-3xl">
      <div className="py-8 px-6 shadow rounded-lg sm:px-10 ">
        <FormProvider {...methods}>
          <form
            className="space-y-6 mb-0"
            name="give-away-paint"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-lg font-semibold text-emerald-700">
              Give somebody your old paint.
            </h1>

            <section
              className={`space-y-6 mb-0 ${step1Completed ? "hidden" : ""}`}
            >
              <ValidatedStep1 onDone={() => setStep1Completed(true)} />
            </section>

            <section
              className={`space-y-6 mb-0 ${step1Completed ? "" : "hidden"}`}
            >
              <div className="w-full pr-16 text-right">
                <a
                  href="#"
                  className="p-1 text-sm t underline text-emerald-500 hover:no-underline hover:bg-emerald-100"
                  onClick={(e) => {
                    setStep1Completed(false);
                  }}
                >
                  edit step 1
                </a>
              </div>
              <div
                className={`flex flex-row justify-center ${
                  getValues("oneOf.uploadPhoto.data")?.name ? "" : "hidden"
                }`}
              >
                <img
                  src={getValues("oneOf.uploadPhoto.preview")}
                  width="100px"
                  height="100px"
                />
              </div>

              <span
                style={selectedColorText}
                className="text-2xl flex flex-row justify-center"
              >
                #{getValues("oneOf.rgb")}
              </span>
            </section>

            <LabeledInput id="name" label="Color name" />
            <ValidatedSelectOtherInput
              id="brand"
              initialValues={DEFAULT_PAINTS}
            />
            <ValidatedSelectOtherInput
              id="quantity"
              initialValues={DEFAULT_QUANTITIES}
            />

            <LabeledInput id="email" inputType="email" label="Email" />
            <LabeledInput
              id="confirmEmail"
              inputType="email"
              label="Confirm email"
            />

            <ValidatedSelectOtherInput
              id="sheen"
              initialValues={DEFAULT_SHEENS}
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
        </FormProvider>
      </div>
    </div>
  );
}

export default GiveAwayPaint;
