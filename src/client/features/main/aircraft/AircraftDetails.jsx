import React, {useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAircraftByIdQuery } from "./AircraftSlice";

export default function AircraftDetails(){
  const navigate = useNavigate();
  const { aircraftId } = useParams();
  let engineType = "";

  const { data: aircraftData, error, isLoading } = useGetAircraftByIdQuery(aircraftId);

  useEffect(() => {
    if (error) {
      console.error("Error fetching pilot data:", error);
    }
  }, [error]);

  if (aircraftData && aircraftData.singleEngine){
    engineType = "Single Engine"
  } else {
    engineType = "Multi Engine"
  }

  const handleNavClick = (navLink) => {
    navigate(navLink);
  }

  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
        <h2>Aircraft Details</h2>
      </header>
        <section>
          <p>Tail Number: {aircraftData ? `${aircraftData.tailNum}` : "Loading..."}</p>
          <p>Make/Model: {aircraftData ? `${aircraftData.makeModel}` : "Loading..."}</p>
          <p>Engine Type: {aircraftData ? `${engineType}`: "Loading..."}</p>
          <p>Hobbs Meter: {aircraftData ? `${aircraftData.hobbs}` : "Loading..."}</p>
        </section>
        <button onClick={() => handleNavClick(`/aircraft/${aircraftId}/update`)}>Edit</button>
    </>
  )
}