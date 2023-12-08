import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectId } from "../../auth/authSlice"; //this needs to be changed to selectFlightId

export default function PilotDetailsForm(){
  const navigate = useNavigate();
  const id = useSelector(selectId) //this needs to be changed to selectFlightId

  const handleSubmit = () => {
    event.preventDefault();
    navigate(`/flight/${id}`);
  }

  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
        <h2>New Flight Log</h2>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <label>
            <input 
              type="checkbox"
              name="solo">
            </input>
            Solo
          </label>
          <label>
            PIC
            <input
              type="text" value="PIC">
            </input>
          </label>
          <label>
            SIC
            <input
              type="text" value="SIC">
            </input>
          </label>
          <label>
            Tail Number
            <input
              type="text" value="Tail Number">
            </input>
          </label>
          <label>
            Departure
            <input 
              type="text"
              maxLength="4">
            </input>
          </label>
          <label>
            Arrival
            <input 
              type="text"
              maxLength="4">
            </input>
          </label>
          <label>
            <input
              type="checkbox">
            </input>
            Day
          </label>
          <label>
            <input
              type="checkbox">
            </input>
            Night
          </label>
          <button type ="submit">Engine Start</button>
        </form>
      </section>
    </>
  )
}