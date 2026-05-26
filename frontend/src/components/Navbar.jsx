import { Link } from 'react-router-dom'

const Navbar = ({ activePath = '', showCTA = false }) => {
  return (
    <nav className="bg-surface/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-white/5 shadow-2xl flex justify-between items-center px-5 md:px-16 py-4 max-w-7xl mx-auto left-0 right-0">
      <Link to="/" className="no-underline">
        <img src="/logo2.png" alt="Planora Logo" className="h-16" />
      </Link>
      <div className="hidden md:flex gap-8 items-center">
        <a
          className={`font-body text-sm font-medium transition-colors duration-300 ${
            activePath === 'explore'
              ? 'text-primary border-b-2 border-primary pb-1 font-bold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
          href="#"
        >
          Explore
        </a>
        <a
          className={`font-body text-sm font-medium transition-colors duration-300 ${
            activePath === 'my-trips'
              ? 'text-primary border-b-2 border-primary pb-1 font-bold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
          href="#"
        >
          My Trips
        </a>
      </div>
      <div className="flex items-center gap-4">
        {showCTA && (
          <button className="gold-gradient text-[#0A0A0A] px-6 py-2 rounded-full font-body text-[14px] font-semibold tracking-wider hidden md:block transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:-translate-y-0.5">
            Start Planning
          </button>
        )}
        <div className="w-10 h-10 rounded-full bg-surface-container-high border border-white/10 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors">
          <img
            alt="User profile avatar"
            className="w-full h-full object-cover"
            src="/avatar-1.png"
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
