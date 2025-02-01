"use client"

import { useState, useEffect } from "react"
import { BiChevronDown } from "react-icons/bi"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const StudentParticipation = () => {
  const [sports, setSports] = useState([])
  const [selectedSportId, setSelectedSportId] = useState("")
  const [participationData, setParticipationData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sports`)
        const data = await response.json()
        setSports(data)
      } catch (error) {
        console.error("Error fetching sports:", error)
        setError("Failed to fetch sports")
      }
    }
    fetchSports()
  }, [])

  const fetchParticipation = async (sportId) => {
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/students`)
      const data = await response.json()

      const participationMap = data.reduce((acc, student) => {
        const sportParticipation = student.sports.find((s) => s.sport._id === sportId)
        if (sportParticipation) {
          const entry = {
            id: student._id,
            name: student.name,
            date: new Date(sportParticipation.participationDate).toLocaleDateString(),
          }

          acc[student.department] = [...(acc[student.department] || []), entry]
        }
        return acc
      }, {})

      setParticipationData(participationMap)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching participation:", error)
      setError("Failed to load participation data")
      setLoading(false)
    }
  }

  const handleSportSelect = (event) => {
    const sportId = event.target.value
    setSelectedSportId(sportId)
    if (sportId) fetchParticipation(sportId)
  }

  const totalParticipation = Object.values(participationData).reduce((sum, students) => sum + students.length, 0)

  const departments = Object.keys(participationData)
  const maxStudents = Math.max(0, ...Object.values(participationData).map((students) => students.length))

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sport Participation</h2>
          <div className="relative mb-8">
            <select
              id="sport-select"
              value={selectedSportId}
              onChange={handleSportSelect}
              className="w-full p-4 pr-12 text-lg bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200"
            >
              <option value="">Select a sport</option>
              {sports.map((sport) => (
                <option key={sport._id} value={sport._id}>
                  {sport.name}
                </option>
              ))}
            </select>
            <BiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={24} />
          </div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <AiOutlineLoading3Quarters className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {selectedSportId && !loading && !error && (
            <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {sports.find((s) => s._id === selectedSportId)?.name} Participation
                </h3>
                <div className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-medium">
                  Total Participants: {totalParticipation}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 rounded-lg overflow-hidden">
                      {departments.map((department) => (
                        <th
                          key={department}
                          className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          {department} Department
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {totalParticipation === 0 ? (
                      <tr>
                        <td colSpan={departments.length || 1} className="px-6 py-4 text-center text-gray-500">
                          No students have participated in this sport.
                        </td>
                      </tr>
                    ) : (
                      [...Array(maxStudents)].map((_, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                          {departments.map((department) => {
                            const student = participationData[department][index]
                            return (
                              <td key={`${department}-${index}`} className="px-6 py-4 whitespace-nowrap">
                                {student ? (
                                  <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                                      {student.name.charAt(0)}
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                      <div className="text-xs text-gray-500">{student.date}</div>
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentParticipation
