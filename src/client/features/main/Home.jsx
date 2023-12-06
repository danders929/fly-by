import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectId } from "../auth/authSlice";

export default function Home() {
  const navigate = useNavigate();
  const id = useSelector(selectId)
  const handleNavClick = (navLink) => {
    navigate(navLink);
  }

  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
        <h2>Home Page</h2>
      </header>
      <section>
        <button onClick={() => handleNavClick("/new_log")}>New Flight</button>
        <button onClick={() => handleNavClick(`/pilot/${id}/flight_log`)}>Flight Log</button>
        <button onClick={() => handleNavClick("/aircraft")}>Aircraft</button>
      </section>
    </>
  );
}