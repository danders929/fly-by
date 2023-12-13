import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectId } from "../../auth/authSlice";
import { useGetPilotQuery } from "./pilotSlice";

export default function PilotDetails(){
  const navigate = useNavigate();
  const usrId = useSelector(selectId);
  const { data: pilotData, error, isLoading } = useGetPilotQuery(usrId);

  useEffect(() => {
    if (error) {
      console.error("Error fetching pilot data:", error);
    }
  }, [error]);

  const handleNavClick = (navLink) => {
    navigate(navLink);
  }

  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
        <h2>Account Details</h2>
      </header>
      <section>
        <p>First Name: {pilotData ? `${pilotData.firstName}` : "Loading..."}</p>
        <p>Last Name: {pilotData ? `${pilotData.lastName}` : "Loading..."}</p>
        <p>Email Address: {pilotData ? `${pilotData.user.email}` : "Loading..."}</p>
      </section>
      <button onClick={() => handleNavClick(`/pilot/${usrId}/update`)}>Edit</button>
    </>
  )
}