import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

export type LabeledInputProps = {
  label: string;
  id: string;
  inputType?: string;
};
const LabeledInput = ({ id, label, inputType = "text" }: LabeledInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  return (
    <>
      <div className="sm:flex sm:flex-wrap">
        <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
          <label htmlFor="name">{label}:</label>
        </span>
        <input
          className="ml-10 sm:ml-0 w-2/3 rounded-md"
          {...register(id, { required: `Please add a ${id}` })}
          type={inputType}
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

export default LabeledInput;
