import React, { useState, useEffect }from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFlightQueryById, useUpdateFlight } from "./flightLogSlice";
import { useGetPilotListQuery } from "./pilotSlice";
import { useGetAircraftQuery } from "../aircraft/AircraftSlice";

export default function FlightDetailsForm() {
  const navigate = useNavigate();
  const { usrId, fltId } = useParams();

  const { data: pilots, error: pilotsError, isLoading: isPilotsLoading } = useGetPilotListQuery();
  const { data: flight, flightError, isFlightLoading } = useGetFlightQueryById(fltId);
  const { data: aircraft, error: aircraftError, isLoading: isAircraftLoading } = useGetAircraftQuery();
  const [updateFlight, {isLoading: updateFlightLoading, error: updateFlightError}] = useUpdateFlight(fltId);
  
  const isLoading = isPilotsLoading || isFlightLoading || isAircraftLoading || updateFlightLoading;

  useEffect(() => {
    if (pilotsError) {
      console.error("Error fetching Pilot List:", pilotsError);
    }
    if (flightError) {
      console.error("Error fetching flight data:", flightError)
    }
    if (aircraftError) {
      console.error("Error loading aircraft data:", aircraftError)
    }
    if (updateFlightError){
      console.error("Error updating flight data")
    }
  }, [ pilotsError, flightError, aircraftError, updateFlightError]);

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

  // State for tracking input field variables.
  const [isSoloChecked, setIsSoloChecked] = useState(flight?.solo);
  const [selectedPIC, setSelectedPIC] = useState(flight?.picId);
  const [selectedSIC, setSelectedSIC] = useState(flight?.sicId);
  const [selectedAircraft, setSelectedAircraft] = useState(flight?.aircraftId);
  const [departure, setDeparture] = useState(flight?.departure);
  const [arrival, setArrival] = useState(flight?.arrival);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/pilot/${usrId}/flight_log/${fltId}`);
  };

  // Check pilots, flight, and aircraft are loading or undefined
  if (isLoading || !pilots || !flight || !aircraft) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
        <h2>Flight: {flight && formatFlightDate(flight)}</h2>
      </header>
      <section>
        <h3>Flight Details</h3>
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
            <select value={selectedPIC} onChange={(e) => setSelectedPIC(e.target.value)} id="PIC">
              <option value="" disabled>Select PIC</option>
                {pilots && pilots.map((pilot) => (
                  <option key={pilot.id} value={pilot.id}>
                    {`${pilot.firstName} ${pilot.lastName}`}
                  </option>
                  )
                )};
            </select>
          </label>
        </div>
          <div className="form-group">
            <label>
              SIC: 
              <select value={selectedSIC} onChange={(e) => setSelectedSIC(e.target.value)} id="SIC">
                <option value="" disabled>Select SIC</option>
                  {pilots && pilots.map((pilot) => (
                    <option key={pilot.id} value={pilot.id}>
                      {`${pilot.firstName} ${pilot.lastName}`}
                    </option>
                  ))}
              </select>
            </label>
          </div>
        <div className="form-group">
          <label>
            Tail Number: 
            <select value={selectedAircraft} onChange={(e) => setSelectedAircraft(e.target.value)}>
              <option value="" disabled>Select Aircraft</option>
                {aircraft && aircraft.map((ac) => (
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
              value={departure}
              maxLength="4"
              onChange ={(e) => setDeparture(e.target.value)}
              id="departure" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Arrival: 
            <input 
              type="text"
              value={arrival}
              maxLength="4" 
              onChange ={(e) => setArrival(e.target.value)}
              id="arrival" />
          </label>
        </div>
        <button type="submit">Update</button>
        </form>
      </section>
    </>
  );
}
