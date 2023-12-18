import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const attemptLogin = async (evt) => {
    evt.preventDefault();

    const credentials = { email, password };

    try {
      navigate("/pilot/1");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
      </header>
      <section>
        <form onSubmit={attemptLogin}>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            ></input>
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            ></input>
          </label>
          <button>SIGN IN</button>
          <button>SIGN UP</button>
        </form>
      </section>
    </>
  );
}
