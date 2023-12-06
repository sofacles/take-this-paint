import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { MessageToDonorFields, PaintType } from "./types";

const SendMessage = (props) => {
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
    const { email, confirmEmail, text } = getValues();
    await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: `paintId=${paint._id}&email=${email}&confirmEmail=${confirmEmail}&text=${text}`,
    });
    setMailSent(true);
  };

  // if (response && response.status === 201) {
  //   navigate("/thank-you");
  // }

  return mailSent ? (
    <div> thanks for your message</div>
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
      <h3>
        Dec 7, 2023. This is under construction. I'm trying to set up an
        anonymized email system, like Craigslist. It's turning out to be
        trickier than I thought. I am just storing an ecrypted copy of whatever
        email you enter in a database for now. It's fine to enter a fake email,
        since I'm really using it as a way to identify paint donors I might just
        go with having users sign up and then have in-app messaging between
        donors and recipients.
      </h3>
      <p className="pt-4">
        Please enter your email address below. We will set up a temporary email
        account for you that the paint donor can use to contact you and you can
        cancel it with a link that we will send to your inbox.
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
