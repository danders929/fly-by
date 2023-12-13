import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectId } from "../../auth/authSlice";
import "./NewLog.less"

export default function PilotDetailsForm() {
  const navigate = useNavigate();
  const id = useSelector(selectId);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/flight/${id}`);
  };

  return (
    <>
    <header>
      <p>Image PlaceHolder</p>
      <h1>Fly-By</h1>
      <h2>New Flight Log</h2>
    </header>
    <section>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>
            Solo
            <input type="checkbox" name="solo" />
          </label>
        </div>
        <div className="form-group">
          <label>
            PIC
            <input type="text" value="PIC" />
          </label>
        </div>
        <div className="form-group">
          <label>
            SIC
            <input type="text" value="SIC" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Tail Number
            <input type="text" value="Tail Number" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Departure
            <input type="text" maxLength="4" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Arrival
            <input type="text" maxLength="4" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Day
            <input type="checkbox" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Night
            <input type="checkbox" />
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