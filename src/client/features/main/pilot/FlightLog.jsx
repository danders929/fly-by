import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectId } from "../../auth/authSlice";
import { useGetFlightQuery } from "./flightLogSlice"; // Import the useGetFlightQuery hook

const FlightLog = () => {
  const totalFlightHours = 0.0;
  const totalDayFlightHours = 0.0;
  const totalNightFlightHours = 0.0;
  const totalSoloFlightHours = 0.0;
  const singleEngineHours = 0.0;
  const multiEngineHours = 0.0;
  const pilotName = ""; // Placeholder for getting pilot name
  const usrId = useSelector(selectId);

  // Use the generated useGetFlightQuery hook
  const { data: flights, error, isLoading } = useGetFlightQuery(usrId);

  useEffect(() => {
    if (error) {
      console.error("Error fetching flight data:", error);
    }
  }, [error]);
  
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
    const formattedWithNumber = `${formattedDate}:${flight.number}`;
  
    return formattedWithNumber;
  };

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
        {isLoading && <div>Loading...</div>}
        {!isLoading && (!flights || flights.length === 0) && <div>No flights found</div>}
        {!isLoading &&
          flights &&
          flights.map((flight) => (
            <li key={flight.id}>
              {formatFlightDate(flight, flights)}
              <span>
                <Link to={`/pilot/${usrId}/flight_log/${flight.id}`}>Details</Link>
              </span>
            </li>
          ))}
      </ul>
    </>
  );
};

export default FlightLog;
