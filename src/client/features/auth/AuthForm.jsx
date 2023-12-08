import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectId, useLoginMutation, useRegisterMutation } from "./authSlice";
import { useSelector } from "react-redux";


/** This form allows users to register or log in. */
export default function AuthForm() {
  const navigate = useNavigate();

  const id = useSelector(selectId);
  // Handles swapping between login and register
  const [isLogin, setIsLogin] = useState(true);
  const authAction = isLogin ? "Login" : "Register";
  const altCopy = isLogin
    ? "Need an account? Register here."
    : "Already have an account? Login here.";

  // Controlled form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Store userId from state

  // Form submission
  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();
  const [register, { isLoading: registerLoading, error: registerError }] =
    useRegisterMutation();

  /** Send the requested authentication action to the API */
  const attemptAuth = async (evt) => {
    evt.preventDefault();

    const authMethod = isLogin ? login : register;
    const credentials = { email, password };
    
    // We don't want to navigate if there's an error.
    // `unwrap` will throw an error if there is one
    // so we can use a try/catch to handle it.
    try {
      await authMethod(credentials).unwrap();
      //TODO: Check if profile exists, if so navigate to home. Else, navigate to pilotUpdate
      navigate(`/home`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h2>{authAction}</h2>
      </header>
      <form onSubmit={attemptAuth}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            id="email"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            id="password"
          />
        </label>
        <button>{authAction}</button>
      </form>
      <a onClick={() => setIsLogin(!isLogin)}>{altCopy}</a>

      {(loginLoading || registerLoading) && <p>Please wait...</p>}
      {loginError && <p role="alert">{loginError}</p>}
      {registerError && <p role="alert">{registerError}</p>}
    </>
  );
}
