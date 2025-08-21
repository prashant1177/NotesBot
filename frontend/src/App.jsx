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
import UserHome from "./Pages/UserHome/UserHome";

function App() {
  const [isActive, setIsActive] = useState(true);
  const [sidebarHide, setSidebarHide] = useState("w-64"); 

const toggleSidebar = () => {
      setIsActive((prev) => !prev); // toggle class
       if (isActive) {
      setSidebarHide("w-16");
    } else {
      setSidebarHide("w-64");
    }
    };
    
  return (
    <Router>
      <div>
       <Sidebar toggleSidebar={toggleSidebar} sidebarHide={sidebarHide} isActive={isActive}/>
        <div
          className={`main-content transition-all duration-300 ${
            isActive ?  "ml-64"  :"ml-16"
          }`}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<UserHome />} />
            <Route path="/main" element={<Main />} />
            <Route path="/maintenance" element={<Maintenance />} />
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
      </div>
    </Router>
  );
}

export default App;
