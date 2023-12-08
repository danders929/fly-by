import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const aircraft = { // Placeholder object for aircraft
  tailNumber: "",
  makeModel: "",
  singleEngine: false,
  hobbs: 0,
};


export default function AircraftDetailsForm(){
  const navigate = useNavigate();
  const { aircraftId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/aircraft/${aircraftId}`);
  };

  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
        <h2>Aircraft Details</h2>
      </header>
        <form onSubmit={handleSubmit}>
          <label>Tail Number: 
            <input 
              type="text" 
              value={aircraft.tailNumber}
              onChange={(e) => {
                //code for handling update to field
              }} />
          </label>
          <label>Make/Model: 
            <input 
              type="text" 
              value={aircraft.makeModel}
              onChange={(e) => {
                //code for handling update to field
              }} />
          </label>
          <label>Single Engine: 
            <input 
              type="checkbox" 
              value={aircraft.singleEngine}
              onChange={(e) => {
                //code for handling update to field
              }} /></label>
          <label>Hobbs Meter: 
            <input 
              type="number" 
              value={aircraft.hobbs}
              onChange={(e) => {
                //code for handling update to field
              }} /></label>
          <button type="submit">Update</button>
        </form>
    </>
  )
}