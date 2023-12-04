import React from "react";
// import react from "@vitejs/plugin-react-swc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const flight = { // Placeholder object for flight
  name: null,
  aircraft: {singleEngine: false},
  solo: false,
  picId: {name: null},
  sicId: {name: null},
  date: null,
  departure: null,
  arrival: null,

 };

function checkEngineType(){
  if(flight.aircraft.singleEngine){
    return "Single Engine"
  } else{
    return "Multi-Engine"
  }
}

export default function FlightDetailsForm(){
  const navigate = useNavigate;
  const engineType = checkEngineType();
  const engineRuntime = 0.0;
  const totalFlightTime = 0.0;
  const dayFlightHours = 0.0;
  const nightFlightHours = 0.0;

  
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
        <form>
          <label>Pilot in Command: <input type="text" value ={flight.picId.name} /></label>
          <label>Second in Command: <input type="text" value ={flight.sicId.name} /></label>
          <label>Tail Number: <input type="text" value ={flight.aircraft.tailnumber} /></label>
          <label>Aircraft: <input type="text" value ={flight.aircraft.makeModel} /></label>
          <label>Engine Type: <input type="text" value ={engineType} /></label>
          <label>Airport Departure: <input type="text" value ={flight.departure} /></label>
          <label>Airport Arrival: <input type="text" value ={flight.arrival} /></label>
          <label><input type="checkbox" value={flight.solo} />Solo</label>
        </form>
        <form>
          <label>Engine Runtime: <input type="number" value ={engineRuntime} /></label>
          <label>Total Flight Time: <input type="number" value ={totalFlightTime} /></label>
          <label>Day Flight Hours: <input type="number" value ={dayFlightHours} /></label>
          <label>Night Flight Hours: <input type="number" value ={nightFlightHours} /></label>
        </form>
        <button>Update</button>
      </body>
    </>
  )
}