import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectId } from "../../auth/authSlice";

export default function FlightLog(){
  const navigate = useNavigate;
  const totalFlightHours = 0.0;
  const totalDayFlightHours = 0.0;
  const totalNightFlightHours = 0.0;
  const totalSoloFlightHours = 0.0;
  const singleEngineHours = 0.0;
  const multiEngineHours = 0.0;
  const pilotName = ""; // Placeholder for getting pilot name
  const usrId = useSelector(selectId);
  return (
    <>
    <header>
      <p>Image PlaceHolder</p>
      <h1>Fly-By</h1>
      <h2>{pilotName}'s Flight Log</h2>
    </header>
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
        {/* TODO: for each flight in flight log create a list item with flight: {flight.name}
                  update link to use {flight.id}
           */}
        <li>test list item. REPLACE ME with a for loop 
          <span><Link to={`/pilot/${usrId}/flight_log/1`}>Details</Link></span>
        </li>
      </ul>
    </>
  )
}