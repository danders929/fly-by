import React from "react";
// import react from "@vitejs/plugin-react-swc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate;
  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
        <h2>Sign Up Form</h2>
      </header>
      <body>
        <form>
          <label>
            First Name
            <input type="text"></input>
          </label>
          <label>
            Last Name
            <input type="text"></input>
          </label>
          <label>
            E-mail
            <input
              type="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            ></input>
          </label>
          <label>
            Password:
            <input type="password"></input>
          </label>
          <label>
            Re-Type Password:
            <input type="password"></input>
          </label>
          <button>Register</button>
        </form>
      </body>
    </>
  );
}
