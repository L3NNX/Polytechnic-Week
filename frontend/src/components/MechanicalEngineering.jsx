import MechanicalImage from '../assets/MechanicalGroup.jpg'
import { FaArrowRight } from 'react-icons/fa'

const MechanicalEngineering = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/2 relative">
          <img
            src={MechanicalImage}
            alt="Mechanical Engineering"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/60 to-transparent rounded-lg"></div>
          <h2 className="absolute bottom-4 left-4 text-3xl md:text-4xl font-bold text-white leading-tight">
            Mechanical
            <br />
            Engineering
          </h2>
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <p className="text-lg text-gray-600">
            Mechanical engineering is a field of engineering that deals with the design, manufacturing, and maintenance of mechanical systems. It covers a wide range of technologies including:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Machine design and manufacturing</li>
            <li>Thermal and fluid systems</li>
            <li>Robotics and automation</li>
            <li>Materials science and engineering</li>
          </ul>
          <p className="text-gray-600">
            Mechanical engineers design, develop, and test mechanical devices, including tools, engines, machines, and other mechanical systems used in various industries.
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

export default MechanicalEngineering
