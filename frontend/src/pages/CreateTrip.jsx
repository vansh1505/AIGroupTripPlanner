import React, { useState } from 'react'

const CreateTrip = () => {
  const [tripData, setTripData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    totalMembers: ''
  });

  const [id, setId] = useState(null);
  const handleCreateTrip = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tripData)
      });

      const data = await res.json();
      if (res.ok) {
        setTripData({
          name: '',
          destination: '',
          startDate: '',
          endDate: '',
          totalMembers: ''
        });
        setId(data.id);
      } else {
        alert(`Error creating trip: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the trip.');
    }
  };

  const handleCopyId = async () => {
    if (!id) return;
    try {
      await navigator.clipboard.writeText(id.toString());
    } catch (error) {
      console.error('Error copying trip ID:', error);
    }
  };

  return (
    <>
      {id && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-4">
          <div className="w-full max-w-md rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-green-700 mb-2">🎉 Congratulations!</h2>
            <p className="text-gray-700 mb-4">Your trip was created successfully.</p>
            <div className=" text-green-900 p-3 rounded mb-4 break-all">
              Trip ID: <span className="font-semibold">{id}</span>
            </div>
            <div className="flex gap-3 justify-end">
              <button className="border px-4 py-2 rounded-lg" onClick={handleCopyId}>
                Copy ID
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setId(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Create a New Trip</h1>

      <section className="border rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Trip Details</h2>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Trip Name"
            className="border px-4 py-2 rounded-lg"
            value={tripData.name}
            onChange={(e) => setTripData({ ...tripData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Destination"
            className="border px-4 py-2 rounded-lg"
            value={tripData.destination}
            onChange={(e) => setTripData({ ...tripData, destination: e.target.value })}
          />
          <input
            type="date"
            placeholder="Start Date"
            className="border px-4 py-2 rounded-lg"
            value={tripData.startDate}
            onChange={(e) => setTripData({ ...tripData, startDate: e.target.value })}
          />
          <input
            type="date"
            placeholder="End Date"
            className="border px-4 py-2 rounded-lg"
            value={tripData.endDate}
            onChange={(e) => setTripData({ ...tripData, endDate: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total Members"
            className="border px-4 py-2 rounded-lg"
            value={tripData.totalMembers}
            onChange={(e) => setTripData({ ...tripData, totalMembers: e.target.value })}
          />

          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4" onClick={handleCreateTrip}>
            Create Trip
          </button>
        </div>
      </section>
    </>
  )
}

export default CreateTrip;
