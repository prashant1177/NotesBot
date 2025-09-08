import "./App.css";
import React, { useState, useEffect } from "react";
import Landing from "./Pages/Landing/Landing";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/UserAuth/Login";
import Register from "./Pages/UserAuth/Register";
import Sidebar from "./components/Sidebar";
import { setAuthToken } from "./api";
import UserEdit from "./Pages/UserView/UserEdit";
import ProjectView from "./Pages/Projects/ProjectView/ProjectView";
import CreateProject from "./Pages/Projects/CreateProject";
import EditorIndex from "./Pages/LatexEditor/EditorIndex";
import UserProfileIndex from "./Pages/Projects/MyProjectsList/UserProfileIndex";
import TemplatesIndex from "./Pages/Templates/TemplatesIndex";
import PremiumPage from "./Pages/Premium/PremiumPage";
import DocumentationIndex from "./Pages/Documentation/DocumentationIndex";
import BlogIndex from "./Blogs/BlogIndex";
import { BlogPosts } from "./Blogs/BlogPosts";
import BlogView from "./Blogs/BlogView";
import About from "./SitePages/About";
import PrivacyPolicy from "./SitePages/PrivacyPolicy";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ContactSupport from "./SitePages/ContactSupport";
import TermsAndConditions from "./SitePages/TermsAndConditions";
import WebsiteFeatures from "./SitePages/WebsiteFeatures";

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
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

      <div>
        {token ? (
          <Sidebar
            toggleSidebar={toggleSidebar}
            sidebarHide={sidebarHide}
            isActive={isActive}
          />
        ) : (
          <Navbar />
        )}

        <div
          className={`main-content transition-all duration-300 ${
            token ? `${isActive ? "ml-64" : "ml-16"}` : ""
          }`}
        >
          <Routes>
            <Route
              path="/"
              element={token ? <UserProfileIndex /> : <Landing />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/latexeditor/:projectid" element={<EditorIndex />} />
            <Route path="/user" element={<UserEdit />} />
            <Route path="/project/:projectid" element={<ProjectView />} />
            <Route path="/profile/:username" element={<UserProfileIndex />} />
            <Route path="/templates" element={<TemplatesIndex />} />
            
            {/*    Sitepage */}
            <Route path="/About" element={<About />} />
            <Route path="/Blog" element={<BlogIndex />} />
            <Route path="/Blog/:blogSlug" element={<BlogView />} />
            <Route path="/documentation" element={<DocumentationIndex />} />
            <Route path="/pricing" element={<PremiumPage />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<ContactSupport />} />
            <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
            <Route path="/features" element={<WebsiteFeatures />} />

            <Route path="/create/project" element={<CreateProject />} />
          </Routes>
        </div>
      </div>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
