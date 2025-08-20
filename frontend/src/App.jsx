import "./App.css";
import React, { useState, useEffect } from "react";
import Landing from "./Pages/Landing/Landing";
import Main from "./Pages/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./components/Dashboard";
import Register from "./Pages/Register";
import Youtube from "./Pages/Youtube";
import Maintenance from "./Pages/Maintenance";
import NewNote from "./Pages/Notes/Note/NewNote";
import NoteEditor from "./Pages/Notes/Note/NoteEditor";
import ShowNote from "./Pages/Notes/Note/ShowNote";
import PublicNotes from "./Pages/Notes/allNotes/PublicNotes";
import PrivateNotes from "./Pages/Notes/allNotes/PrivateNotes";
import Sidebar from "./components/Sidebar";

function App() {
   const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if Ctrl + N is pressed
      if (e.ctrlKey && e.key === "g") {
        e.preventDefault(); // prevent browser default new window/tab
        setIsActive((prev) => !prev); // toggle class
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <Router>
      <div className="min-h-screen bg-background text-text">
       { isActive ? 
        <Navbar />:
        null
       }
        <Routes >
          <Route path="/" element={<Maintenance />} />
          <Route path="/main" element={<Main />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/NewNote" element={<NewNote />} />
          <Route path="/PublicNotes" element={<PublicNotes />} />
          <Route path="/PrivateNotes" element={<PrivateNotes />} />
          <Route path="/shownote" element={<ShowNote />} />
          <Route path="/editor/:noteId" element={<NoteEditor />} />
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
