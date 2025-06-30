import "./App.css";
import Landing from "./components/Landing";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./components/Test";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Pricing from "./components/Pricing";
import Youtube from "./components/Youtube";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="bg-gradient-to-br from-purple-100 to-white min-h-screen">
        <Routes>
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
