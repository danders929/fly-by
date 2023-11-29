import React from "react";
import react from "@vitejs/plugin-react-swc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const pilot = {
                firstName: null,
                lastName: null,
                email: null,
              }
export default function PilotDetails(){
  const navigate = useNavigate;
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
      <body>
        <section>
          <p>First Name: {pilot.firstName}</p>
          <p>Last Name {pilot.lastName}</p>
          <p>Email Address: {pilot.email}</p>
        </section>
        <button>Edit</button>
      </body>
    </>
  )
}