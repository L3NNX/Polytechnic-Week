import { useState, useEffect } from "react"
import axios from "axios"
import { FaTrophy, FaMedal } from "react-icons/fa"

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState({})
  const [sports, setSports] = useState([])

  useEffect(() => {
    fetchSports()
    fetchPoints()
  }, [])

  const fetchSports = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/sports`)
      setSports(response.data)
    } catch (error) {
      console.error("Error fetching sports:", error)
    }
  }

  const fetchPoints = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/points`)
      const points = response.data
      const leaderboardData = {}

      points.forEach((point) => {
        const sportName = point.sport.name
        if (!leaderboardData[sportName]) {
          leaderboardData[sportName] = {}
        }
        if (!leaderboardData[sportName][point.department]) {
          leaderboardData[sportName][point.department] = {
            totalPoints: 0,
            id: point._id,
          }
        }
        leaderboardData[sportName][point.department].totalPoints += point.points
      })

      setLeaderboard(leaderboardData)
    } catch (error) {
      console.error("Error fetching points:", error)
    }
  }

  const getPositionStyle = (index) => {
    switch (index) {
      case 0:
        return "bg-yellow-100 text-yellow-800"
      case 1:
        return "bg-gray-100 text-gray-800"
      case 2:
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-white"
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Leaderboard</h2>

      {Object.entries(leaderboard).map(([sport, departments]) => (
        <div key={sport} className="mb-12">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(departments)
                  .sort(([, a], [, b]) => b.totalPoints - a.totalPoints)
                  .map(([department, { totalPoints }], index) => (
                    <tr
                      key={department}
                      className={`${getPositionStyle(index)} transition-colors duration-200 ease-in-out hover:bg-gray-50`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                        {index < 3 && (
                          <FaMedal
                            className={`inline-block w-4 h-4 ml-1 ${index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-500" : "text-orange-500"}`}
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{totalPoints}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Leaderboard
