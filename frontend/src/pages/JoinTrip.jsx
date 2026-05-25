import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReactMarkdown from 'react-markdown';

const phaseNames = ['The Vibe', 'Rhythm & Style', 'Logistics', 'Curations']

const formatTripDate = (date) => {
  if (!date) return 'TBD'

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) return 'TBD'

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const getTripStatusLabel = (status) => {
  if (!status) return 'Planning'

  return status.charAt(0).toUpperCase() + status.slice(1)
}

// Helper components for UI consistency
const Chip = ({ children, active, onClick, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 md:px-5 md:py-3 rounded-xl font-body text-sm flex items-center justify-center gap-1 transition-all duration-300 border ${active
      ? 'bg-primary/10 text-primary border-primary shadow-[0_0_15px_rgba(212,175,55,0.15)]'
      : 'bg-surface-container text-on-surface border-white/10 hover:border-white/30 hover:bg-white/5'
      } ${className}`}
  >
    {children}
    {active && <span className="material-symbols-outlined text-[14px]">check</span>}
  </button>
)

const ImageCard = ({ src, label, active, onClick, icon }) => (
  <div
    onClick={onClick}
    className={`relative h-32 rounded-xl overflow-hidden cursor-pointer transition-all duration-400 border bg-surface-container group ${active
      ? 'border-primary shadow-[0_0_20px_rgba(212,175,55,0.2)]'
      : 'border-white/10'
      }`}
  >
    <img
      src={src}
      alt={label}
      className={`w-full h-full object-cover transition-transform duration-800 ${active ? 'opacity-100 scale-100' : 'opacity-70 group-hover:scale-105 group-hover:opacity-90'
        }`}
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex items-end p-4">
      <span className="font-body text-sm text-white font-medium flex items-center gap-2">
        {icon && (
          <span className="material-symbols-outlined text-[16px] text-primary">
            {icon}
          </span>
        )}
        {label}
      </span>
    </div>
  </div>
)

const JoinTrip = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const totalSteps = 4

  const [tripData, setTripData] = useState({
    creatorName: '',
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    totalMembers: 1,
    purpose: '',
    responses: [],
    status: '',
    aiRecommendation: null,
  })

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/trips/${id}`)
        const data = await res.json();
        setTripData({
          ...data.trip,
        });
      } catch (error) {
        console.error('Error fetching trip details:', error)
      }
    }

    fetchTripDetails()
  }, [id])


  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trips/${id}/respond`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit response');
      }

      console.log(data);
      setSubmitted(true);
      
    } catch (error) {
      console.error(error);
    }
  };


  const handleAISummary = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to generate AI summary');
      }

      setTripData((prev) => ({
        ...prev,
        aiRecommendation: data.aiRecommendation,
      }));
    } catch (error) {
      console.error('Error generating AI summary:', error);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    budget: 3500,
    budgetFlex: 'Moderate',
    destTypes: ['Mountains', 'City', 'Nature'],
    ageGroup: '26-35',
    travelStyle: 'Luxury',
    tripPace: 'Balanced',
    transport: ['Flight', 'Train'],
    stayPref: ['Hotel'],
    foodPref: 'Any',
    activities: ["Nightlife", "Trekking", "Shopping", "Camping", "Photography", "Relaxation", "Food Exploration"],
  })

  const toggleArrayItem = (field, item) => {
    setFormData((prev) => {
      const currentValues = prev[field]

      return {
        ...prev,
        [field]: currentValues.includes(item)
          ? currentValues.filter((value) => value !== item)
          : [...currentValues, item],
      }
    })
  }

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, totalSteps))
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1))



  if (!id) {
    return <div>Invalid trip ID</div>
  }

  if (tripData.name === '') {
    return <div>Loading trip details...</div>
  }

  if (tripData.status === 'completed') {
    return (
      <div className="text-on-surface font-body antialiased overflow-x-hidden min-h-screen flex flex-col relative">
        <Navbar activePath="my-trips" />
        <main className="grow pt-25 pb-24 px-5 md:px-16 max-w-7xl mx-auto w-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-[32px] md:text-[40px] mb-4 text-white font-semibold md:font-bold tracking-tight">
              Trip Planning Completed
            </h1>
            <p className="font-body text-lg text-on-surface-variant mb-6">
              The trip details have been finalized based on everyone's preferences. Check your itinerary for the final plan!
            </p>
            
            {tripData.aiRecommendation ? (
              <ReactMarkdown>
                {tripData.aiRecommendation}
              </ReactMarkdown>
            ) : (
              <button className="px-6 py-3 bg-primary text-black rounded-lg font-medium" onClick={handleAISummary}>Generate AI Itinerary</button>
            )}
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="text-on-surface font-body antialiased overflow-x-hidden min-h-screen flex flex-col relative">
      {/* Ambient Glow */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_70%)] -z-10 pointer-events-none" />

      <Navbar activePath="my-trips" />

      {/* Main Content Canvas */}
      <main className="grow pt-25 pb-24 px-5 md:px-16 max-w-7xl mx-auto w-full">
        {/* Workspace Header */}
        <div className="mb-12">
          <h1 className="font-display text-[32px] md:text-[40px] mb-2 text-white font-semibold md:font-bold tracking-tight">
            {tripData.name || 'Loading trip...'}
          </h1>
          <p className="font-body text-lg text-on-surface-variant">
            Planning Workspace • {formatTripDate(tripData.startDate)} - {formatTripDate(tripData.endDate)}
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Trip Overview */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Overview Card */}
            <div className="glass-panel rounded-xl p-6 transition-all hover:shadow-[inset_0_0_20px_rgba(212,175,55,0.03),0_4px_30px_rgba(0,0,0,0.2)] hover:border-primary/20">
              <div className="w-full h-32 rounded-lg mb-6 overflow-hidden relative border border-white/5">
                <img
                  alt="Kyoto Template"
                  className="w-full h-full object-cover opacity-80"
                  src="/kyoto-temple.png"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-primary text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                  <span className="font-body text-xs text-white tracking-wide font-medium">
                    {tripData.destination || 'Destination TBD'}
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body text-xs text-on-surface-variant">
                    Status
                  </span>
                  <span className="font-body text-[11px] font-semibold tracking-wider uppercase text-primary bg-primary/10 px-2.5 py-1 rounded-sm border border-primary/20">
                    {getTripStatusLabel(tripData.status)}
                  </span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-1 mt-3 overflow-hidden">
                  <div className="bg-primary h-1 rounded-full w-[45%] relative shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                    <div className="absolute top-0 right-0 w-2 h-full bg-white/50 blur-[1px]" />
                  </div>
                </div>
                <div className="text-right mt-1.5 font-body text-[10px] text-on-surface-variant tracking-wider font-semibold">
                  {tripData.responses?.length || 0}/{tripData.totalMembers || 0} TRAVELERS READY
                </div>
              </div>
              <div className="mb-6 border-t border-white/5 pt-5">
                <span className="font-body text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant block mb-3">
                  Travelers ({tripData.totalMembers || 0})
                </span>
                <div className="flex -space-x-3">
                  <div className="w-9 h-9 rounded-full border-2 border-background bg-surface-container-highest flex items-center justify-center font-body text-xs text-on-surface-variant font-medium">
                    {tripData.creatorName ? tripData.creatorName.charAt(0).toUpperCase() : 'T'}
                  </div>
                  {tripData.responses?.slice(0, 2).map((resp, idx) => (
                    <div key={idx} className="w-9 h-9 rounded-full border-2 border-background bg-surface-container-highest flex items-center justify-center font-body text-xs text-on-surface-variant font-medium">
                      {resp.name ? resp.name.charAt(0).toUpperCase() : 'R'}
                    </div>
                  ))}
                  <div className="w-9 h-9 rounded-full border-2 border-background bg-surface-container-highest flex items-center justify-center font-body text-xs text-on-surface-variant font-medium">
                    +{Math.max((tripData.totalMembers || 0) - 2, 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Sidebar */}
            <div className="glass-panel rounded-xl p-6 border border-white/5 mt-6">
              <h3 className="font-body text-xs mb-4 text-on-surface-variant uppercase tracking-widest font-semibold">
                Journey Progress
              </h3>
              <div className="space-y-4 relative before:absolute before:inset-y-2 before:left-3 before:w-0.5 before:bg-white/10">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center gap-4 relative z-10">
                    {step < currentStep ? (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                        <span className="material-symbols-outlined text-[14px] text-black font-bold">
                          check
                        </span>
                      </div>
                    ) : step === currentStep ? (
                      <div className="w-6 h-6 rounded-full border-2 border-primary bg-surface flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-white/20 bg-surface flex items-center justify-center" />
                    )}
                    <span
                      className={`font-body text-sm ${step <= currentStep
                        ? 'text-white font-medium'
                        : 'text-on-surface-variant'
                        }`}
                    >
                      {phaseNames[step - 1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column: Interactive Journey */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="glass-panel rounded-xl p-8 border border-white/10 relative overflow-hidden grow flex flex-col">
              {/* Header & Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-body text-xs text-primary tracking-widest uppercase font-semibold">
                    Phase {currentStep === 1 ? 'I' : currentStep === 2 ? 'II' : currentStep === 3 ? 'III' : 'IV'}
                  </span>
                  <span className="font-body text-xs text-on-surface-variant">
                    Step {currentStep} of {totalSteps}
                  </span>
                </div>
                <div className="h-0.75 bg-surface-container-high w-full rounded-full overflow-hidden mb-6">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Form Steps */}
              <div className="grow relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    {currentStep === 1 && (
                      <div>
                        <h2 className="font-display text-[24px] mb-2 text-white font-medium">
                          The Vibe
                        </h2>
                        <p className="font-body text-sm text-on-surface-variant mb-8">
                          Set the foundation for your journey.
                        </p>
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <label className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold block">
                              Your Name
                            </label>
                            <input
                              className="w-full bg-white/5 border border-white/10 text-on-surface px-4 py-3 rounded-lg font-body text-sm transition-all duration-300 focus:border-primary focus:shadow-[0_0_10px_rgba(212,175,55,0.1)] outline-none"
                              type="text"
                              placeholder="Enter your name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <label className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                                Budget (Per Person)
                              </label>
                              <span className="font-body text-sm text-primary font-medium">
                                ${formData.budget.toLocaleString()}
                              </span>
                            </div>
                            <input
                              className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer"
                              max="10000"
                              min="1000"
                              step="100"
                              type="range"
                              value={formData.budget}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  budget: Number(e.target.value),
                                })
                              }
                              style={{
                                backgroundImage: `linear-gradient(#D4AF37, #D4AF37)`,
                                backgroundSize: `${((formData.budget - 1000) * 100) / 9000
                                  }% 100%`,
                                backgroundRepeat: 'no-repeat',
                              }}
                            />
                          </div>
                          <div className="space-y-4">
                            <label className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold block">
                              Budget Flexibility
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                              {['Strict', 'Moderate', 'Flexible'].map((opt) => (
                                <Chip
                                  key={opt}
                                  active={formData.budgetFlex === opt}
                                  onClick={() => setFormData({ ...formData, budgetFlex: opt })}
                                >
                                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                </Chip>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <label className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold block">
                              Destination Type
                            </label>
                            <div className="flex flex-wrap gap-3">
                              {[
                                'Beach',
                                'Mountains',
                                'City',
                                'Adventure',
                                'Nature',
                                'Snow',
                              ].map((opt) => {
                                const id = opt
                                return (
                                  <Chip
                                    key={id}
                                    active={formData.destTypes.includes(id)}
                                    onClick={() =>
                                      toggleArrayItem('destTypes', id)
                                    }
                                  >
                                    {opt}
                                  </Chip>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div>
                        <h2 className="font-display text-[24px] mb-2 text-white font-medium">
                          Rhythm & Style
                        </h2>
                        <p className="font-body text-sm text-on-surface-variant mb-8">
                          Define the pace and flavor of your Kyoto experience.
                        </p>
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <label className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold block">
                              Age Group
                            </label>
                            <div className="flex flex-wrap gap-3">
                              {['18-25', '26-35', '36-50', '50+'].map((opt) => (
                                <Chip
                                  key={opt}
                                  active={formData.ageGroup === opt}
                                  onClick={() => setFormData({ ...formData, ageGroup: opt })}
                                >
                                  {opt}
                                </Chip>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <label className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold block">
                              Travel Style
                            </label>
                            <div className="grid grid-cols-3 gap-4">
                              <ImageCard
                                src="/style-luxury.png"
                                label="Luxury"
                                icon="diamond"
                                active={formData.travelStyle === 'Luxury'}
                                onClick={() => setFormData({ ...formData, travelStyle: 'Luxury' })}
                              />
                              <ImageCard
                                src="/style-balanced.png"
                                label="Balanced"
                                active={formData.travelStyle === 'Balanced'}
                                onClick={() => setFormData({ ...formData, travelStyle: 'Balanced' })}
                              />
                              <ImageCard
                                src="/style-backpacking.png"
                                label="Backpacking"
                                active={formData.travelStyle === 'Backpacking'}
                                onClick={() => setFormData({ ...formData, travelStyle: 'Backpacking' })}
                              />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <label className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold block">
                              Trip Pace
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                              {[
                                // "Relaxed", "Balanced", "Fast-Paced"
                                { label: 'Relaxed' },
                                { label: 'Balanced' },
                                { label: 'Fast-Paced' },
                              ].map((opt) => (
                                <Chip
                                  key={opt.label}
                                  active={formData.tripPace === opt.label}
                                  onClick={() => setFormData({ ...formData, tripPace: opt.label })}
                                >
                                  {opt.label}
                                </Chip>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div>
                        <h2 className="font-display text-[24px] mb-2 text-white font-medium">
                          Logistics
                        </h2>
                        <p className="font-body text-sm text-on-surface-variant mb-8">
                          Sort out the practical details of your trip.
                        </p>
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <label className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold block">
                              Transport Preference
                            </label>
                            <div className="flex flex-wrap gap-3">
                              {['Flight', 'Train', 'Road', 'Any'].map((opt) => {
                                const id = opt
                                return (
                                  <Chip
                                    key={id}
                                    active={formData.transport.includes(id)}
                                    onClick={() =>
                                      toggleArrayItem('transport', id)
                                    }
                                  >
                                    {opt}
                                  </Chip>
                                )
                              })}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <label className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold block">
                              Stay Preference
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {['Hotel', 'Hostel', 'Resort', 'Any'].map((opt) => {
                                const id = opt
                                return (
                                  <Chip
                                    key={id}
                                    active={formData.stayPref.includes(id)}
                                    onClick={() =>
                                      setFormData({
                                        ...formData,
                                        stayPref: formData.stayPref.includes(id)
                                          ? formData.stayPref.filter((i) => i !== id)
                                          : [...formData.stayPref, id],
                                      })
                                    }
                                  >
                                    {opt}
                                  </Chip>
                                )
                              })}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <label className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold block">
                              Food Preference
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                              {['Veg', 'Non-Veg', 'Any'].map((opt) => {
                                const id = opt
                                return (
                                  <Chip
                                    key={id}
                                    active={formData.foodPref === id}
                                    onClick={() => setFormData({ ...formData, foodPref: id })}
                                  >
                                    {opt}
                                  </Chip>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div>
                        <h2 className="font-display text-[24px] mb-2 text-white font-medium">
                          Curations
                        </h2>
                        <p className="font-body text-sm text-on-surface-variant mb-8">
                          Select activities to enrich your itinerary.
                        </p>
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <label className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold block">
                              Activities (Select Multiple)
                            </label>
                            <div className="flex flex-wrap gap-3">
                              {[
                                'Nightlife',
                                'Trekking',
                                'Shopping',
                                'Camping',
                                'Photography',
                                'Relaxation',
                                'Food Exploration',
                              ].map((opt) => {
                                const id = opt.toLowerCase().split(' ')[0]
                                return (
                                  <Chip
                                    key={id}
                                    active={formData.activities.includes(id)}
                                    onClick={() =>
                                      toggleArrayItem('activities', id)
                                    }
                                  >
                                    {opt}
                                  </Chip>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Footer */}
              <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center">
                <button
                  onClick={prevStep}
                  className={`px-6 py-3 rounded-lg font-body text-sm font-semibold text-on-surface-variant hover:text-white transition-colors flex items-center gap-2 ${currentStep === 1 ? 'invisible' : 'visible'
                    }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_back
                  </span>{' '}
                  Back
                </button>
                <button
                  onClick={
                    currentStep === totalSteps
                      ? handleSubmit
                      : nextStep
                  }
                  className="gold-gradient text-background px-8 py-3 rounded-lg font-body text-sm font-semibold uppercase tracking-wide flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 active:scale-95"
                >
                  {currentStep === totalSteps ? 'Manifest Journey' : 'Continue'}

                  <span className="material-symbols-outlined text-[18px]">
                    {currentStep === totalSteps
                      ? 'auto_awesome'
                      : 'arrow_forward'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Stats & AI */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Live Group Harmony */}
            <div className="glass-panel rounded-xl p-6 border border-white/5 bg-surface-container-low/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent z-0" />
              <div className="relative z-10">
                <h3 className="font-body text-xs mb-5 text-on-surface-variant uppercase tracking-widest font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary/70 animate-pulse">
                      radar
                    </span>
                    Group Harmony
                  </span>
                  <span className="text-primary font-bold">{tripData.responses?.length || 0}/{tripData.totalMembers || 0}</span>
                </h3>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between font-body text-xs mb-2">
                      <span className="text-white">Organizer</span>
                      <span className="text-primary font-medium">{tripData.creatorName || 'TBD'}</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="w-full h-full bg-primary rounded-full shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                        style={{ width: `${Math.min(((tripData.responses?.length || 0) / Math.max(tripData.totalMembers || 1, 1)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-body text-xs mb-2">
                      <span className="text-white">Purpose</span>
                      <span className="text-secondary-fixed">{tripData.purpose || 'TBD'}</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary-fixed rounded-full shadow-[0_0_8px_rgba(255,222,165,0.3)]"
                        style={{ width: `${tripData.purpose ? '80' : '20'}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-body text-xs mb-2">
                      <span className="text-white">Responses</span>
                      <span className="text-on-surface-variant">{tripData.responses?.length || 0}</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/20 rounded-full"
                        style={{ width: `${Math.min(((tripData.responses?.length || 0) / Math.max(tripData.totalMembers || 1, 1)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {submitted && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-8 text-center max-w-sm mx-auto">
            <h2 className="font-display text-[24px] mb-4 text-white font-medium">
              Response Submitted!
            </h2>
            <p className="font-body text-sm text-on-surface-variant mb-6">
              Thanks for sharing your preferences. The trip organizer will review everyone's responses and finalize the itinerary soon!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="gold-gradient text-background px-6 py-3 rounded-lg font-body text-sm font-semibold uppercase tracking-wide transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default JoinTrip