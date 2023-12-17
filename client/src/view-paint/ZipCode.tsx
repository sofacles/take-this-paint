import React, { useState } from "react";

import Checkmark from "./Checkmark";
import EditPen from "./EditPen";
import { ZipCodeFieldsType } from "../types";
import { FormProvider, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
export type ZipCodePropsType = {
  onUpdated: (distance: number, zip: string) => void;
  value: ZipCodeFieldsType;
};

const ZipCode = (props: ZipCodePropsType) => {
  const [editMode, setEditMode] = useState(false);
  const { zipCode, milesFrom } = props.value;
  const methods = useForm<ZipCodeFieldsType>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: ZipCodeFieldsType) => {
    const { milesFrom, zipCode } = data;
    props.onUpdated(milesFrom, zipCode);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="visible sm:invisible">
          Show me opened paints that people want to get rid of within
        </h2>
        <div className="flex max-h-[3rem]">
          <label htmlFor="milesFrom" className="mr-2 invisible sm:visible ">
            Show me opened paints that people want to get rid of within
          </label>
          <input
            className="mr-2 w-[50px]"
            type="text"
            {...register("milesFrom", {
              required: "enter a number of miles",
              value: milesFrom,
            })}
          />

          <label htmlFor="milesFrom" className="mr-2">
            miles of
          </label>
          <input
            type="text"
            className="mr-2 w-[150px]"
            {...register("zipCode", {
              required: "enter zip code",
              validate: (r) => /^\d{5}$/.test(r) || "enter 5 digits",
              value: zipCode,
            })}
          />
          <input
            className="bg-emerald-300 border-2 hover:bg-emerald-100 border-emerald-800 p-2 rounded-md"
            type="submit"
            value="OK"
          />
        </div>
        <p className="my-0 pt-0 text-red-400 ml-10  text-sm">
          <ErrorMessage
            errors={errors}
            name="milesFrom"
            render={({ message }) => <span className="mr-16">{message}</span>}
          />
          <ErrorMessage
            errors={errors}
            name="zipCode"
            render={({ message }) => <span>{message}</span>}
          />
        </p>
      </form>
    </FormProvider>
  );
};

export default ZipCode;
