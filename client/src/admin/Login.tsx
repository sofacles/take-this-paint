import React, { SyntheticEvent, useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../useAuthContext";

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loginFailed, setLoginFailed] = useState(false);

  const doSubmit = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    const email = "Dusty28@cuffcoates.com"; //emailRef.current?.value;
    const pwd = "Frijoles19"; //passwordRef.current?.value;

    if (email && email.length > 3 && pwd && pwd.length > 6) {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // referrerPolicy: "no-referrer",
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
    <div>
      Login
      <form onSubmit={doSubmit}>
        <p>
          email: <input type="text" ref={emailRef} />
        </p>
        <p>
          password: <input type="text" ref={passwordRef} />
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            doSubmit(e);
          }}
        >
          submit
        </button>
      </form>
      {loginFailed && <div>Login failed.</div>}
    </div>
  );
};

export default Login;
