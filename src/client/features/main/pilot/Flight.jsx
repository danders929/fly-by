import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFlightQueryById, useUpdateFlight } from "./flightLogSlice";
import { useCreateFlightTimes, useUpdateFlightTimes } from "./flightTimesSlice";
import "./Flight.less";

export default function Flight(){
  const navigate = useNavigate();
  const { fltId } = useParams();

  // State for tracking flight hours
  const [totalFlightHours, setTotalFlightHours] = useState({
    totalEngineHours: "0.00",
    totalHours: "0.00",
    day: "0.00",
    night: "0.00",
  });

  // State for tracking the currentFlightTimeId
  const [currentFlightTimeId, setCurrentFlightTimeId] = useState(0);

  // State for tracking the flight status
  const [isAirborne, setIsAirborne] = useState(false);
  
  // retrieves isDay and isNight from sessionStorage, converts to bool and assigns values to state.
  const isDay = sessionStorage.isDay ==='true';
  const isNight = sessionStorage.isNight ==='true';
  const [isDayFlight, setIsDayFlight] = useState(isDay);
  const [isNightFlight, setIsNightFlight] = useState(isNight);

  // Retrieves current flight data
  const { data: flight, error: flightError, isLoading: isFlightLoading } = useGetFlightQueryById(fltId);

  // Creates a new flightTime record
  const [ newFlightTime, { isLoading: newFlightTimeLoading, error: newFlightTimeError }] = useCreateFlightTimes();

  // Updates current flightTime record
  const [updateFlightTime, {isLoading: updateFlightTimeLoading, error: updateFlightTimeError }] = useUpdateFlightTimes(currentFlightTimeId);
  
  useEffect(() => {
    if (flightError) {
      console.error("Error fetching flight data:", flightError);
    }
    if (newFlightTimeError) {
      console.error("Error creating new flight time:", newFlightTimeError);
    }
    if (updateFlightTimeError) {
      console.error("Error updating current flight time:", updateFlightTimeError)
    }
  }, [flightError, newFlightTimeError, updateFlightTimeError]);

  // function for calculating hours and returning them to the state.
  const calculateTotalFlightHours = () => {
    let totalEngineHours = 0;
    let totalHours = 0;
    let totalDayHours = 0;
    let totalNightHours = 0;

    // Calculates Engine Hours
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
    // returns values to state rounded to two decimal places
    return {
      totalEngineHours: totalEngineHours.toFixed(2),
      totalHours: totalHours.toFixed(2),
      day: totalDayHours.toFixed(2),
      night: totalNightHours.toFixed(2),
    }; 
  };

  // useEffect Initial Calculation
  useEffect(() => {
    // Check if flight data is available before calculating
    if (flight) {
      const updatedTotalFlightHours = calculateTotalFlightHours();
      setTotalFlightHours(updatedTotalFlightHours);
    }
  }, [flight]);
  
  // Re-renders total times every 36 seconds or .01 hours.
  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedTotalFlightHours = calculateTotalFlightHours();
      setTotalFlightHours(updatedTotalFlightHours);
    }, 36000);
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

  const handleDayClick = async (event) => {
    //TODO: if currentFlightTime.timeStop null 
    //        set current time as flightTime.timeStop, 
    //        and create a new flight time with timeStart, 
    //        dayFlight: true, nightFlight: false, 
    //        flight: {connect: [{ id: Number(fltId)}
    //        and setIsDayFlight(true), setIsNightFlight(false)
    //      if currentFlightTime.timeStop !null
    //        then setIsDayFlight(true), setIsNightFlight(false)
  }

  const handleNightClick = async (event) => {
    //TODO: if currentFlightTime.timeStop null
    setIsDayFlight(false);
    setIsNightFlight(true);
    if (isAirborne){
      const dateTime = new Date();
      const flightTimeData = {
        "timeStop": dateTime.toISOString(),
      }
      const newFlightTimeData = {
        "timeStart": dateTime.toISOString(),
        "timeStop": null,
        "dayFlight": isDayFlight,
        "nightFlight": isNightFlight,
        "flight": {
          "connect": {
            "id": Number(fltId),
          }
        }
      }
      try {
        const patchFlightTime = await updateFlightTime({ id: currentFlightTimeId, ...flightTimeData }).unwrap();
      } catch (err) {
        console.error(err);
      }
      try {
        const addFlightTime = await newFlightTime(newFlightTimeData).unwrap();
        setCurrentFlightTimeId(response.id);
      } catch (err){
      }
    }
  }

  // Creates a new flightTime record with current time day/night values, and fltId
  const handleWheelsUpClick = async (event) => {
    const dateTime = new Date();
    const flightTimeData = {
      "timeStart": dateTime.toISOString(),
      "timeStop": null,
      "dayFlight": isDayFlight,
      "nightFlight": isNightFlight,
      "flight": {
        "connect": {
          "id": Number(fltId),
        }
      }
    };
    try {
      const addFlightTime = await newFlightTime(flightTimeData).unwrap();
      setCurrentFlightTimeId(response.id);
      setIsAirborne(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWheelsDownClick = async (event) => {
    //TODO: patch current flightTime.timeStop with current time.
    if (isAirborne){
      const dateTime = new Date();
      const flightTimeData = {
        "timeStop": dateTime.toISOString(),
      }
      try {
        const patchFlightTime = await updateFlightTime({ id: currentFlightTimeId, ...flightTimeData }).unwrap();
        setIsAirborne(false);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("You are currently not airborne.");
    };
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
        <button onClick={() => handleWheelsUpClick()}>Wheels Up</button>
        <button onClick={() => handleWheelsDownClick()}>Wheels Down</button>
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
        <table className="flight-status">
        <tr>
          <td> Engine Status: </td>
          <td>{!flight.engineStopTime ? "Running" : ""}</td>
        </tr>
        <tr>
          <td> Lighting Condition: </td>
          <td>{isDayFlight ? "Day" : "Night"}</td>
        </tr>
        <tr>
          <td> Flight Status: </td>
          <td>{isAirborne ? "In-Flight" : "Landed"}</td>
        </tr>
        </table>
      </section>
      <section className="button-container">
        <button onClick={() => handleStopClick(`/pilot/${usrId}/flight_log/${fltId}`)}>Engine Stop</button>
      </section>
    </>
  );
}