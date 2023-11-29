import React from "react";
import react from "@vitejs/plugin-react-swc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Aircraft from "./Aircraft";

export default function AircraftDetailsForm(){
  const navigate = useNavigate;
  return (
    <>
      <header>
        <button>Home</button>
        <p>Image PlaceHolder</p>
        <button>Profile</button>
        <button>Logout</button>
        <h1>Fly-By</h1>
        <h2>Aircraft Details</h2>
      </header>
      <body>
        <form>
          <label>Tail Number: <input type="text" value={aircraft.tailNumber} /></label>
          <label>Make/Model: <input type="text" value={aircraft.makeModel} /></label>
          <label>Single Engine: <input type="checkbox" value={aircraft.singleEngine} /></label>
          <label>Hobbs Meter: <input type="number" value={aircraft.hobbs} /></label>
        </form>
        <button>Update</button>
      </body>
    </>
  )
}