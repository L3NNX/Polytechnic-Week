import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";

const Allsports = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [leaderboard, setLeaderboard] = useState({});
  const [sports, setSports] = useState([]);
  const [selectedSportId, setSelectedSportId] = useState(""); 
  const [department, setDepartment] = useState("");
  const [points, setPoints] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [editingPointId, setEditingPointId] = useState(null);
  const [recordStatus, setRecordStatus] = useState("new"); // "new" or "existing"
  const [expandedSport, setExpandedSport] = useState(null);

  // Fetch sports and points data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sportsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/sports`);
        setSports(sportsResponse.data);

        const pointsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/points`);
        const pointsData = pointsResponse.data;
        const leaderboardData = {};

        // Build mapping for sport IDs to names
        const sportIdToName = {};
        sportsResponse.data.forEach(sport => {
          sportIdToName[sport._id] = sport.name;
        });

        pointsData.forEach(point => {
          const sportName = sportIdToName[point.sport] || "Unknown Sport";
          if (!leaderboardData[sportName]) {
            leaderboardData[sportName] = {};
          }
          if (!leaderboardData[sportName][point.department]) {
            leaderboardData[sportName][point.department] = { 
              totalPoints: 0, 
              id: point._id 
            };
          }
          leaderboardData[sportName][point.department].totalPoints += point.points;
        });

        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Auto-detect if record exists based on selected sport and department.
  useEffect(() => {
    if (selectedSportId && department) {
      const sportObj = sports.find(s => s._id === selectedSportId);
      if (sportObj) {
        const sportName = sportObj.name;
        if (leaderboard[sportName] && leaderboard[sportName][department]) {
          const existingRecord = leaderboard[sportName][department];
          setEditingPointId(existingRecord.id);
          setPoints(existingRecord.totalPoints);
          setRecordStatus("existing");
        } else {
          setEditingPointId(null);
          setRecordStatus("new");
          setPoints("");
        }
      }
    }
  }, [selectedSportId, department, sports, leaderboard]);

  const isAdmin = isAuthenticated;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSportId || !department || points === "" || isNaN(points) || points < 0 || points > 100) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const newPoints = {
      sport: selectedSportId,
      department,
      points: Number(points),
    };

    try {
      if (editingPointId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/points/update/${editingPointId}`, newPoints);
        setSubmitMessage("Points updated successfully!");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/points/add`, newPoints);
        setSubmitMessage("Points added successfully!");
      }
      resetForm();
      // Re-fetch data
      window.location.reload();
    } catch (error) {
      console.error("Error adding/updating points:", error);
      setSubmitMessage(error.response?.data?.message || "Failed to add/update points");
    }
  };

  const resetForm = () => {
    setSelectedSportId("");
    setDepartment("");
    setPoints("");
    setEditingPointId(null);
    setRecordStatus("new");
  };

  const handleDelete = async (sportName, departmentName) => {
    try {
      const pointId = leaderboard[sportName][departmentName].id;
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/points/${pointId}`);
      setSubmitMessage("Points deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting points:", error);
      setSubmitMessage("Failed to delete points");
    }
  };

  const handleEdit = (sportName, departmentName) => {
    const sport = sports.find(s => s.name === sportName);
    if (sport) {
      setSelectedSportId(sport._id);
    }
    setDepartment(departmentName);
    const totalPoints = leaderboard[sportName][departmentName].totalPoints;
    setPoints(totalPoints);
    const pointId = leaderboard[sportName][departmentName].id;
    setEditingPointId(pointId);
    setRecordStatus("existing");
  };

  // Toggle accordion open/close for a given sport.
  const toggleAccordion = (sportName) => {
    setExpandedSport(expandedSport === sportName ? null : sportName);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Leaderboard</h2>

      {/* Admin form */}
      {isAdmin && (
        <form onSubmit={handleSubmit} className="mb-10 space-y-4 p-4 border rounded shadow-md">
          <div>
            <label className="block mb-1">Sport:</label>
            <select
              value={selectedSportId}
              onChange={(e) => setSelectedSportId(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a sport</option>
              {sports.map((sport) => (
                <option key={sport._id} value={sport._id}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Department:</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a department</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Electrical">Electrical</option>
            </select>
          </div>

          {selectedSportId && department && (
            <p className="text-sm italic">
              {recordStatus === "existing" ? "Editing existing record" : "Creating new record"}
            </p>
          )}

<input
  type="number"
  value={points}
  onChange={(e) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value)));
    setPoints(value);
  }}
  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
  min="0"
  max="100"
/>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            {editingPointId ? "Update Points" : "Add Points"}
          </button>
        </form>
      )}

      {/* Accordion layout for Leaderboard */}
      <div className="space-y-4">
        {Object.entries(leaderboard).map(([sport, departments]) => (
          <div key={sport} className="border rounded shadow">
            <div
              onClick={() => toggleAccordion(sport)}
              className="cursor-pointer bg-gray-200 p-4 flex justify-between items-center"
            >
              <span className="font-semibold text-xl">{sport}</span>
              <span>{expandedSport === sport ? "-" : "+"}</span>
            </div>
            {expandedSport === sport && (
              <div className="p-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">Department</th>
                      <th className="border p-2">Points</th>
                      {isAdmin && <th className="border p-2">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(departments)
                      .sort(([, a], [, b]) => b.totalPoints - a.totalPoints)
                      .map(([dept, { totalPoints }]) => (
                        <tr key={dept}>
                          <td className="border p-2">{dept}</td>
                          <td className="border p-2">{totalPoints}</td>
                          {isAdmin && (
                            <td className="border p-2">
                              <button
                                onClick={() => handleEdit(sport, dept)}
                                className="text-blue-500 hover:underline mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(sport, dept)}
                                className="text-red-500 hover:underline"
                              >
                                Delete
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit message */}
      {submitMessage && (
        <div
          className={`mt-6 p-2 rounded text-center ${
            submitMessage.includes("successfully")
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {submitMessage}
        </div>
      )}
    </div>
  );
};

export default Allsports;
