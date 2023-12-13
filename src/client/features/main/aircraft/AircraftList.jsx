import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAircraftQuery } from "./AircraftSlice";

export default function AircraftList(){
  const navigate = useNavigate();
  const { data: aircraft, error, isLoading } = useGetAircraftQuery();

  useEffect(() => {    
    if (error) {
      console.error("Error fetching aircraft data:", error);
    }
  }, [error]);

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
      {isLoading && <div>Loading...</div>}
      {!isLoading && (!aircraft || aircraft.length === 0) && <div>No flights found</div>}
      {!isLoading && aircraft && aircraft.map((singleAircraft) => (
        <li key={singleAircraft.id}>
        {singleAircraft.tailNum} {singleAircraft.makeModel}
          <span>  <Link to={`/aircraft/${singleAircraft.id}`}>Details</Link></span>
        </li>
      ))}
      </ul>
    </>
  )
}