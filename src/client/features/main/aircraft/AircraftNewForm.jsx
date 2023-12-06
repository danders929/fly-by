import React from "react";
import { useNavigate } from "react-router-dom";

export default function AircraftNewForm(){
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/aircraft`); 
  };

  return (
    <>
      <header>
        <button>Home</button>
        <p>Image PlaceHolder</p>
        <button>Profile</button>
        <button>Logout</button>
        <h1>Fly-By</h1>
        <h2>New Aircraft Form</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <label>Tail Number: <input type="text" /></label>
        <label>Make/Model: <input type="text" /></label>
        <label>Single Engine: <input type="checkbox" /></label>
        <label>Hobbs Meter: <input type="number" /></label>
        <button type="submit">Add</button>
      </form>
    </>
  )
}