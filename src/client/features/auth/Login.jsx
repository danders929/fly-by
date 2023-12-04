import React from "react";
// import react from "@vitejs/plugin-react-swc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const navigate = useNavigate;
  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
      </header>
      <section>
        <form>
          <label>
            E-mail
            <input
              type="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            >
            </input>
          </label>
          <label>
            Password:
            <input
              type="password">
            </input>
          </label>
          <button>SIGN IN</button>
          <button>SIGN UP</button>
        </form>
      </section>
    </>
  )
}