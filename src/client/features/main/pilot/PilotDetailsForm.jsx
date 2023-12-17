import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPilotQuery, useUpdatePilot } from "./pilotSlice";

export default function PilotDetailsForm(){
  const navigate = useNavigate();
  const { usrId } = useParams();
  const pilotId = sessionStorage.getItem("pilotId")

  const { data: pilotData, error, isLoading } = useGetPilotQuery(usrId);
  const [ updatePilot, { updatePilotError, updatePilotLoading}] = useUpdatePilot(pilotId);

  const [firstName, setFirstName] = useState(sessionStorage.getItem('firstName'));
  const [lastName, setLastName] = useState (sessionStorage.getItem('lastName'));

  useEffect(() => {
    if (error) {
      console.error("Error fetching pilot data:", error);
    }
    if (updatePilotError) {
      console.error("Error updating pilot info");
    }
  }, [error, updatePilotError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedPilotData = {
        "id": Number(pilotId),
        firstName,
        lastName,  
      };

      const result = await updatePilot(updatedPilotData);
      navigate(`/pilot/${usrId}`);
    } catch (error) {
      console.error("Error updating pilot data")
    }
  };

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
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}>
            </input>
          </label>
          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}>
            </input>
          </label>
          <button>Update</button>
        </form>
      </section>
    </>
  )
}