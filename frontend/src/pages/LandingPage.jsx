import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10 transition-colors duration-300 ${
          scrolled ? 'bg-surface/80' : 'bg-surface/60'
        }`}
      >
        <div className="flex justify-between items-center px-5 md:px-16 py-4 max-w-7xl mx-auto">
          <img src="/logo2.png" alt="Planora Logo" className="h-20" />

          <Link to="/create-trip">
            <button className="gold-gradient text-on-primary px-6 py-3 rounded-full text-sm font-semibold tracking-wide border-none cursor-pointer flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:-translate-y-0.5 active:scale-95">
              Start Planning
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center animated-bg pt-24 mt-12 px-5 md:px-16 overflow-hidden pb-32">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-primary/5 blur-[100px]" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          >
            <span className="material-symbols-outlined text-primary text-base">auto_awesome</span>
            <span className="text-on-surface-variant text-xs font-medium uppercase tracking-widest">
              The Future of Travel Planning
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-on-surface text-[clamp(2.5rem,6vw,4rem)] leading-tight tracking-tight mb-6"
          >
            Travel Better,
            <br />
            <span className="text-gold-gradient italic">Together.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-on-surface-variant text-lg leading-relaxed max-w-2xl mx-auto mb-12"
          >
            Curate immersive, cinematic itineraries with AI precision. Collaborate
            seamlessly with your inner circle to craft the perfect journey.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/create-trip">
              <button className="gold-gradient text-on-primary px-8 py-4 rounded-full text-sm font-semibold tracking-wide border-none cursor-pointer flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:-translate-y-0.5 active:scale-95">
                Start Your Journey
                <span className="material-symbols-outlined text-lg">flight_takeoff</span>
              </button>
            </Link>
            <button className="glass-panel text-on-surface px-8 py-4 rounded-full text-sm font-semibold tracking-wide cursor-pointer flex items-center justify-center gap-2 transition-all hover:bg-white/10 active:scale-95">
              Explore Destinations
            </button>
          </motion.div>

          {/* Hero Image Showcase */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 w-full max-w-5xl mx-auto relative"
          >
            {/* Outer glow */}
            <div className="absolute -inset-1 rounded-2xl blur-xl opacity-50 bg-linear-to-r from-primary/20 to-secondary/20" />

            {/* Image container */}
            <div className="glass-elevated rounded-2xl overflow-hidden relative aspect-video">
              <img
                src="/hero-travel.png"
                alt="Luxury Mediterranean coastline at golden hour"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />

              {/* Trip info card */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 glass-panel rounded-xl p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="font-display text-on-surface text-2xl font-medium mb-1">
                    Amalfi Coast Escape
                  </h3>
                  <p className="font-body text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">calendar_today</span>
                    Oct 12 - 18 • 4 Travelers
                  </p>
                </div>

                {/* Avatars */}
                <div className="flex -space-x-4">
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container-high" />
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container-high" />
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-primary/20 flex items-center justify-center text-primary text-xs font-medium">
                    +2
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-surface-container-lowest py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="font-display text-primary text-2xl font-medium tracking-tighter">
            Planora
          </span>

          <p className="text-on-surface-variant text-sm text-center md:text-right">
            © {new Date().getFullYear()} Planora. Curated for the intentional traveler.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage;