import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="min-h-screen p-6">

      {/* Navbar */}
      <nav className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold">Group Trip Planner</h1>

        <div className="flex gap-3">
          <button className="border px-4 py-2 rounded-lg">
            Login
          </button>

          <button className="border px-4 py-2 rounded-lg">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <h2 className="text-5xl font-bold max-w-3xl mx-auto leading-tight">
          Plan Trips With Friends Without The Usual Chaos
        </h2>

        <p className="mt-6 text-lg max-w-2xl mx-auto">
          Create trips, invite friends, manage expenses, track plans,
          and pretend your group can actually decide anything in under
          three business days.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/create-trip">
            <button className="border px-6 py-3 rounded-xl text-lg cursor-pointer">
              Create Trip
            </button>
          </Link>

          <button className="border px-6 py-3 rounded-xl text-lg">
            Explore Trips
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 py-10">

        <div className="border rounded-2xl p-6">
          <h3 className="text-2xl font-semibold mb-3">
            Trip Management
          </h3>

          <p>
            Organize destinations, dates, members, and schedules
            without using twenty-seven different WhatsApp messages.
          </p>
        </div>

        <div className="border rounded-2xl p-6">
          <h3 className="text-2xl font-semibold mb-3">
            Expense Tracking
          </h3>

          <p>
            Split expenses fairly so nobody suddenly develops
            selective memory after the trip ends.
          </p>
        </div>

        <div className="border rounded-2xl p-6">
          <h3 className="text-2xl font-semibold mb-3">
            Collaboration
          </h3>

          <p>
            Invite friends, vote on plans, and keep everyone
            updated in one place.
          </p>
        </div>
      </section>

      {/* Trips Preview */}
      <section className="py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">
            Upcoming Trips
          </h2>

          <button className="border px-4 py-2 rounded-lg">
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="border rounded-2xl p-5">
            <h3 className="text-xl font-semibold">Goa Trip</h3>

            <p className="mt-2">
              22 May 2026 - 25 May 2026
            </p>

            <p className="mt-4">
              Members: 6
            </p>
          </div>

          <div className="border rounded-2xl p-5">
            <h3 className="text-xl font-semibold">Manali Escape</h3>

            <p className="mt-2">
              10 June 2026 - 15 June 2026
            </p>

            <p className="mt-4">
              Members: 4
            </p>
          </div>

          <div className="border rounded-2xl p-5">
            <h3 className="text-xl font-semibold">Jaipur Weekend</h3>

            <p className="mt-2">
              3 July 2026 - 6 July 2026
            </p>

            <p className="mt-4">
              Members: 5
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16 pt-6 text-center">
        <p>
          Group Trip Planner © 2026
        </p>
      </footer>

    </div>
  )
}

export default LandingPage
