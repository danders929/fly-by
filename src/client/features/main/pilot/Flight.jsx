import React from "react";
import react from "@vitejs/plugin-react-swc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Flight(){
  const navigate = useNavigate;
  // Placeholder variablees until code to calculate time is done.
  const engRuntime = 0.00;
  const totalFlightTime = 0.00;
  const dayFlightTime = 0.00;
  const nightFlightTime = 0.00;
  const flight = {}; //placeholder object for getting flight details
  return (
    <>
      <header>
        <button>Home</button>
        <p>Image PlaceHolder</p>
        <button>Profile</button>
        <button>Logout</button>
        <h1>Fly-By</h1>
        <h2>Flight: {flight.name}</h2>
      </header>
      <body>
        <button>Day</button>
        <button>Night</button>
        <button>Wheels Up</button>
        <button>Wheels Down</button>
        <button>Engine Stop</button>
        <section>
          <p>`Engine Runtime: {engRuntime}hrs</p>
          <p>`Total Flight Time: {totalFlightTime}hrs</p>
          <p>`Day Flight Hours: {dayFlightTime}hrs</p>
          <p>`Night Flight Hours: {nightFlightTime}hrs</p>
        </section>
      </body>
    </>
  )
}