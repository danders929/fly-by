import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectId } from "../../auth/authSlice";

const flight = {
  // Placeholder object for flight
  name: "null",
  aircraft: { singleEngine: false },
  solo: false,
  picId: { name: "null" },
  sicId: { name: "null" },
  date: "null",
  departure: "null",
  arrival: "null",
};

function checkEngineType(){
  if(flight.aircraft.singleEngine){
    return "Single Engine"
  } else{
    return "Multi-Engine"
  }
}

export default function FlightDetails(){
  const navigate = useNavigate();
  const usrId = useSelector(selectId);
  const { fltId } = useParams();


  // placeholder data for flight data
  const engineType = checkEngineType();
  let engineRuntime = 0.0;
  let totalFlightTime = 0.0;
  let dayFlightHours = 0.0;
  let nightFlightHours = 0.0;
  
  const handleNavClick = (navLink) => {
    navigate(navLink);
  }
  
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
        <h3>Flight Details</h3>
        <section>
          <p>Pilot in Command: {flight.picId.name}</p>
          <p>Second in Command: {flight.sicId.name}</p>
          <p>Tail Number: {flight.aircraft.tailnumber}</p>
          <p>Aircraft: {flight.aircraft.makeModel}</p>
          <p>Engine Type: {engineType}</p>
          <p>Airport Departure: {flight.departure}</p>
          <p>Airport Arrival: {flight.arrival}</p>
        </section>
        <h3>Flight Hours</h3>
        <section>
          <p>Engine Runtime: {engineRuntime}</p>
          <p>Total Flight Time: {totalFlightTime}</p>
          <p>Day Flight Hours: {dayFlightHours}</p>
          <p>Night Flight Hours: {nightFlightHours}</p>
        </section>
        <button onClick={() => handleNavClick(`/pilot/${usrId}/flight_log/${fltId}/update`)}>Edit</button>
    </>
  )
}