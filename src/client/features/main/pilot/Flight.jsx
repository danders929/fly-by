import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFlightQueryById, useUpdateFlight } from "./flightLogSlice";
import { useCreateFlightTimes, useUpdateFlightTimes } from "./flightTimesSlice";
import "./Flight.less";

export default function Flight(){
  const navigate = useNavigate();
  const { fltId } = useParams();
  const [totalFlightHours, setTotalFlightHours] = useState({
    totalEngineHours: "0.00",
    totalHours: "0.00",
    day: "0.00",
    night: "0.00",
  });
  const [isDayFlight, setIsDayFlight] = useState(true);

  const { data: flight, error, isLoading } = useGetFlightQueryById(fltId);

  useEffect(() => {
    if (error) {
      console.error("Error fetching flight data:", error);
    }
  }, [error]);

  const calculateTotalFlightHours = () => {
    let totalEngineHours = 0;
    let totalHours = 0;
    let totalDayHours = 0;
    let totalNightHours = 0;

    // calculates Engine Hours
    if (flight.engineStartTime){
      const engStart = new Date(flight.engineStartTime);
      const engStop = new Date();
      const engHours = (engStop - engStart) / (1000 * 60 * 60);
      totalEngineHours += engHours;
    };
    
    // Calculates total flight hours
    if (flight?.FlightTimes && flight.FlightTimes.length > 0) {
      flight.FlightTimes.forEach((time) => {
        const startTime = new Date(time.timeStart);
        const stopTime = time.timeStop
          ? new Date(time.timeStop)
          : new Date(); // Use current time if timeStop is not available
        const duration = stopTime - startTime;
        const hours = duration / (1000 * 60 * 60);
        const dayFlight = time.dayFlight;
        totalHours += hours;

        // Check if it's a day flight or night and add hours correspondingly
        if (dayFlight) {
          totalDayHours += hours;
        } else {
          totalNightHours += hours;
        }
      });
    }

    return {
      totalEngineHours: totalEngineHours.toFixed(2),
      totalHours: totalHours.toFixed(2),
      day: totalDayHours.toFixed(2),
      night: totalNightHours.toFixed(2),
    }; // Round to two decimal places
  };

  // useEffect Initial Calculation
  useEffect(() => {
    // Check if flight data is available before calculating
    if (flight) {
      const updatedTotalFlightHours = calculateTotalFlightHours();
      setTotalFlightHours(updatedTotalFlightHours);
    }
  }, [flight]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedTotalFlightHours = calculateTotalFlightHours();
      setTotalFlightHours(updatedTotalFlightHours);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [flight]);
  
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

  const handleDayClick = () => {
    //TODO: add code to set current flightTime.timeStop, 
    //      and create a new flight time with timeStart, 
    //      dayFlight: true, nightFlight: false, 
    //      flight: {connect: [{ id: Number(fltId)}
    //      and setIsDayFlight(true)
  }

  const handleNightClick = () => {
    //TODO: add code to set current flightTime.timeStop, 
    //      and create a new flight time with timeStart, 
    //      dayFlight: false, nightFlight: true, 
    //      flight: {connect: [{ id: Number(fltId)}]}
    //      and setIsDayFlight(false).
  }

  const handleWheelsUpClick = () => {
    //TODO: add code to create a new flight with current time as timeStart,
    //      dayFlight: isDayFlight, and flight: {connect: [{ id: Number(fltId)}]}
  }

  const handleWheelsDownClick = () => {
    //TODO: patch current flightTime.timeStop with current time.
  }

  const handleEngineStopClick = (navLink) => {
    //TODO: add code to patch flight table engineStopTime with current time,
    //      and navigate to flight details page.
    navigate(navLink);
  }
  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
        <h2>Flight: {flight && formatFlightDate(flight)}</h2>
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
              <td>{totalFlightHours.totalEngineHours}hrs</td>
            </tr>
            <tr>
              <td>Total Flight Time</td>
              <td>{totalFlightHours.totalHours}hrs</td>
            </tr>
            <tr>
              <td>Day Flight Hours</td>
              <td>{totalFlightHours.day}hrs</td>
            </tr>
            <tr>
              <td>Night Flight Hours</td>
              <td>{totalFlightHours.night}hrs</td>
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