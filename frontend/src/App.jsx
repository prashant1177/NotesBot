import "./App.css";
import React, { useState, useEffect } from "react";
import Landing from "./Pages/Landing/Landing";
import Main from "./Pages/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/UserAuth/Login";
import Dashboard from "./components/Dashboard";
import Register from "./Pages/UserAuth/Register";
import Youtube from "./Pages/Youtube";
import Maintenance from "./Pages/Maintenance";
import NewNote from "./Pages/Notes/Note/NewNote";
import NoteEditor from "./Pages/Notes/Note/NoteEditor";
import ShowNote from "./Pages/Notes/Note/ShowNote";
import PublicNotes from "./Pages/Notes/allNotes/PublicNotes";
import PrivateNotes from "./Pages/Notes/allNotes/PrivateNotes";
import Sidebar from "./components/Sidebar";
import UserHome from "./Pages/UserHome/UserHome";
import NoteDetails from "./Pages/Notes/Note/NoteDetails";
import { setAuthToken } from "./api";
import UserView from "./Pages/UserView/UserView";

function App() {
  const [isActive, setIsActive] = useState(true);
  const [sidebarHide, setSidebarHide] = useState("w-64");
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
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
        {token ? <Sidebar
          toggleSidebar={toggleSidebar}
          sidebarHide={sidebarHide}
          isActive={isActive}
        /> : <Navbar/>} 
        
        <div
          className={`main-content transition-all duration-300 ${
            token ? `${
            isActive ? "ml-64" : "ml-16"
          }` : ""
          }`}
        >
          <Routes>
            <Route path="/" element={token ?<UserHome />: <Landing />} />
            <Route path="/main" element={<Main />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/NewNote" element={<NewNote />} />
            <Route path="/PublicNotes" element={<PublicNotes />} />
            <Route path="/PrivateNotes" element={<PrivateNotes />} />
            <Route path="/details/:noteId" element={<NoteDetails />} />
            <Route path="/shownote/:noteId" element={<ShowNote />} />
            <Route path="/editor/:noteId" element={<NoteEditor />} />
            <Route path="/author/:authorId" element={<UserView />} />
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
