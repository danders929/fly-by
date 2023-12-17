import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePilot } from "../main/pilot/pilotSlice";

export default function NewProfile() {
  const navigate = useNavigate();
  const userId = sessionStorage.userId;

  const [createPilot, {isLoading: createPilotLoading, error: createPilotError}] = useCreatePilot();
  
  const isLoading = createPilotLoading;
  
  useEffect(() => {
    if (createPilotError) {
      console.error("Error creating pilot", createPilotError);
    }
  }, [createPilotError]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const pilotData = {
        firstName,
        lastName,
        "user": {
          "connect": {
            "id": Number(userId),
          }
        }
      }
      const result = await createPilot(pilotData).unwrap();
      navigate(`/pilot/${userId}`);
    } catch (error) {
      console.error("error creating pilot:", error)
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header>
      <img className="logo" src="/airplane.svg" alt="airplane logo" />
        <h1>Fly-By</h1>
        <h2>Sign Up Form</h2>
      </header>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label>
            Last Name
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <button>Create Profile</button>
        </form>
    </>
  )
}