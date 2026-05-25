import { useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

const purposes = [
  { label: 'Friends Trip', icon: 'diversity_3' },
  { label: 'Family Vacation', icon: 'luggage' },
  { label: 'Solo Travel', icon: 'person' },
  { label: 'Destination Wedding', icon: 'partner_exchange' },
  { label: 'Honeymoon', icon: 'beach_access' },
  { label: 'Business', icon: 'work' },
  { label: 'Devotional', icon: 'self_improvement' },
  { label: 'Other', icon: 'more' }
]

const DESTINATIONS = [
  { name: 'Agra, Uttar Pradesh', image: '/dest-paris.png' },
  { name: 'Delhi, India', image: '/dest-amalfi.png' },
  { name: 'Mumbai, Maharashtra', image: '/dest-amalfi.png' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const CreateTrip = () => {
  const [purpose, setpurpose] = useState('')
  const [id, setId] = useState(null);
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    creatorName: '',
    name: '',
    destination: '',
    purpose: '',
    startDate: '',
    endDate: '',
    totalMembers: '',
  })
  const shareUrl = id ? `${window.location.origin}/join-trip/${id}` : ''

  const handleCopyLink = async () => {
    if (!shareUrl) return

    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    setError('')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      }
    )

    if (!response.ok) {
      let errorMessage = 'Failed to create trip. Please check your inputs.'
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch (e) {}
      setError(errorMessage)
      toast.error(errorMessage)
      return
    }

    const data = await response.json();
    setId(data.id);

    setForm({
      creatorName: '',
      name: '',
      destination: '',
      purpose: '',
      startDate: '',
      endDate: '',
      totalMembers: '',
    });
    
  } catch (error) {
    console.error('Error creating trip:', error.message)
    setError('Failed to connect to the server. Please try again.')
  }
}

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-1/4 w-200 h-200 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-200 h-200 bg-secondary-container/10 rounded-full blur-[100px] translate-y-1/3 pointer-events-none z-0" />

      {/* Header */}
      <header className="w-full px-5 md:px-16 py-8 flex justify-between items-center z-50 relative">
        <Link
          to="/"
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-300 group no-underline"
        >
          <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          <span className="font-body text-sm font-semibold uppercase tracking-widest">Cancel</span>
        </Link>

        <Link to="/" className="no-underline">
          <img src="/logo2.png" alt="Planora Logo" className="w-40" />
        </Link>

        {/* Spacer for centering */}
        <div className="w-24" />
      </header>

      {/* Main Creation Canvas */}
      <main className="max-w-3xl mx-auto px-5 md:px-0 pt-8 pb-32 flex flex-col relative z-10">
        <div className="flex flex-col gap-16">
          {/* Page Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4 text-primary">
              <div className="h-px w-12 bg-primary" />
              <span className="font-body text-xs font-medium uppercase tracking-[0.15em]">
                Phase I
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-tight text-on-surface">
              Design your <br />
              <span className="text-primary italic font-light">escape.</span>
            </h1>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-16">
            {/* Creator Name Field */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <input
                id="creator-name"
                type="text"
                required
                value={form.creatorName}
                onChange={(e) => setForm({ ...form, creatorName: e.target.value })}
                placeholder="Creator Name"
                className="peer w-full bg-transparent border-0 border-b border-outline-variant font-display text-2xl md:text-3xl text-on-surface py-4 placeholder-transparent focus:outline-none focus:ring-0 focus:border-primary transition-all duration-500"
              />
              <label
                htmlFor="creator-name"
                className="absolute left-0 top-4 font-display text-2xl md:text-3xl text-on-surface-variant transition-all duration-500 pointer-events-none peer-focus:-top-8 peer-focus:text-sm peer-focus:font-body peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:font-body peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-on-surface-variant peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest"
              >
                Whose journey is this?
              </label>
              <div className="absolute bottom-0 left-0 w-full h-px bg-primary scale-x-0 peer-focus:scale-x-100 transition-transform duration-700 origin-left" />
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 peer-focus:opacity-100 transition-opacity duration-1000 -z-10 pointer-events-none" />
            </motion.div>

            {/* Trip Name Field */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <input
                id="trip-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Trip Name"
                className="peer w-full bg-transparent border-0 border-b border-outline-variant font-display text-2xl md:text-3xl text-on-surface py-4 placeholder-transparent focus:outline-none focus:ring-0 focus:border-primary transition-all duration-500"
              />
              <label
                htmlFor="trip-name"
                className="absolute left-0 top-4 font-display text-2xl md:text-3xl text-on-surface-variant transition-all duration-500 pointer-events-none peer-focus:-top-8 peer-focus:text-sm peer-focus:font-body peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:font-body peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-on-surface-variant peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest"
              >
                Give your escape a name
              </label>
              <div className="absolute bottom-0 left-0 w-full h-px bg-primary scale-x-0 peer-focus:scale-x-100 transition-transform duration-700 origin-left" />
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 peer-focus:opacity-100 transition-opacity duration-1000 -z-10 pointer-events-none" />
            </motion.div>

            {/* Destination Field */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <input
                id="destination"
                type="text"
                required
                value={form.destination}
                onChange={(e) => setForm({...form, destination: e.target.value})}
                placeholder="Leave blank to let AI recommend destinations based on your preferences"
                className="peer w-full bg-transparent border-0 border-b border-outline-variant font-display text-2xl md:text-3xl text-on-surface py-4 placeholder-transparent focus:outline-none focus:ring-0 focus:border-primary transition-all duration-500"
              />
              <label
                htmlFor="destination"
                className="absolute left-0 top-4 font-display text-2xl md:text-3xl text-on-surface-variant transition-all duration-500 pointer-events-none peer-focus:-top-8 peer-focus:text-sm peer-focus:font-body peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:font-body peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-on-surface-variant peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest"
              >
                Where to next? (Optional)
              </label>

              {/* Animated gold underline */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-primary scale-x-0 peer-focus:scale-x-100 transition-transform duration-700 origin-left" />

              {/* Ambient glow behind input */}
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 peer-focus:opacity-100 transition-opacity duration-1000 -z-10 pointer-events-none" />

              {/* Destination Gallery Previews */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-2 opacity-70 group-focus-within:opacity-100 transition-opacity duration-700">
                {DESTINATIONS.map(({ name, image }) => (
                  <div
                    key={name}
                    onClick={() => setForm({...form, destination: name.split(',')[0]})}
                    className={`relative h-40 rounded-xl overflow-hidden cursor-pointer glass-panel glass-highlight group/card ${
                      name === DESTINATIONS[0].name ? '' : 'hidden md:block'
                    }`}
                  >
                    <img
                      src={image}
                      alt={name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent opacity-90 group-hover/card:opacity-70 transition-opacity duration-500" />
                    <span className="absolute bottom-4 left-4 font-body text-sm font-semibold text-on-surface group-hover/card:text-primary transition-colors">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Dates Field */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-4"
            >
              <label className="block font-body text-sm font-semibold text-on-surface-variant uppercase tracking-[0.15em] mb-6">
                Dates
              </label>

              <div className="flex flex-col md:flex-row gap-8 w-full">
                <div className="relative group flex-1">
                  <input
                    id="start-date"
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    placeholder="Start Date"
                    className="peer w-full bg-transparent border-0 border-b border-outline-variant font-display text-xl md:text-2xl text-on-surface py-4 placeholder-transparent focus:outline-none focus:ring-0 focus:border-primary transition-all duration-500 [color-scheme:dark]"
                  />
                  <label
                    htmlFor="start-date"
                    className="absolute left-0 top-4 font-display text-xl md:text-2xl text-on-surface-variant transition-all duration-500 pointer-events-none peer-focus:-top-8 peer-focus:text-sm peer-focus:font-body peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:font-body peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-on-surface-variant peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest"
                  >
                    Start Date
                  </label>
                  <div className="absolute right-0 top-4 text-on-surface-variant peer-focus:text-primary transition-colors duration-500 pointer-events-none">
                    <span className="material-symbols-outlined text-2xl">calendar_today</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-primary scale-x-0 peer-focus:scale-x-100 transition-transform duration-700 origin-left" />
                </div>

                <div className="relative group flex-1">
                  <input
                    id="end-date"
                    type="date"
                    required
                    min={form.startDate || new Date().toISOString().split("T")[0]}
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    placeholder="End Date"
                    className="peer w-full bg-transparent border-0 border-b border-outline-variant font-display text-xl md:text-2xl text-on-surface py-4 placeholder-transparent focus:outline-none focus:ring-0 focus:border-primary transition-all duration-500 [color-scheme:dark]"
                  />
                  <label
                    htmlFor="end-date"
                    className="absolute left-0 top-4 font-display text-xl md:text-2xl text-on-surface-variant transition-all duration-500 pointer-events-none peer-focus:-top-8 peer-focus:text-sm peer-focus:font-body peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:font-body peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-on-surface-variant peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest"
                  >
                    End Date
                  </label>
                  <div className="absolute right-0 top-4 text-on-surface-variant peer-focus:text-primary transition-colors duration-500 pointer-events-none">
                    <span className="material-symbols-outlined text-2xl">calendar_today</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-primary scale-x-0 peer-focus:scale-x-100 transition-transform duration-700 origin-left" />
                </div>
              </div>
            </motion.div>

            {/* Trip Purpose Chips */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-4"
            >
              <label className="block font-body text-sm font-semibold text-on-surface-variant uppercase tracking-[0.15em] mb-6">
                The purpose
              </label>

              <div className="flex flex-wrap gap-4">
                {purposes.map(({ label, icon }) => {
                  const isActive = purpose === label
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        setpurpose(label)
                        setForm({ ...form, purpose: label })
                      }}
                      className={`px-6 py-4 rounded-full text-sm font-semibold tracking-wide flex items-center gap-3 transition-all duration-300 cursor-pointer border ${
                        isActive
                          ? 'border-primary bg-primary-container/10 text-primary shadow-[0_0_20px_rgba(212,175,55,0.15)] scale-[1.02]'
                          : 'border-outline-variant bg-surface-container text-on-surface hover:border-primary-container hover:bg-primary-container/10 group'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-xl transition-colors ${
                          isActive ? '' : 'group-hover:text-primary'
                        }`}
                        style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        {icon}
                      </span>
                      {label}
                    </button>
                  )
                })}
              </div>
            </motion.div>

            {/* Total Members Field */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <input
                id="total-members"
                type="number"
                min="1"
                required
                value={form.totalMembers}
                onChange={(e) => setForm({ ...form, totalMembers: e.target.value })}
                placeholder="Total Members"
                className="peer w-full bg-transparent border-0 border-b border-outline-variant font-display text-2xl md:text-3xl text-on-surface py-4 placeholder-transparent focus:outline-none focus:ring-0 focus:border-primary transition-all duration-500"
              />
              <label
                htmlFor="total-members"
                className="absolute left-0 top-4 font-display text-2xl md:text-3xl text-on-surface-variant transition-all duration-500 pointer-events-none peer-focus:-top-8 peer-focus:text-sm peer-focus:font-body peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:font-body peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-on-surface-variant peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest"
              >
                How many travelers?
              </label>
              <div className="absolute right-0 top-4 text-on-surface-variant peer-focus:text-primary transition-colors duration-500 pointer-events-none">
                <span className="material-symbols-outlined text-2xl">group</span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-primary scale-x-0 peer-focus:scale-x-100 transition-transform duration-700 origin-left" />
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 peer-focus:opacity-100 transition-opacity duration-1000 -z-10 pointer-events-none" />
            </motion.div>

            {/* Submit Area */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl font-body text-sm flex items-center gap-3 mt-8"
              >
                <span className="material-symbols-outlined text-[20px]">error</span>
                {error}
              </motion.div>
            )}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`${error ? 'mt-4' : 'mt-12'} flex flex-col sm:flex-row items-center sm:justify-end gap-6 border-t border-white/5 pt-12`}
            >
              <span className="text-on-surface-variant/60 text-base hidden sm:block">
                Press enter to continue
              </span>

              <button
                type="submit"
                className="w-full sm:w-auto gold-gradient text-on-primary-fixed px-10 py-5 rounded-full text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-3 border-none cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 group relative overflow-hidden"
              >
                {/* Shine sweep effect */}
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10">Manifest Journey</span>
                <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </motion.div>
          </form>
        </div>
      </main>

      {id && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-lg glass-panel glass-elevated rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center"
          >
            <button
              type="button"
              onClick={() => setId(null)}
              className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="flex flex-col items-center gap-6 mb-10">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(242,202,80,0.2)]">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  share
                </span>
              </div>

              <h2 className="font-display text-3xl md:text-[2.5rem] text-on-surface tracking-tight">
                Your Journey is <br />
                <span className="text-primary italic font-light">Manifesting</span>
              </h2>

              <p className="font-body text-on-surface-variant/80 max-w-70">
                Share this link with your inner circle to begin gathering their travel desires and plans for the trip.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block font-body text-sm font-semibold text-on-surface-variant uppercase tracking-widest text-center">
                Share with Friends
              </label>

              <div className="relative flex items-center">
                <input
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-full py-4 pl-6 pr-32 font-body text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
                  readOnly
                  type="text"
                  value={shareUrl}
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="absolute right-2 px-6 py-2 gold-gradient text-on-primary rounded-full font-body text-sm uppercase tracking-wider hover:opacity-95 transition-colors flex items-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                  <span>Copy</span>
                </button>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5">
              <Link
                to={`/join-trip/${id}`}
                className="w-full inline-flex items-center justify-center py-4 rounded-full border border-outline-variant text-on-surface-variant font-body text-sm uppercase tracking-widest hover:bg-white/5 hover:text-on-surface transition-all duration-300 no-underline"
              >
                Go to Planning Workspace
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default CreateTrip;