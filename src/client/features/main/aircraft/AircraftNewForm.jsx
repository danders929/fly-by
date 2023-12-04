import React from "react";
// import react from "@vitejs/plugin-react-swc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AircraftNewForm(){
  const navigate = useNavigate;
  return (
    <>
      <header>
        <button>Home</button>
        <p>Image PlaceHolder</p>
        <button>Profile</button>
        <button>Logout</button>
        <h1>Fly-By</h1>
        <h2>New Aircraft Form</h2>
      </header>
      <body>
        <form>
          <label>Tail Number: <input type="text" /></label>
          <label>Make/Model: <input type="text" /></label>
          <label>Single Engine: <input type="checkbox" /></label>
          <label>Hobbs Meter: <input type="number" /></label>
        </form>
        <button>Add</button>
      </body>
    </>
  )
}