import React, { useState } from "react";

import Checkmark from "./Checkmark";
import EditPen from "./EditPen";
import { ZipCodeFieldsType } from "../types";
import { FormProvider, register, useForm } from "react-hook-form";
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

  if (editMode) {
    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row">
            <span>Not new</span>
            <label htmlFor="milesFrom"></label>
            <input
              type="text"
              {...register("milesFrom", {
                required: "enter a number of miles",
                value: milesFrom,
              })}
            />
            from
            <label htmlFor="milesFrom"></label>
            <input
              type="text"
              {...register("zipCode", {
                required: "enter zip code",
                validate: (r) => /^\d{5}$/.test(r) || "enter 5 digits",
                value: zipCode,
              })}
            />
            <div role="button" onClick={() => setEditMode(false)}>
              <Checkmark />
            </div>
          </div>
        </form>
      </FormProvider>
    );
  } else {
    return (
      <div>
        <div className="p-2" role="button" onClick={() => setEditMode(true)}>
          <div className="">
            <span>
              Not new paint {milesFrom} miles from {zipCode}
            </span>
            <span className="inline-flex ml-3">
              <EditPen />
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default ZipCode;
