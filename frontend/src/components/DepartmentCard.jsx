import React from "react"
import { motion } from "framer-motion"
import { FaArrowRight } from "react-icons/fa" // React Icons replacement for Lucide

const DepartmentCard = ({ image, name, motto }) => {
  return (
    <motion.div
      className="overflow-hidden rounded-xl bg-white shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative h-48">
        <img
          src={image || "/placeholder.svg?height=400&width=600"}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-1">{name}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4">{motto}</p>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">Learn more about this department</div>
          <motion.button
            className="w-full md:w-auto sm:w-auto flex items-center px-4 py-[9px] border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Details
            <FaArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default DepartmentCard
