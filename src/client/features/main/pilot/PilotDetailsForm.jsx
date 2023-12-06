import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectId } from "../../auth/authSlice";

export default function PilotDetailsForm(){
  const navigate = useNavigate();
  const id = useSelector(selectId)

  const handleSubmit = () => {
    event.preventDefault();
    navigate(`/pilot/${id}`);
  }

  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
        <h1>Fly-By</h1>
        <h2>Account Details</h2>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <label>
            First Name
            <input
              type="text">
            </input>
          </label>
          <label>
            Last Name
            <input
              type="text">
            </input>
          </label>   
          <label>
            E-mail
            <input
              type="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            >
            </input>
          </label>
          <label>
            Password:
            <input
              type="password">
            </input>
          </label>
          <label>
            Re-Type Password:
            <input
              type="password">
            </input>
          </label>
          <button type ="submit">Update</button>
        </form>
      </section>
    </>
  )
}