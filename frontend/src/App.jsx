import "./App.css";
import Landing from "./Pages/Landing/Landing";
import Main from "./Pages/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./components/Dashboard";
import Register from "./Pages/Register";
import Youtube from "./Pages/Youtube";
import Maintenance from "./Pages/Maintenance";
import UItest from "./Pages/UItest";
import NewNote from "./Pages/Notes/Note/NewNote/NewNote";
import NotionClone from "./Pages/Notes/Note/Editing/NoteEditor";
import NoteEditor from "./Pages/Notes/Note/Editing/NoteEditor";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-text">
        <Navbar />
        <Routes >
          <Route path="/" element={<Maintenance />} />
          <Route path="/main" element={<Main />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/NewNote" element={<NewNote />} />
          <Route path="/editor" element={<NoteEditor />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/youtube" element={<Youtube />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
