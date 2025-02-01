import { Link } from "react-router-dom"
import DepartmentCard from "./DepartmentCard"
import Civil from "../assets/civil.jpg"
import Electric from "../assets/electric.jpg"
import Mech from "../assets/mech.jpg"
import { FaWhatsapp } from 'react-icons/fa'
const LandingPage = () => {


  const handleWhatsAppRegister = () => {
    const phoneNumber = "+918638122827";
    const message = encodeURIComponent("I want to register for Polytechnic Week 2025. Can you help me with the registration process?");

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const departments = [
    { name: "Civil Engineering", image: Civil, motto: "Changing Skylines, One Beam at a Time", path: "/civil" },
    { name: "Electrical Engineering", image: Electric, motto: "Energizing Life, One Connection at a Time", path: "/electrical" },
    { name: "Mechanical Engineering", image: Mech, motto: "Innovating the Future, One Gear at a Time", path: "/mechanical" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">
      <header className="relative text-center py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('path/to/pattern.svg')] opacity-20"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold mb-4 text-white tracking-tight">POLYTECHNIC WEEK 2025</h1>
          <p className="text-2xl text-indigo-100 font-light max-w-2xl mx-auto">
            Unleashing Talent, Igniting Passion, Shaping the Future of Engineering
          </p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 text-indigo-900">Competing Departments</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {departments.map((dept) => (
            <Link key={dept.name} to={dept.path} className="transform transition duration-300 hover:scale-105">
              <DepartmentCard image={dept.image} name={dept.name} motto={dept.motto} />
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-8 mt-24">
          <Link
            to="/leaderboard"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg transform hover:-translate-y-1"
          >
            Leaderboard
          </Link>
          <Link
            to="/student"
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-10 py-4 rounded-full text-xl font-semibold hover:from-pink-600 hover:to-orange-600 transition shadow-lg transform hover:-translate-y-1"
          >
            Students
          </Link>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-indigo-900">Event Highlights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-md">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mb-6 flex items-center justify-center">
                  <span className="text-2xl text-white">🏆</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-900">Event Title {item}</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
            Ready to Participate?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 max-w-xl sm:max-w-2xl mx-auto text-white/90">
            Join us for an unforgettable week of innovation, competition, and growth.
            Showcase your skills and be part of shaping the future of engineering.
          </p>

          <button
            onClick={handleWhatsAppRegister}
            className="bg-white text-indigo-900 
        px-6 sm:px-8 md:px-10 
        py-3 sm:py-3.5 md:py-4 
        rounded-full 
        text-base sm:text-lg md:text-xl 
        font-semibold 
        hover:bg-indigo-100 
        transition 
        shadow-lg 
        flex 
        items-center 
        mx-auto 
        space-x-2"
          >
            <FaWhatsapp className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
            <span>Register Now</span>
          </button>
        </div>
      </section>

    </div>
  )
}

export default LandingPage

