/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import "@testing-library/jest-dom/extend-expect"

describe('Login tests', () => {
  test('renders Login component', () => {
    render(<Login />)
  })

  test('renders Register component', () => {
    render(<Register />)
  })
})

describe('Home Page', () => {
  test('renders Home component', () => {
    render(<Home />)
  })
})

describe('Flight Log', () => {
  test('renders NewLog component', () => {
    render(<NewLog />)
  })

  test('renders Flight component', () => {
    render(<Flight />)
  })

  test('renders FlightLog component', () => {
    render(<FlightLog />)
  })

  test('renders FlightDetails component', () => {
    render(<FlightDetails />)
  })

  test('renders FlightUpdateForm component', () => {
    render(<FlightUpdateForm />)
  })
})

describe('Pilot', () => {
  test('renders PilotDetails component', () => {
    render(<PilotDetails />)
  })

  test('renders PilotUpdateForm component', () => {
    render(<PilotUpdateForm />)
  })
})

describe('Aircraft', () => {
  test('renders App component', () => {
    render(<Aircraft />)
  })

  test('renders NewAircraft component', () => {
    render(<NewAircraftForm />)
  })

  test('renders AircraftUpdateForm component', () => {
    render(<AircraftUpdateForm />)
  })
})


