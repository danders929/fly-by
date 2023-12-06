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

function checkEngineType() {
  if (flight.aircraft.singleEngine) {
    return "Single Engine";
  } else {
    return "Multi-Engine";
  }
}

export default function FlightDetailsForm() {
  const navigate = useNavigate();
  const usrId = useSelector(selectId);
  const { fltId } = useParams();

  // placeholder data for flight data
  const engineType = checkEngineType();
  let engineRuntime = 0.0;
  let totalFlightTime = 0.0;
  let dayFlightHours = 0.0;
  let nightFlightHours = 0.0;

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/pilot/${usrId}/flight_log/${fltId}`);
  };

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
      <section>
        <h3>Flight Details</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Pilot in Command:{" "}
            <input 
              type="text" 
              value={flight.picId.name}
              onChange={(e) => {
                //code for handling update to field
              }}
              />
          </label>
          <label>
            Second in Command:{" "}
            <input 
              type="text" 
              value={flight.sicId.name}
              onChange={(e) => {
                //code for handling update to field
              }}
            />
          </label>
          <label>
            Tail Number: <input 
              type="text" 
              value={flight.aircraft.tailnumber}
              onChange={(e) => {
                //code for handling update to field
              }}
              />
          </label>
          <label>
            Aircraft: <input 
              type="text" 
              value={flight.aircraft.makeModel}
              onChange={(e) => {
                //code for handling update to field
              }} />
          </label>
          <label>
            Engine Type: <input 
              type="text" 
              value={engineType}
              onChange={(e) => {
                //code for handling update to field
              }} />
          </label>
          <label>
            Airport Departure:{" "}
            <input 
              type="text" 
              value={flight.departure}
              onChange={(e) => {
                //code for handling update to field
              }} />
          </label>
          <label>
            Airport Arrival: <input 
            type="text" 
            value={flight.arrival}
            onChange={(e) => {
                //code for handling update to field
              }} />
          </label>
          <label>
            <input 
              type="checkbox" 
              value={flight.solo}
              onChange={(e) => {
                //code for handling update to field
              }} /> Solo
          </label>
          <label>
            Engine Runtime: <input 
              type="number" 
              value={engineRuntime}
              onChange={(e) => {
                //code for handling update to field
              }} />
          </label>
          <label>
            Total Flight Time:{" "}
            <input 
              type="number" 
              value={totalFlightTime}
              onChange={(e) => {
                //code for handling update to field
              }} />
          </label>
          <label>
            Day Flight Hours:{" "}
            <input 
              type="number" 
              value={dayFlightHours}
              onChange={(e) => {
                //code for handling update to field
              }} />
          </label>
          <label>
            Night Flight Hours:{" "}
            <input 
              type="number" 
              value={nightFlightHours}
              onChange={(e) => {
                //code for handling update to field
              }} />
          </label>
          <button type="submit">Update</button>
        </form>
      </section>
    </>
  );
}
