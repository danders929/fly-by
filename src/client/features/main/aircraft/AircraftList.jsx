import React from "react";
import react from "@vitejs/plugin-react-swc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AircraftList(){
  const navigate = useNavigate;
  const aircraftList = []; //Placeholder array for list of aircraft. TODO: This needs to be pulled from API.

  return (
    <>
      <header>
        <button>Home</button>
        <p>Image PlaceHolder</p>
        <button>Profile</button>
        <button>Logout</button>
        <h1>Fly-By</h1>
        <h2>Aircraft List</h2>
      </header>
      <ul>
        {/* TODO: For each aircraft in aircraftList */}
        <li>Placeholder list item for each aircraft</li>
      </ul>
    </>
  )
}