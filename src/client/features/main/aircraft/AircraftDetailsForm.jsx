import React, { useState, useEffect } from "react";
import { useUpdateAircraft, useGetAircraftByIdQuery } from "./AircraftSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function AircraftNewForm() {
  const navigate = useNavigate();
  const { aircraftId } = useParams();

  const { data: aircraft, error: aircraftError, isLoading: isAircraftLoading } = useGetAircraftByIdQuery(aircraftId);
  const [updateAircraft, { isUpdateLoading, updateError }] = useUpdateAircraft();

  const isLoading = isAircraftLoading || isUpdateLoading;

  useEffect(() => {
    if (aircraftError) {
      console.error("Error fetching aircraft by Id:", aircraftError);
    }
  }, [aircraftError]);

  const [makeModel, setMakeModel] = useState(aircraft?.makeModel);
  const [tailNum, setTailNum] = useState(aircraft?.tailNum);
  const [singleEngine, setSingleEngine] = useState(aircraft?.singleEngine);
  const [hobbs, setHobbs] = useState(aircraft?.hobbs);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hobbsFloat = parseFloat(hobbs);

    try {
      const aircraftData = {
        "id": Number(aircraftId),
        makeModel,
        tailNum,
        singleEngine,
        "hobbs": hobbsFloat,
      };

      const result = await updateAircraft(aircraftData).unwrap();
      navigate(`/aircraft/${aircraftId}`);
    } catch (error) {
      console.error("Error creating aircraft:", error);
    }
  };

  if (isLoading || !aircraft) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header>
        <p>Image PlaceHolder</p>
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
