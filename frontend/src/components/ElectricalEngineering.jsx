import Electrical from '../assets/ElectricalGroup.jpeg'
import { FaArrowRight } from 'react-icons/fa'
const  ElectricalEngineering = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/2 relative">
          <img
            src={Electrical}
            alt="Electrical Engineering"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/60 to-transparent rounded-lg"></div>
          <h2 className="absolute bottom-4 left-4 text-3xl md:text-4xl font-bold text-white leading-tight">
            Electrical
            <br />
            Engineering
          </h2>
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <p className="text-lg text-gray-600">
            Electrical engineering is a field of engineering that deals with the study and application of electricity,
            electronics, and electromagnetism. It covers a wide range of technologies including:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Power systems and renewable energy</li>
            <li>Microelectronics and integrated circuits</li>
            <li>Signal processing and communications</li>
            <li>Control systems and automation</li>
          </ul>
          <p className="text-gray-600">
            Electrical engineers design, develop, test, and supervise the manufacturing of electrical equipment, such as
            electric motors, radar and navigation systems, communications systems, and power generation equipment.
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

export default ElectricalEngineering

