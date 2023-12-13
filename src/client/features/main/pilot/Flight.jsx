import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectId } from "../../auth/authSlice";
import "./Flight.less";

export default function Flight(){
  const navigate = useNavigate();
  const usrId = useSelector(selectId);
  const { fltId } = useParams();
  // Placeholder variablees until code to calculate time is done.
  const engRuntime = 0.00;
  const totalFlightTime = 0.00;
  const dayFlightTime = 0.00;
  const nightFlightTime = 0.00;
  const flight = {}; //placeholder object for getting flight details

  const handleStopClick = (navLink) => {
    //TODO: add code to patch flight table, and add total flight hours to aircraft.
    navigate(navLink);
  }
  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
        <h2>Flight: {flight.name}</h2>
      </header>
      <section className="button-container">
        <button>Day</button>
        <button>Night</button>
        <button>Wheels Up</button>
        <button>Wheels Down</button>
      </section>
      <section className="flight-data">
        <table>
          <tbody>
            <tr>
              <td>Engine Runtime</td>
              <td>{engRuntime}hrs</td>
            </tr>
            <tr>
              <td>Total Flight Time</td>
              <td>{totalFlightTime}hrs</td>
            </tr>
            <tr>
              <td>Day Flight Hours</td>
              <td>{dayFlightTime}hrs</td>
            </tr>
            <tr>
              <td>Night Flight Hours</td>
              <td>{nightFlightTime}hrs</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="button-container">
        <button onClick={() => handleStopClick(`/pilot/${usrId}/flight_log/${fltId}`)}>Engine Stop</button>
      </section>
    </>
  );
}