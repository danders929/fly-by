import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPilotListQuery, useGetPilotQuery } from "./pilotSlice";
import { useGetAircraftQuery } from "../aircraft/AircraftSlice";
import { useCreateFlight } from "./flightLogSlice";

import "./NewLog.less";

export default function newLogForm() {
  const navigate = useNavigate();
  const usrId = sessionStorage.getItem("userId");

  const {
    data: aircraft,
    error: aircraftError,
    isLoading: isAircraftLoading,
  } = useGetAircraftQuery();
  const {
    data: pilots,
    error: pilotsError,
    isLoading: isPilotsLoading,
  } = useGetPilotListQuery();
  const {
    data: pilotData,
    error: pilotDataError,
    isLoading: isPilotDataLoading,
  } = useGetPilotQuery(usrId);
  const [newFlight, { isLoading: newFlightLoading, error: newFlightError }] =
    useCreateFlight();

  const isLoading =
    isAircraftLoading ||
    isPilotsLoading ||
    isPilotDataLoading ||
    newFlightLoading;

  useEffect(() => {
    if (aircraftError) {
      console.error("Error fetching Aircraft List:", aircraftError);
    }
    if (pilotsError) {
      console.error("Error fetching Pilot List:", pilotsError);
    }
    if (pilotDataError) {
      console.error("Error fetching pilot data:", pilotDataError);
    }
    if (newFlightError) {
      console.error("Error creating new flight:", newFlightError);
    }
  }, [aircraftError, pilotsError, newFlightError]);

  // State for tracking input field variables.
  const pilotId = sessionStorage.getItem("pilotId");
  const [isSoloChecked, setIsSoloChecked] = useState(false);
  const [selectedPIC, setSelectedPIC] = useState(pilotId);
  const [selectedSIC, setSelectedSIC] = useState(1);
  const [selectedAircraft, setSelectedAircraft] = useState(1);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [isDay, setIsDay] = useState(true);
  const [isNight, setIsNight] = useState(false);

  const handleDayChange = (e) => {
    setIsDay(e.target.checked);
    // If "Night" is checked, uncheck it when "Day" is checked
    if (e.target.checked && isNight) {
      setIsNight(false);
    }
  };

  const handleNightChange = (e) => {
    setIsNight(e.target.checked);
    // If "Day" is checked, uncheck it when "Night" is checked
    if (e.target.checked && isDay) {
      setIsDay(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    sessionStorage.setItem("isDay", isDay);
    sessionStorage.setItem("isNight", isNight);
    const dateTime = new Date();
    const flightData = {
      solo: isSoloChecked,
      picId: Number(selectedPIC),
      sicId: isSoloChecked ? null : Number(selectedSIC),
      aircraftId: Number(selectedAircraft),
      date: dateTime.toISOString(),
      departure: departure,
      arrival: arrival,
      engineStartTime: dateTime.toISOString(),
      pilots: {
        connect: [
          { id: Number(selectedPIC) },
          ...(isSoloChecked ? [] : [{ id: Number(selectedSIC) }]),
        ],
      },
    };

    try {
      const response = await newFlight(flightData).unwrap();
      const newFlightId = response.id;
      navigate(`/flight/${newFlightId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header>
        <img className="logo" src="/airplane.svg" alt="airplane logo" />
        <h1>Fly-By</h1>
        <h2>New Flight Log</h2>
        <p>{isLoading ? "Loading..." : ""}</p>
      </header>
      <section>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>
              Solo:
              <input
                type="checkbox"
                checked={isSoloChecked}
                onChange={() => setIsSoloChecked(!isSoloChecked)}
                id="solo"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              PIC:
              <select
                value={selectedPIC}
                onChange={(e) => setSelectedPIC(e.target.value)}
                id="PIC"
              >
                <option value="" disabled>
                  Select PIC
                </option>
                {pilots &&
                  pilots.map((pilot) => (
                    <option key={pilot.id} value={pilot.id}>
                      {`${pilot.firstName} ${pilot.lastName}`}
                    </option>
                  ))}
                ;
              </select>
            </label>
          </div>
          {!isSoloChecked && (
            <div className="form-group">
              <label>
                SIC:
                <select
                  value={selectedSIC}
                  onChange={(e) => setSelectedSIC(e.target.value)}
                  id="SIC"
                >
                  <option value="" disabled>
                    Select SIC
                  </option>
                  {pilots &&
                    pilots.map((pilot) => (
                      <option key={pilot.id} value={pilot.id}>
                        {`${pilot.firstName} ${pilot.lastName}`}
                      </option>
                    ))}
                  ;
                </select>
              </label>
            </div>
          )}
          <div className="form-group">
            <label>
              Tail Number:
              <select
                value={selectedAircraft}
                onChange={(e) => setSelectedAircraft(e.target.value)}
              >
                <option value="" disabled>
                  Select Aircraft
                </option>
                {aircraft &&
                  aircraft.map((ac) => (
                    <option key={ac.id} value={ac.id} id="aircraft">
                      {`${ac.tailNum}`}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Departure:
              <input
                type="text"
                maxLength="4"
                onChange={(e) => setDeparture(e.target.value)}
                id="departure"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Arrival:
              <input
                type="text"
                maxLength="4"
                onChange={(e) => setArrival(e.target.value)}
                id="arrival"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Day:
              <input
                type="checkbox"
                checked={isDay}
                onChange={handleDayChange}
                id="day"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Night:
              <input
                type="checkbox"
                checked={isNight}
                onChange={handleNightChange}
                id="night"
              />
            </label>
          </div>
          <div className="button-container">
            <button type="submit">Engine Start</button>
          </div>
        </form>
      </section>
    </>
  );
}
