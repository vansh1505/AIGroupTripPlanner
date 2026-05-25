import { Link } from 'react-router-dom'

const Navbar = ({ activePath = '' }) => {
  return (
    <nav className="bg-surface/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-white/5 shadow-2xl flex justify-between items-center px-5 md:px-16 py-4 max-w-7xl mx-auto left-0 right-0">
      <Link to="/" className="no-underline">
        <div className="font-display text-primary tracking-tighter text-[28px] md:text-[32px] font-bold">
          Planora
        </div>
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
    </nav>
  )
}

export default Navbar
