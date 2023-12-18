import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectId } from "../../auth/authSlice";
import { useGetFlightQueryById, useUpdateFlight } from "./flightLogSlice";
import { useCreateFlightTimes, useUpdateFlightTimes } from "./flightTimesSlice";

import "./Flight.less";

export default function Flight() {
  const navigate = useNavigate();
  const { fltId } = useParams();
  const usrId = useSelector(selectId);

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
  const isDay = sessionStorage.isDay === "true";
  const isNight = sessionStorage.isNight === "true";
  const [isDayFlight, setIsDayFlight] = useState(isDay);
  const [isNightFlight, setIsNightFlight] = useState(isNight);

  // Retrieves current flight data
  const {
    data: flight,
    error: flightError,
    isLoading: isFlightLoading,
    refetch,
  } = useGetFlightQueryById(fltId, { pollingInterval: 36000 });

  // Creates a new flightTime record
  const [
    newFlightTime,
    { isLoading: newFlightTimeLoading, error: newFlightTimeError },
  ] = useCreateFlightTimes();

  // Updates current flightTime record
  const [
    updateFlightTime,
    { isLoading: updateFlightTimeLoading, error: updateFlightTimeError },
  ] = useUpdateFlightTimes(currentFlightTimeId);

  const [
    updateFlight,
    { isLoading: updateFlightLoading, error: updateFlightError },
  ] = useUpdateFlight(fltId);
  useEffect(() => {
    if (flightError) {
      console.error("Error fetching flight data:", flightError);
    }
    if (newFlightTimeError) {
      console.error("Error creating new flight time:", newFlightTimeError);
    }
    if (updateFlightTimeError) {
      console.error(
        "Error updating current flight time:",
        updateFlightTimeError
      );
    }
  }, [flightError, newFlightTimeError, updateFlightTimeError]);

  // function for calculating hours and returning them to the state.
  const calculateTotalFlightHours = () => {
    let totalEngineHours = 0;
    let totalHours = 0;
    let totalDayHours = 0;
    let totalNightHours = 0;

    // Calculates Engine Hours
    if (flight.engineStartTime) {
      const engStart = new Date(flight.engineStartTime);
      const engStop = new Date();
      const engHours = (engStop - engStart) / (1000 * 60 * 60);
      totalEngineHours += engHours;
    }

    // Calculates total flight hours
    if (flight?.FlightTimes && flight.FlightTimes.length > 0) {
      flight.FlightTimes.forEach((time) => {
        const startTime = new Date(time.timeStart);
        const stopTime = time.timeStop ? new Date(time.timeStop) : new Date(); // Use current time if timeStop is not available
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
    setIsDayFlight(true);
    setIsNightFlight(false);

    if (isAirborne) {
      const dateTime = new Date();
      const flightTimeData = {
        timeStop: dateTime.toISOString(),
      };
      const newFlightTimeData = {
        timeStart: dateTime.toISOString(),
        timeStop: null,
        dayFlight: true,
        nightFlight: false,
        flight: {
          connect: {
            id: Number(fltId),
          },
        },
      };

      try {
        const updateFlightTimeResponse = await updateFlightTime({
          id: currentFlightTimeId,
          ...flightTimeData,
        }).unwrap();
        const newFlightTimeResponse = await newFlightTime(
          newFlightTimeData
        ).unwrap();
        setCurrentFlightTimeId(newFlightTimeResponse.id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleNightClick = async (event) => {
    setIsDayFlight(false);
    setIsNightFlight(true);
    if (isAirborne) {
      const dateTime = new Date();
      const flightTimeData = {
        timeStop: dateTime.toISOString(),
      };
      const newFlightTimeData = {
        timeStart: dateTime.toISOString(),
        timeStop: null,
        dayFlight: false,
        nightFlight: true,
        flight: {
          connect: {
            id: Number(fltId),
          },
        },
      };

      try {
        const updateFlightTimeResponse = await updateFlightTime({
          id: currentFlightTimeId,
          ...flightTimeData,
        }).unwrap();
        const newFlightTimeResponse = await newFlightTime(
          newFlightTimeData
        ).unwrap();
        setCurrentFlightTimeId(newFlightTimeResponse.id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Creates a new flightTime record with current time day/night values, and fltId
  const handleWheelsUpClick = async (event) => {
    const dateTime = new Date();
    const flightTimeData = {
      timeStart: dateTime.toISOString(),
      timeStop: null,
      dayFlight: isDayFlight,
      nightFlight: isNightFlight,
      flight: {
        connect: {
          id: Number(fltId),
        },
      },
    };
    try {
      const newFlightTimeResponse = await newFlightTime(
        flightTimeData
      ).unwrap();
      setCurrentFlightTimeId(newFlightTimeResponse.id);
      setIsAirborne(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWheelsDownClick = async (event) => {
    //TODO: patch current flightTime.timeStop with current time.
    if (isAirborne) {
      const dateTime = new Date();
      const flightTimeData = {
        timeStop: dateTime.toISOString(),
      };
      try {
        const updateFlightTimeResponse = await updateFlightTime({
          id: currentFlightTimeId,
          ...flightTimeData,
        }).unwrap();
        setIsAirborne(false);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("You are currently not airborne.");
    }
  };

  const handleEngineStopClick = async (event) => {
    const dateTime = new Date();
    const flightData = {
      engineStopTime: dateTime.toISOString(),
    };

    try {
      const updateFlightResponse = await updateFlight({
        id: fltId,
        ...flightData,
      });
    } catch (err) {
      console.error(err);
    }
    navigate(`/pilot/${usrId}/flight_log/${fltId}`);
  };
  return (
    <>
      <header>
        <img className="logo" src="/airplane.svg" alt="airplane logo" />
        <h1>Fly-By</h1>
        <h2>Flight: {flight && formatFlightDate(flight)}</h2>
      </header>
      <section className="button-container">
        <button onClick={() => handleDayClick()}>Day</button>
        <button onClick={() => handleNightClick()}>Night</button>
        <button onClick={() => handleWheelsUpClick()}>Wheels Up</button>
        <button onClick={() => handleWheelsDownClick()}>Wheels Down</button>
      </section>
      <section className="flight-data-container">
        <table className="flight-hours">
          <tbody>
            <tr>
              <td className="description">Engine Runtime: </td>
              <td>{totalFlightHours.totalEngineHours}hrs </td>
            </tr>
            <tr>
              <td className="description">Total Flight Time: </td>
              <td>{totalFlightHours.totalHours}hrs</td>
            </tr>
            <tr>
              <td className="description">Day Flight Hours: </td>
              <td>{totalFlightHours.day}hrs</td>
            </tr>
            <tr>
              <td className="description">Night Flight Hours:</td>
              <td>{totalFlightHours.night}hrs</td>
            </tr>
          </tbody>
        </table>
        <table className="flight-status">
          <tbody>
            <tr>
              <td className="description">Engine Status:</td>
              <td>{!flight?.engineStopTime ? "Running" : ""}</td>
            </tr>
            <tr>
              <td className="description">Lighting Condition:</td>
              <td>{isDayFlight ? "Day" : "Night"}</td>
            </tr>
            <tr>
              <td className="description">Flight Status:</td>
              <td>{isAirborne ? "In-Flight" : "Landed"}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="button-container">
        <button onClick={() => handleEngineStopClick()}>Engine Stop</button>
      </section>
    </>
  );
}
