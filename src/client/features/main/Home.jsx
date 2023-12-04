import React from "react";
// import react from "@vitejs/plugin-react-swc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
  const navigate = useNavigate;
  return (
    <>
      <header>
        <button>Home</button>
        <p>Image PlaceHolder</p>
        <button>Profile</button>
        <button>Logout</button>
        <h1>Fly-By</h1>
        <h2>Home Page</h2>
      </header>
      <body>
        <button>New Flight</button>
        <button>Flight Log</button>
        <button>Aircraft</button>
      </body>
    </>
  )
}