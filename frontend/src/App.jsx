import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import CreateTrip from './pages/CreateTrip.jsx'
import JoinTrip from './pages/JoinTrip.jsx'


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create-trip" element={<CreateTrip />} />
      <Route path="/join-trip" element={<JoinTrip />} />
      <Route path="/join-trip/:id" element={<JoinTrip />} />
    </Routes>
    </>
  )
}

export default App