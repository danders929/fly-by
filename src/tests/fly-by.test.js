/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, BrowserRouter } from 'react-router-dom'
import "@testing-library/jest-dom"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '../client/features/auth/Login.jsx';
import Register from '../client/features/auth/Register.jsx';
import Home from '../client/features/main/Home.jsx';
import NewLog from '../client/features/main/pilot/NewLog.jsx';
import Flight from '../client/features/main/pilot/Flight.jsx';
import FlightLog from '../client/features/main/pilot/FlightLog.jsx';
import FlightDetails from '../client/features/main/pilot/FlightDetails.jsx';
import FlightDetailsForm from '../client/features/main/pilot/FlightDetailsForm.jsx';
import PilotDetails from '../client/features/main/pilot/PilotDetails.jsx';
import PilotDetailsForm from '../client/features/main/pilot/PilotDetailsForm.jsx';
import AircraftList from '../client/features/main/aircraft/AircraftList.jsx';
import AircraftDetails from '../client/features/main/aircraft/AircraftDetails.jsx';
import AircraftNewForm from '../client/features/main/aircraft/AircraftNewForm.jsx';
import AircraftDetailsForm from '../client/features/main/aircraft/AircraftDetailsForm.jsx';



describe('Authorization tests', () => {
  test('renders Login component', () => {
    render(<Login />)
  })

  // Test that navigating to http://<url>/ navigates to /login
  // Test that clicking SIGN IN button logs user in and navigates to /pilot/:id/home

  test('renders Register component', () => {
    render(<Register />)
  })

  // Test that clicking SIGN UP navigates user to /register
  // Test that only email addresses are allowed 
  // Test if password fields are not matched that a message pops up stating "Passwords must match"
  // Test that when form is submitted user is routed to /pilot/:id/home
})

describe('Home Page', () => {
  test('renders Home component', () => {
    render(<Home />)
  })
  
  // Test that profile nav link exists
  // Test that profile link routes user to /pilot/:id
  // Test that New Flight button exists
  // Test that New Flight navigates user to /pilot/:id/new_log
  // Test that Flight Log button exists
  // Test that Flight Log button navigates user to /pilot/:id/flight_log
  // Test that Add Aircraft Button exists
  // Test that Add Aircraft Button navigates user to /aircraft/new_form
  // Test that Aircraft Button exists
  // Test that Aircraft button navigates user to /aircraft
  // Test that logout link exists
  // Test that logout logs user out and navigates to /login
})

describe('Flight Log', () => {
  test('renders NewLog component', () => {
    render(<NewLog />)
  })
  // Test that Home button exists
  // Test that Home navigates user to pilot/:id/home
  // Test that profile nav link exists
  // Test that profile link routes user to /pilot/:id
  // Test that SIC is greyed out when solo is checked
  // Test that Departure and Arrival string returns a prompt that states "Airport Code cannot be more than 4 characters long"
  // Test that Engine Start button exists
  // Test that Engine Start submits data to database, and navigates to /pilot/:id/flight/:flt_id
  // Test that logout link exists
  // Test that logout logs user out and navigates to /login

  test('renders Flight component', () => {
    render(<Flight/>)
    // Test that Home button exists
    // Test that Home navigates user to pilot/:id/home
    // Test that profile nav link exists
    // Test that profile link routes user to /pilot/:id
    // Test that day button exists
    // Test that night button exists
    // Test that day button starts logging day data
    // Test that night button starts logging night data

  })

  test('renders FlightLog component', () => {
    render(<FlightLog />)
  })

  test('renders FlightDetails component', () => {
    render(<FlightDetails />)
  })

  test('renders FlightUpdateForm component', () => {
    render(<FlightDetailsForm />)
  })
})

describe('Pilot', () => {
  test('renders PilotDetails component', () => {
    render(<PilotDetails />)
  })

  test('renders PilotUpdateForm component', () => {
    render(<PilotDetailsForm />)
  })
})

describe('Aircraft', () => {
  test('renders AircraftList component', () => {
    render(<AircraftList />)
  })

  test('renders AircraftDetails component', () => {
    render(<AircraftDetails />)
  })

  test('renders NewAircraft component', () => {
    render(<AircraftNewForm />)
  })

  test('renders AircraftUpdateForm component', () => {
    render(<AircraftDetailsForm />)
  })
})


