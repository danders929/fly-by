import React from "react";
import react from "@vitejs/plugin-react-swc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FlightLog(){
  const navigate = useNavigate;
  const totalFlightHours = 0.0;
  const totalDayFlightHours = 0.0;
  const totalNightFlightHours = 0.0;
  const totalSoloFlightHours = 0.0;
  const singleEngineHours = 0.0;
  const multiEngineHours = 0.0;
  const pilotName = ""; // Placeholder for getting pilot name
  
  return (
    <>
      <header>
        <button>Home</button>
        <p>Image PlaceHolder</p>
        <button>Profile</button>
        <button>Logout</button>
        <h1>Fly-By</h1>
        <h2>{pilotName}'s Flight Log</h2>
      </header>
      <body>
        <section>
          <h2>Flight Hours</h2>
          <p>Total Flight: {totalFlightHours}hrs</p>
          <p>Day Flight: {totalDayFlightHours}hrs</p>
          <p>Night Flight: {totalNightFlightHours}hrs</p>
          <p>Solo Flight: {totalSoloFlightHours}hrs</p>
        </section>
        <section>
          <h2>Engine Type Hours</h2>
          <p>Single Engine: {singleEngineHours}hrs</p>
          <p>Multi-Engine Flight: {multiEngineHours}hrs</p>
        </section>
        <ul>
          {/* TODO: for each flight in flight log create a list item with flight: {flight.name} */}
          <li>test list item. REPLACE ME with a for loop</li>
        </ul>
      </body>
    </>
  )
}