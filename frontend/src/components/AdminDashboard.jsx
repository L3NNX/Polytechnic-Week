import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [sportsData, setSportsData] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");

  const [department, setDepartment] = useState("");
  const [points, setPoints] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const [studentName, setStudentName] = useState("");
  const [studentDept, setStudentDept] = useState("");
  const [selectedSports, setSelectedSports] = useState([]);

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const resetForms = () => {
    setSelectedSport("");
    setDepartment("");
    setPoints("");
    setStudentName("");
    setStudentDept("");
    setSelectedSports([]);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const adminEmail = import.meta.env.VITE_ADMIN_EMAILS;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
 
    if (
      username === adminEmail &&
      password === adminPassword
    ) {
      login(); 
      setAuthError("");
    } else {
      setAuthError("Invalid credentials");
    }
  };

  const handlePointsSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSport || !department || !points) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/points/add`, {
        sport: selectedSport,
        department,
        points: Number(points)
      });

      setSubmitMessage("Points added successfully!");
      resetForms();
    } catch (error) {
      console.error("Error adding points:", error);
      setSubmitMessage("Failed to add points");
    }
  };

  const handleLogout = () => {
    logout();
    setUsername("");
    setPassword("");
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    if (!studentName || !studentDept || selectedSports.length === 0) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/students/add`, {
        name: studentName,
        department: studentDept,
        sports: selectedSports
      });

      setSubmitMessage("Student added successfully!");
      resetForms();
    } catch (error) {
      console.error("Error adding student:", error);
      setSubmitMessage("Failed to add student");
    }
  };

  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/sports`);
        setSportsData(response.data);
      } catch (error) {
        console.error("Error fetching sports data:", error);
      }
    };

    fetchSportsData();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-5 text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {authError && (
            <div className="text-red-500 text-center">{authError}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <nav className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
      
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-gray-700 font-medium text-sm">Admin Dashboard</span>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-blue-50/80 hover:bg-blue-100 transition-colors">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-blue-800 text-sm font-medium">500 Students</span>
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-green-50/80 hover:bg-green-100 transition-colors">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-green-800 text-sm font-medium">{sportsData.length} Sports</span>
            </div>
          </div>
        </div>

        {/* Right Side - Logout */}
        <button
          onClick={handleLogout}
          className="group flex items-center space-x-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="text-gray-600 group-hover:text-red-700 transition-colors font-medium text-sm">Logout</span>
        </button>
      </nav>

      {submitMessage && (
        <div
          className={`mb-4 p-2 rounded text-center ${submitMessage.includes("successfully")
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
            }`}
        >
          {submitMessage}
        </div>
      )}
      {!selectedOption ? (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setSelectedOption("points")}
            className="group relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-blue-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-700">Add Points</h3>
                <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600">Add department points for specific sports</p>
              </div>
            </div>
          </button>

          <button

            onClick={() => navigate('/admin/update')}
            className="group relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-blue-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-700">Update Points</h3>
                <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600">Update department points for specific sports</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedOption("student")}
            className="group relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-green-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-green-700">Add Student</h3>
                <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600">Register new student with sport participations</p>
              </div>
            </div>
          </button>

        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-5 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedOption === "points" ? "Add Department Points" : "Add New Student"}
            </h2>
            <button
              onClick={() => {
                setSelectedOption(null);
                resetForms();
              }}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>

          {selectedOption === "points" ? (
            <form onSubmit={handlePointsSubmit} className="space-y-6 ">

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Sport</label>
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-no-repeat pr-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiA2NDY0NmQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSIvPjwvc3ZnPg==')]"
                  required
                >
                  <option value="">Select a sport</option>
                  {sportsData.map((sport) => (
                    <option key={sport._id} value={sport._id}>
                      {sport.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-no-repeat pr-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiA2NDY0NmQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSIvPjwvc3ZnPg==')]"
                  required
                >
                  <option value="">Select department</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Electrical">Electrical</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Points</label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter points"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Add Points
              </button>
            </form>
          ) : (
            <form onSubmit={handleStudentSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Student Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter student name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  value={studentDept}
                  onChange={(e) => setStudentDept(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-no-repeat pr-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiA2NDY0NmQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSIvPjwvc3ZnPg==')]"
                  required
                >
                  <option value="">Select department</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Electrical">Electrical</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Sports Participation</label>
                <select
                  multiple
                  value={selectedSports}
                  onChange={(e) => setSelectedSports(
                    Array.from(e.target.selectedOptions, option => option.value)
                  )}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 bg-white"
                  required
                >
                  {sportsData.map((sport) => (
                    <option
                      key={sport._id}
                      value={sport._id}
                      className="px-3 py-2 hover:bg-blue-50 focus:bg-blue-100"
                    >
                      {sport.name}
                    </option>
                  ))}
                </select>
                <small className="block text-xs text-gray-400 mt-1">Hold ⌘ (Mac) or Ctrl (Windows) to select multiple</small>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Add Student
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
