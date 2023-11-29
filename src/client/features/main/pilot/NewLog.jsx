import React from "react";
import react from "@vitejs/plugin-react-swc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewLog(){
  const navigate = useNavigate;
  return (
    <>
      <header>
        <button>Home</button>
        <p>Image PlaceHolder</p>
        <button>Profile</button>
        <button>Logout</button>
        <h1>Fly-By</h1>
        <h2>New Flight Log</h2>
      </header>
      <body>
        <form>
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
          <button>Engine Start</button>
        </form>
      </body>
    </>
  )
}