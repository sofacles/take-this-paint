import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../useAuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export type LoginFields = {
  email: string;
  password: string;
};

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFields>({ mode: "all" });

  const doSubmit: SubmitHandler<LoginFields> = async (data) => {
    const { email, password } = data;

    const response = await fetch("/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: `email=${email}&password=${password}`, // body data type must match "Content-Type" header
    });

    if (response.status === 200) {
      const json = await response.json();
      if (json.message === "User Logged In!") {
        setIsLoggedIn(true);
        navigate("/admin");
      }
    } else {
      setIsLoggedIn(false);
      setLoginFailed(true);
    }

    return false;
  };

  return (
    <div className="mx-auto py-6">
      <form onSubmit={handleSubmit(doSubmit)} className="space-y-6 mt-8">
        <h1 className="text-2xl text-emerald-700">Admin log in</h1>
        <div className="sm:flex sm:flex-wrap justify-end">
          <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
            <label htmlFor="email">Email:</label>
          </span>
          <input
            className="ml-10 sm:ml-0 w-2/3"
            id="email"
            {...register("email", { required: `Please enter your email` })}
            type="text"
          />
        </div>
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => (
            <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right text-sm">
              {message}
            </p>
          )}
        />
        <div className="sm:flex sm:flex-wrap justify-end">
          <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
            <label htmlFor="password">Password:</label>
          </span>
          <input
            className="ml-10 sm:ml-0 w-2/3"
            id="password"
            {...register("password", {
              required: `Please enter your password`,
            })}
            type="password"
          />
        </div>
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <p className="basis-full my-0 pt-0 text-red-400 ml-10 sm:text-right text-sm">
              {message}
            </p>
          )}
        />

        {loginFailed && (
          <div className="px-10 sm:px-0 w-full text-right text-red-400">
            Login failed.
          </div>
        )}

        <div className="flex justify-end">
          <button className="mx-10 sm:mx-0 bg-emerald-300 border-2 hover:bg-emerald-100 border-emerald-800 p-2 rounded-md">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
