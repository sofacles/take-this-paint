import { SyntheticEvent, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../useAuthContext";

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loginFailed, setLoginFailed] = useState(false);

  const doSubmit = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    const email = emailRef.current?.value;
    const pwd = passwordRef.current?.value;

    if (email && email.length > 3 && pwd && pwd.length > 5) {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: pwd }), // body data type must match "Content-Type" header
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
    }

    return false;
  };

  return (
    <div className="mx-auto py-6">
      <form onSubmit={doSubmit} className="space-y-6 mt-8">
        <h1 className="text-2xl text-emerald-700">Admin log in</h1>

        <div className="sm:flex sm:flex-wrap justify-end">
          <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
            <label htmlFor="email">Email:</label>
          </span>
          <input
            className="ml-10 sm:ml-0 w-2/3"
            id="email"
            ref={emailRef}
            type="text"
          />
        </div>
        <div className="sm:flex sm:flex-wrap justify-end">
          <span className="ml-10 sm:ml-0 sm:w-1/3 flex sm:justify-end p-1 sm:p-2">
            <label htmlFor="password">Password:</label>
          </span>
          <input
            className="ml-10 sm:ml-0 w-2/3"
            id="password"
            ref={passwordRef}
            type="password"
          />
        </div>
        {loginFailed && (
          <div className="px-10 sm:px-0 w-full text-right text-red-400">
            Login failed.
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="mx-10 sm:mx-0 bg-emerald-300 border-2 hover:bg-emerald-100 border-emerald-800 p-2 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              doSubmit(e);
            }}
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
