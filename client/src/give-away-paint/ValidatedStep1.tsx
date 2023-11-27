import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Step1 from "./Step1";
import { DEFAULT_UPLOAD_PHOTO } from "../constants";

export interface ValidatedStep1Props {
  onDone: () => void;
}

const ValidatedStep1 = ({ onDone }: ValidatedStep1Props) => {
  const foo = useFormContext();

  const {
    control,
    setValue,
    formState: { errors },
  } = foo;

  return (
    <>
      <Controller
        control={control}
        name="oneOf"
        defaultValue={{ uploadPhoto: { data: null, preview: "" }, rgb: "777" }}
        render={(obj) => {
          const {
            field: { onChange, onBlur },
          } = obj;

          return (
            <Step1
              onChange={(val) => {
                const safeVal = {
                  ...val,
                  uploadPhoto: val.uploadPhoto || DEFAULT_UPLOAD_PHOTO,
                };

                setValue("oneOf", safeVal);
                onChange(safeVal);
              }}
              onBlur={() => {
                onBlur();
              }}
              onDone={() => {
                onDone();
              }}
            />
          );
        }}
        rules={{
          validate: (_value) => {
            const { rgb, uploadPhoto } = _value;
            if (uploadPhoto.data === null && rgb === "777") {
              return `Please upload a photo or pick a color`;
            }
          },
        }}
      />
      <ErrorMessage
        errors={errors}
        name="oneOf"
        render={({ message }) => (
          <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right text-sm">
            {message}
          </p>
        )}
      />
    </>
  );
};

export default ValidatedStep1;
