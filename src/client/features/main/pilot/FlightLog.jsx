import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectId } from "../../auth/authSlice";
import { useGetFlightQuery } from "./flightLogSlice"; 
import { useGetPilotQuery } from "./pilotSlice";

const FlightLog = () => {
  const usrId = useSelector(selectId);
  
  // queries the api for flights
  const { data: flights, error: flightError, isLoading: isFlightLoading } = useGetFlightQuery(usrId);

  // queries the api for pilot's first name and assigns it to pilotName
  const { data: pilotData, error: pilotError, isLoading: isPilotLoading } = useGetPilotQuery(usrId);

  const isLoading = isFlightLoading || isPilotLoading;

  useEffect(() => {    
    if (flightError) {
      console.error("Error fetching flight data:", flightError);
    }
    if (pilotError) {
      console.error("Error fetching pilot data:", pilotError);
    }
  }, [flightError, pilotError]);

  // Calculate total flight hours
  const calculateTotalFlightHours = () => {
    let totalHours = 0;
    let totalSoloHours = 0;
    let totalDayHours = 0;
    let totalNightHours = 0;

    if (flights) {
      flights.forEach((flight) => {
        if (flight.FlightTimes && flight.FlightTimes.length > 0) {
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
      });
    }

    return { total: totalHours.toFixed(2), day: totalDayHours.toFixed(2), night: totalNightHours.toFixed(2), solo: totalSoloHours.toFixed(2) }; // Round to two decimal places
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
  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
        <h2>{pilotData ? `${pilotData.firstName}'s Flight Log` : "Loading..."}</h2>
      </header>
      <section>
        <h2>Flight Hours</h2>
        <p>Total Flight: {totalFlightHours.total}hrs</p>
        <p>Day Flight: {totalFlightHours.day}hrs</p>
        <p>Night Flight: {totalFlightHours.night}hrs</p>
        <p>Solo Flight: {totalFlightHours.solo}hrs</p>
      </section>
      <br />
      <section>
        <ul>
          {isLoading && <div>Loading...</div>}
          {!isLoading && (!flights || flights.length === 0) && <div>No flights found</div>}
          {!isLoading && flights && flights.map((flight) => (
              <li key={flight.id}>
                {formatFlightDate(flight)}
                <span>
                  <Link to={`/pilot/${usrId}/flight_log/${flight.id}`}>Details</Link>
                </span>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
};

export default FlightLog;
