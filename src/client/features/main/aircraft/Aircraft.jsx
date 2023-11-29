import React from "react";
import react from "@vitejs/plugin-react-swc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function checkEngineType(){
  if(aircraft.singleEngine){
    return "Single Engine"
  } else{
    return "Multi-Engine"
  }
}

export default function Aircraft(){
  const navigate = useNavigate;
  const engineType = checkEngineType();
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
        <section>
          <p>Tail Number: {aircraft.tailnumber}</p>
          <p>Make/Model: {aircraft.makeModel}</p>
          <p># of engines: {engineType}</p>
          <p>Hobbs Meter: {aircraft.hobbs}</p>
        </section>
        <button>Edit</button>
      </body>
    </>
  )
}