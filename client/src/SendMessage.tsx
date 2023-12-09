import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { MessageToDonorFields } from "./types";

const SendMessage = () => {
  const [mailSent, setMailSent] = useState(false);
  const location = useLocation();
  const paint = location.state;
  const needHash = paint.rgb && paint.rgb[0] !== "#";

  const rgbStyle = {
    height: "100px",
    backgroundColor: `${needHash ? "#" : ""}${
      paint.rgb && paint.rgb.length > 0 ? paint.rgb : "#fff"
    }`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  };

  const imgStyle = {
    height: "90%",
    margin: "5px",
  };

  const image =
    paint.imageName && paint.imageName.length > 3 ? (
      <img alt="paint color" style={imgStyle} src={paint.imageName} />
    ) : (
      ""
    );

  const methods = useForm<MessageToDonorFields>({ mode: "all" });
  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<MessageToDonorFields> = async (data) => {
    const { email, confirmEmail, text } = data;
    await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: `paintId=${paint._id}&email=${encodeURIComponent(
        email
      )}&confirmEmail=${encodeURIComponent(confirmEmail)}&text=${text}`,
    });
    setMailSent(true);
  };

  return mailSent ? (
    <div>
      Thanks for your message. Please check your inbox for an email from our
      system to confirm your email address.
    </div>
  ) : (
    <div className="paint-detail">
      <h2 className="my-4 text-xl">
        Would you like to send a message to the donor of this paint?
      </h2>

      <div className="italic">
        <div>
          <span id="brand">{paint.brand}</span>
        </div>
        <div>
          <span id="name">{paint.name}</span>
        </div>
        <div>
          <span id="sheen">{paint.sheen}</span>
        </div>
        <div className="pb-3">
          <span id="quantity">{paint.quantity}</span>
        </div>

        <div style={rgbStyle}>{image}</div>
      </div>

      <p className="pt-4">
        Please enter your email address below and an optional message. After you
        confirm your email with the link we send, we'll relay your message to
        the donor of this paint.
      </p>
      <FormProvider {...methods}>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">email:</label>
          <input
            {...register("email", { required: "please enter an email" })}
            className="mb-2"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right text-sm">
                {message}
              </p>
            )}
          />

          <label htmlFor="confirmEmail">confirm email:</label>
          <input
            className="mb-2"
            {...register("confirmEmail", {
              required: "please confirm your email",
              validate: (value) =>
                value === getValues("email") || "emails do not match",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="confirmEmail"
            render={({ message }) => (
              <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right text-sm">
                {message}
              </p>
            )}
          />

          <label htmlFor="text">message:</label>
          <textarea
            className="mb-3"
            defaultValue="Hi, I'd like to come pick up that paint.  Or have you drop it off..."
            {...register("text")}
          />

          <div className="flex justify-evenly ">
            <input
              type="submit"
              value="send email"
              className="bg-emerald-300 border-2 hover:bg-emerald-100 border-emerald-800 p-2 rounded-md"
            ></input>
            <Link
              className="bg-emerald-300 border-2 hover:bg-emerald-100 border-emerald-800 p-2 rounded-md"
              to="/view-paints"
            >
              cancel
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SendMessage;
