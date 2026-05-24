import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const JoinTrip = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [tripId, setTripId] = useState('')
  const [tripData, setTripData] = useState(null)

  useEffect(() => {

    const fetchTrip = async () => {
      try {

        const res = await fetch(
          `http://localhost:3000/api/trips/${id}`
        )

        const data = await res.json()

        setTripData(data.trip)

      } catch (error) {
        console.log(error)
      }
    }

    if (id) {
      fetchTrip()
    }

  }, [id])

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* Input Section */}
      {!id && (
        <div className="border rounded-2xl p-6 mb-8">

          <h1 className="text-3xl font-bold mb-4">
            Join a Trip
          </h1>

          <p className="mb-4">
            Enter the trip ID shared by your friend.
          </p>

          <input
            type="text"
            placeholder="Trip ID"
            value={tripId}
            onChange={(e) => setTripId(e.target.value)}
            className="border p-3 rounded-lg w-full mb-4"
          />

          <button
            className="border px-5 py-2 rounded-xl w-full"
            onClick={() => {
              if (tripId.trim()) {
                navigate(`/join-trip/${tripId}`)
              }
            }}
          >
            Join Trip
          </button>

        </div>
      )}

      {/* Trip Details */}
      {tripData && (
        <section className="border rounded-2xl p-6">

          <h2 className="text-2xl font-semibold mb-5">
            Trip Details
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Name:</strong> {tripData.name}
            </p>

            <p>
              <strong>Destination:</strong> {tripData.destination}
            </p>

            <p>
              <strong>Start Date:</strong>{' '}
              {new Date(tripData.startDate).toLocaleDateString()}
            </p>

            <p>
              <strong>End Date:</strong>{' '}
              {new Date(tripData.endDate).toLocaleDateString()}
            </p>

            <p>
              <strong>Total Members:</strong>{' '}
              {tripData.totalMembers || 1}
            </p>

          </div>

        </section>
      )}

    </div>
  )
}

export default JoinTrip