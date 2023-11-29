import React from "react";
import ReactDOM from "react-dom/client";

import "./index.less";

import { Provider } from "react-redux";
import store from "./store";

import AuthForm from "./features/auth/AuthForm";
import Tasks from "./features/tasks/Tasks";
import Root from "./layout/Root.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./features/auth/Register.jsx";
import Login from "./features/auth/Login.jsx"
import PilotDetails from "./features/main/pilot/PilotDetails.jsx";
import PilotDetailsForm from "./features/main/pilot/PilotDetailsForm.jsx";
import Home from "./features/main/Home.jsx"
import NewLog from "./features/main/pilot/NewLog.jsx";
import Flight from "./features/main/pilot/Flight.jsx";
import FlightLog from "./features/main/pilot/FlightLog.jsx";
import FlightDetails from "./features/main/pilot/FlightDetails.jsx";
import FlightDetailsForm from "./features/main/pilot/FlightDetailsForm.jsx";
import AircraftDetails from "./features/main/aircraft/AircraftDetails.jsx";
import AircraftNewForm from "./features/main/aircraft/AircraftNewForm.jsx";
import AircraftDetailsForm from "./features/main/aircraft/AircraftDetailsForm.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/pilot/:id", element: <PilotDetails />},
      { path: "/pilot/:id/update", element: <PilotDetailsForm />},
      { path: "/pilot/:id/home", element: <Home />},
      { path: "/pilot/:id/new_log", element: <NewLog />},
      { path: "/pilot/:id/flight/:flt_id", element: <Flight />},
      { path: "/pilot/:id/flight_log", element: <FlightLog />},
      { path: "/pilot/:id/flight_log/:flt_id", element: <FlightDetails />},
      { path: "/pilot/:id/flight_log/:flt_id/update", element: <FlightDetailsForm />},
      { path: "/aircraft/:id", element: <AircraftDetails />},
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
