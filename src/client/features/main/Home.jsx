import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Home.less";

export default function Home() {
  const navigate = useNavigate();
  const handleNavClick = (navLink) => {
    navigate(navLink);
  }

  return (
    <>
      <header>
        <img className="logo" src="/airplane.svg" alt="airplane logo" />
        <h1>Fly-By</h1>
        <h2>Home Page</h2>
      </header>
      <section className="homeButtons">
        <button onClick={() => handleNavClick("/new_log")}>New Flight</button>
        <button onClick={() => handleNavClick(`/flight_log`)}>Flight Log</button>
        <button onClick={() => handleNavClick("/aircraft")}>Aircraft</button>
      </section>
    </>
  );
}