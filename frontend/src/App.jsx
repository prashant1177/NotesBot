import "./App.css";
import Landing from "./Pages/Landing";
import Main from "./Pages/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./components/Dashboard";
import Register from "./Pages/Register";
import Pricing from "./Pages/Pricing";
import Youtube from "./Pages/Youtube";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="bg-purple-50">
        <Routes >
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={< Pricing/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/youtube" element={<Youtube />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
