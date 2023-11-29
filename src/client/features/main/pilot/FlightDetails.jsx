import React from "react";
import react from "@vitejs/plugin-react-swc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function checkEngineType(){
  if(flight.aircraft.singleEngine){
    return "Single Engine"
  } else{
    return "Multi-Engine"
  }
}

export default function FlightDetails(){
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
        <h2>Flight: {flight.name}</h2>
      </header>
      <body>
        <section>
          <p>Pilot in Command: {flight.picId.name}</p>
          <p>Second in Command: {flight.sicId.name}</p>
          <p>Tail Number: {flight.aircraft.tailnumber}</p>
          <p>Aircraft: {flight.aircraft.makeModel}</p>
          <p>Engine Type: {engineType}</p>
          <p>Airport Departure: {flight.departure}</p>
          <p>Airport Arrival: {flight.arrival}</p>
        </section>
        <section>
          <p>Engine Runtime: {engineRuntime}</p>
          <p>Total Flight Time: {totalFlightTime}</p>
          <p>Day Flight Hours: {dayFlightHours}</p>
          <p>Night Flight Hours: {nightFlightHours}</p>
        </section>
        <button>Edit</button>
      </body>
    </>
  )
}