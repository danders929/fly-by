import React, { useState } from "react";
import { useCreateAircraft } from "./AircraftSlice";
import { useNavigate } from "react-router-dom";

export default function AircraftNewForm() {
  const navigate = useNavigate();
  const [makeModel, setMakeModel] = useState("");
  const [tailNum, setTailNum] = useState("");
  const [singleEngine, setSingleEngine] = useState(false);
  const [hobbs, setHobbs] = useState(0);

  const [createAircraft, { isLoading, error }] = useCreateAircraft();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hobbsFloat = parseFloat(hobbs);

    try {
      const newAircraftData = {
        makeModel,
        tailNum,
        singleEngine,
        "hobbs": hobbsFloat,
      };

      const result = await createAircraft(newAircraftData).unwrap();
      setMakeModel("");
      setTailNum("");
      setSingleEngine(false);
      setHobbs(0);

      navigate(`/aircraft/${result.id}`);
    } catch (error) {
      console.error("Error creating aircraft:", error);
    }
  };

  return (
    <>
      <header>
        <img className="logo" src="/airplane.svg" alt="airplane logo" />
        <h1>Fly-By</h1>
        <h2>New Aircraft Form</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          Tail Number: <input type="text" value={tailNum} onChange={(e) => setTailNum(e.target.value)} />
        </label>
        <label>
          Make/Model: <input type="text" value={makeModel} onChange={(e) => setMakeModel(e.target.value)} />
        </label>
        <label>
          Single Engine: <input type="checkbox" checked={singleEngine} onChange={() => setSingleEngine(!singleEngine)} />
        </label>
        <label>
          Hobbs Meter: <input type="number" value={hobbs} onChange={(e) => setHobbs(e.target.value)} />
        </label>
        <button type="submit">Add</button>
      </form>
    </>
  );
}
