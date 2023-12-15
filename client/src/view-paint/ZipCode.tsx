import { ZipCodeFieldsType } from "../types";
import { FormProvider, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
export type ZipCodePropsType = {
  onUpdated: (distance: number, zip: string) => void;
  value: ZipCodeFieldsType;
};

const ZipCode = (props: ZipCodePropsType) => {
  const { zipCode, milesFrom } = props.value;
  const methods = useForm<ZipCodeFieldsType>({ mode: "all" });
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
        <h2 className="block md:hidden mt-4">
          Show me opened paints that people want to get rid of
        </h2>
        <div className="items-baseline flex mt-4 max-h-[3rem]">
          <span className="hidden md:inline  mr-2 md:mr-1">
            Show me opened paints that people want to get rid of
          </span>
          <label htmlFor="milesFrom" className="mr-2  ">
            within
          </label>
          <input
            className="mr-2 w-[80px] rounded-md h-6"
            type="text"
            {...register("milesFrom", {
              required: "enter a number",
              value: milesFrom,
            })}
          />

          <label htmlFor="milesFrom" className="mr-2">
            miles of
          </label>
          <input
            type="text"
            className="mr-2 w-[80px]  rounded-md h-6"
            {...register("zipCode", {
              required: "enter zip code",
              validate: (r) => /^\d{5}$/.test(r) || "enter 5 digits",
              value: zipCode,
            })}
          />
          <input
            className="bg-emerald-100 flex py-0 h-6 border-spacing-1 hover:bg-emerald-300 hover:shadow-md border-emerald-800 p-2 rounded-md"
            type="submit"
            value="OK"
          />
        </div>
        <p className="mt-0 mb-4 pt-0 text-red-400 ml-10  text-sm">
          <ErrorMessage
            errors={errors}
            name="milesFrom"
            render={({ message }) => (
              <span className="mr-6 md:mr-16">{message}</span>
            )}
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
