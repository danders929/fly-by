import React from "react";
import ReactDOM from "react-dom/client";

import "./index.less";

import { Provider } from "react-redux";
import store from "./store";
import Root from "./layout/Root.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthForm from "./features/auth/AuthForm.jsx";
import PilotDetails from "./features/main/pilot/PilotDetails.jsx";
import PilotDetailsForm from "./features/main/pilot/PilotDetailsForm.jsx";
import Home from "./features/main/Home.jsx"
import NewLog from "./features/main/pilot/NewLog.jsx";
import Flight from "./features/main/pilot/Flight.jsx";
import FlightLog from "./features/main/pilot/FlightLog.jsx";
import FlightDetails from "./features/main/pilot/FlightDetails.jsx";
import FlightDetailsForm from "./features/main/pilot/FlightDetailsForm.jsx";
import AircraftList from "./features/main/aircraft/AircraftList.jsx";
import AircraftDetails from "./features/main/aircraft/AircraftDetails.jsx";
import AircraftNewForm from "./features/main/aircraft/AircraftNewForm.jsx";
import AircraftDetailsForm from "./features/main/aircraft/AircraftDetailsForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <AuthForm /> },
      { path: "/authForm", element: <AuthForm /> },
      { path: "/pilot/:usrId", element: <PilotDetails />},
      { path: "/pilot/:usrId/update", element: <PilotDetailsForm />},
      { path: "/home", element: <Home />},
      { path: "/new_log", element: <NewLog />},
      { path: "/flight/:fltId", element: <Flight />},
      { path: "/flight_log", element: <FlightLog />},
      { path: "/pilot/:usrId/flight_log/:fltId", element: <FlightDetails />},
      { path: "/pilot/:usrId/flight_log/:fltId/update", element: <FlightDetailsForm />},
      { path: "/aircraft", element: <AircraftList />},
      { path: "/aircraft/:aircraftId", element: <AircraftDetails />},
      { path: "/aircraft/new_form", element: <AircraftNewForm />},
      { path: "/aircraft/:id/update", element: <AircraftDetailsForm />}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
