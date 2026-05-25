const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest w-full py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center px-5 md:px-16 gap-2 mt-auto">
      <div className="font-display text-xl text-primary opacity-80 hover:opacity-100 transition-opacity font-bold tracking-tighter">
        Planora
      </div>
      <div className="font-body text-on-surface-variant mt-6 md:mt-0 opacity-60 text-center md:text-right text-xs">
        © {new Date().getFullYear()} Planora. Curated for group travelers.
      </div>
    </footer>
  )
}

export default Footer
