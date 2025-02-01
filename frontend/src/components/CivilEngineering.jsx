import CivilImage from '../assets/CivilGroup.jpg'
import { FaArrowRight } from 'react-icons/fa'

const CivilEngineering = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/2 relative">
          <img
            src={CivilImage}
            alt="Civil Engineering"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/60 to-transparent rounded-lg"></div>
          <h2 className="absolute bottom-4 left-4 text-3xl md:text-4xl font-bold text-white leading-tight">
            Civil
            <br />
            Engineering
          </h2>
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <p className="text-lg text-gray-600">
            Civil engineering is a professional engineering discipline that deals with the design, construction, and maintenance of physical and naturally built environments. It encompasses a wide range of critical infrastructure projects.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Structural design and analysis</li>
            <li>Transportation infrastructure</li>
            <li>Water resource management</li>
            <li>Environmental engineering</li>
          </ul>
          <p className="text-gray-600">
            Civil engineers play a crucial role in developing sustainable solutions for urban planning, infrastructure development, and environmental protection, creating the backbone of modern society.
          </p>
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors group">
            Learn More
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CivilEngineering
