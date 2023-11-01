import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Controller, useFormContext } from "react-hook-form";
import SelectOtherInput from "./SelectOtherInput";

import { OPTION_DEFAULT } from "../../constants";

export type ValidatedSelectOtherInputProps = {
  id: "brand" | "quantity";
  initialValues: Set<string>;
};
const ValidatedSelectOtherInput = ({
  id,
  initialValues,
}: ValidatedSelectOtherInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  return (
    <>
      <div className="sm:flex sm:flex-wrap">
        <Controller
          control={control}
          name={id}
          defaultValue={OPTION_DEFAULT}
          render={({ field: { onChange, onBlur } }) => (
            <SelectOtherInput
              id={id}
              name={id}
              initialValues={initialValues}
              label={`${id}:`}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
          rules={{
            validate: (value) => {
              if (value === OPTION_DEFAULT || value == "other") {
                return `Please enter a ${id}`;
              }
            },
          }}
        />
      </div>

      <ErrorMessage
        errors={errors}
        name={id}
        render={({ message }) => (
          <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right text-sm">
            {message}
          </p>
        )}
      />
    </>
  );
};

export default ValidatedSelectOtherInput;
