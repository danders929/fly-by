import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const aircraft = {}; // Placeholder Object for aircraft

function checkEngineType(){
  if(aircraft.singleEngine){
    return "Single Engine"
  } else{
    return "Multi-Engine"
  }
}

export default function AircraftDetails(){
  const navigate = useNavigate();
  const { aircraftId } = useParams();
  const engineType = checkEngineType();
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
        <h2>Aircraft Details</h2>
      </header>
        <section>
          <p>Tail Number: {aircraft.tailnumber}</p>
          <p>Make/Model: {aircraft.makeModel}</p>
          <p># of engines: {engineType}</p>
          <p>Hobbs Meter: {aircraft.hobbs}</p>
        </section>
        <button onClick={() => handleNavClick(`/aircraft/${aircraftId}/update`)}>Edit</button>
    </>
  )
}