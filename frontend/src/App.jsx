import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import LandingPage from "./components/Landingpage"
import AdminDashboard from "./components/AdminDashboard"
import Leaderboard from "./components/Leaderboard"
import Union from "./components/Union"
import Allsports from "./components/Allsports"
import CivilEngineering from "./components/CivilEngineering"
import ElectricalEngineering from "./components/ElectricalEngineering"
import MechanicalEngineering from "./components/MechanicalEngineering"
import StudentParticipation from "./components/StudentParticipation"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/update" element={<Allsports />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/union" element={<Union />} />
              <Route path="/civil" element={<CivilEngineering />} />
              <Route path="/electrical" element={<ElectricalEngineering />} />
              <Route path="/mechanical" element={<MechanicalEngineering />} />
              <Route path="/student" element={<StudentParticipation />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

