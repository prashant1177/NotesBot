import "./App.css";
import React, { useState, useEffect } from "react";
import Landing from "./Pages/Landing/Landing";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/UserAuth/Login";
import Register from "./Pages/UserAuth/Register";
import Maintenance from "./Pages/Maintenance";
import Sidebar from "./components/Sidebar";
import { setAuthToken } from "./api";
import UserEdit from "./Pages/UserView/UserEdit";
import ProjectView from "./Pages/Projects/ProjectView/ProjectView";
import CreateProject from "./Pages/Projects/CreateProject";
import EditorIndex from "./Pages/LatexEditor/EditorIndex";
import MyProject from "./Pages/Projects/MyProjectsList/UserProfileIndex";
import TemplatesIndex from "./Pages/Templates/TemplatesIndex";
function App() {
  const [isActive, setIsActive] = useState(false);
  const [sidebarHide, setSidebarHide] = useState("w-16");
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
            <Route path="/" element={token ?<MyProject />: <Landing />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/latexeditor/:projectid" element={<EditorIndex />} />
            <Route path="/user" element={<UserEdit />} />
            <Route path="/project/:projectid" element={<ProjectView />} />
            <Route path="/templates" element={<TemplatesIndex />} />
            <Route path="/create/project" element={<CreateProject />} />   
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
