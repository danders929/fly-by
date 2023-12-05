import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectId } from "../../auth/authSlice";

const pilot = {
                firstName: null,
                lastName: null,
                email: null,
              }
export default function PilotDetails(){
  const navigate = useNavigate();
  const id = useSelector(selectId)
  const handleNavClick = (navLink) => {
    navigate(navLink);
  }
  return (
    <>
      <header>
        <button>Home</button>
        <p>Image PlaceHolder</p>
        <button>Profile</button>
        <button>Logout</button>
        <h1>Fly-By</h1>
        <h2>Account Details</h2>
      </header>
      <section>
        <p>First Name: {pilot.firstName}</p>
        <p>Last Name {pilot.lastName}</p>
        <p>Email Address: {pilot.email}</p>
      </section>
      <button onClick={() => handleNavClick(`/pilot/${id}/update`)}>Edit</button>
    </>
  )
}