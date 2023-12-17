import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectId } from "../../auth/authSlice";
import { useGetFlightQueryById } from "./flightLogSlice";
import { useGetPilotQuery } from "./pilotSlice";

const FlightDetails = () => {
  const navigate = useNavigate();
  const usrId = useSelector(selectId);
  const { fltId } = useParams();

  const { data: flight, error, isLoading } = useGetFlightQueryById(fltId);
  // const { data: pilotData, pilotError, pilotIsLoading} = useGetPilotQuery(pilotId);

  // const {picName, setPicName} = useState("");
  // const {sicName, setSicName} = useState("");

  useEffect(() => {
    if (error) {
      console.error("Error fetching flight data:", error);
    }
  }, [error]);

  // Check if flight is loading or undefined
  if (isLoading || !flight) {
    return <div>Loading...</div>;
  }


  // Calculate total flight hours
  const calculateTotalFlightHours = () => {
    let totalEngineHours = 0;
    let totalHours = 0;
    let totalSoloHours = 0;
    let totalDayHours = 0;
    let totalNightHours = 0;

    if (flight) {
      if (flight.FlightTimes && flight.FlightTimes.length > 0) {
        const engStart = new Date(flight.engineStartTime)
        const engStop = new Date(flight.engineStopTime);
        const engHours = (engStop - engStart) / (1000 * 60 * 60);
        totalEngineHours += engHours;

        flight.FlightTimes.forEach((time) => {
          const startTime = new Date(time.timeStart);
          const stopTime = time.timeStop ? new Date(time.timeStop) : new Date(); // Use current time if timeStop is not available
          const duration = stopTime - startTime;
          const hours = duration / (1000 * 60 * 60); 
          const dayFlight = time.dayFlight;
          totalHours += hours;

          // Check if it's a solo flight and add hours to totalSoloHours
          if (flight.solo) {
            totalSoloHours += hours;
          }
          // Check if it's a day flight or night and add hours corespondingly
          if (dayFlight) {
            totalDayHours += hours;
          } else {
            totalNightHours += hours;
          }
        });
      }
    }
    return {totalEngineHours: totalEngineHours.toFixed(2), totalHours: totalHours.toFixed(2), day: totalDayHours.toFixed(2), night: totalNightHours.toFixed(2), solo: totalSoloHours.toFixed(2) }; // Round to two decimal places

  };

    // Formats the flight.date value to be MM:DD:YY
  const formatFlightDate = (flight) => {
    // Get date components
    const flightDate = new Date(flight.date);
    const month = String(flightDate.getMonth() + 1).padStart(2, "0");
    const day = String(flightDate.getDate()).padStart(2, "0");
    const year = String(flightDate.getFullYear()).slice(2);

    // Create the formatted date string (MM/DD/YY)
    const formattedDate = `${month}/${day}/${year}`;

    // Create the formatted date string with flight number (MM/DD/YY:N)
    const formattedWithNumber = `${formattedDate}`;
  
    return formattedWithNumber;
  };

  const totalFlightHours = calculateTotalFlightHours();
   
  const handleNavClick = (navLink) => {
    navigate(navLink);
  }
  
  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
        <h2>Flight: {flight && formatFlightDate(flight)}</h2>
      </header>
        <h3>Flight Details</h3>
        <section>
          <p>Pilot in Command: {flight.pilots[0].firstName} {flight.pilots[0].lastName}</p>
          <p>Second in Command: {flight.pilots[1].firstName} {flight.pilots[1].lastName}</p>
          <p>Tail Number: {flight.aircraft.tailNum}</p>
          <p>Airport Departure: {flight.departure}</p>
          <p>Airport Arrival: {flight.arrival}</p>
        </section>
        <h3>Flight Hours</h3>
        <section>
          <p>Engine Runtime: {totalFlightHours.totalEngineHours}</p>
          <p>Total Flight Time: {totalFlightHours.totalHours}</p>
          <p>Day Flight Hours: {totalFlightHours.day}</p>
          <p>Night Flight Hours: {totalFlightHours.night}</p>
        </section>
        <button onClick={() => handleNavClick(`/pilot/${usrId}/flight_log/${fltId}/update`)}>Edit</button>
    </>
  )
}

export default FlightDetails;
