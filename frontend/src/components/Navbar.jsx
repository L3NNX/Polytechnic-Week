import { useState } from "react"
import { Link } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-white bg-clip-text"
          >
            Dhemaji Polytechnic
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/admin">Admin</NavLink>
            <NavLink to="/union">Union</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="pt-2 pb-4">
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/admin">Admin</MobileNavLink>
            <MobileNavLink to="/union">Union</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

// Desktop NavLink Component
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative text-gray-300 hover:text-white px-3 py-2 text-sm font-medium group transition-colors"
  >
    {children}
    <span className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 w-0 group-hover:w-full transition-all duration-300 ease-out" />
  </Link>
)

// Mobile NavLink Component
const MobileNavLink = ({ to, children }) => (
  <Link
    to={to}
    className="block px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors border-l-4 border-transparent hover:border-blue-400"
  >
    {children}
  </Link>
)

export default Navbar