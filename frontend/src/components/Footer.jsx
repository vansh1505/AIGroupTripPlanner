const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest w-full py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center px-5 md:px-16 gap-2 mt-auto">
      <div className="font-display text-xl text-primary opacity-80 hover:opacity-100 transition-opacity font-bold tracking-tighter">
        Planora
      </div>
      <div className="flex gap-8 mt-6 md:mt-0">
        <a
          className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors font-medium"
          href="#"
        >
          Destinations
        </a>
        <a
          className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors font-medium"
          href="#"
        >
          Journal
        </a>
        <a
          className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors font-medium"
          href="#"
        >
          Concierge
        </a>
        <a
          className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors font-medium"
          href="#"
        >
          Privacy
        </a>
      </div>
      <div className="font-body text-on-surface-variant mt-6 md:mt-0 opacity-60 text-center md:text-right text-xs">
        © 2024 Planora. Curated for the intentional traveler.
      </div>
    </footer>
  )
}

export default Footer
