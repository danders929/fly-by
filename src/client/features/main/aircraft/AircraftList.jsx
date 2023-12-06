import React from "react";
import { useNavigate } from "react-router-dom";

export default function AircraftList(){
  const navigate = useNavigate();
  const aircraftList = []; //Placeholder array for list of aircraft. TODO: This needs to be pulled from API.

  const handleNavClick = (navLink) => {
    navigate(navLink);
  }

  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
        <h2>Aircraft List</h2>
      </header>
      <button onClick={() => handleNavClick("/aircraft/new_form")}>Add Aircraft</button>
      <ul>
        {/* TODO: For each aircraft in aircraftList */}
        <li>Placeholder list item for each aircraft
          <span><Link to={`/aircraft/1`}>Details</Link></span>
        </li>
      </ul>
    </>
  )
}