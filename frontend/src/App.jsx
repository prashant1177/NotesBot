import "./App.css";
import React, { useState } from "react";
import Landing from "./Pages/Landing/Landing";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Pages/UserAuth/Login";
import Register from "./Pages/UserAuth/Register";
import Sidebar from "./components/Sidebar";
import { setAuthToken } from "./api";
import UserEdit from "./Pages/UserView/UserEdit";
import ProjectView from "./Pages/Projects/ProjectView/ProjectView";
import CreateProject from "./Pages/Projects/CreateProject";
import UserProfileIndex from "./Pages/Projects/MyProjectsList/UserProfileIndex";
import TemplatesIndex from "./Pages/Templates/TemplatesIndex";
import PremiumPage from "./Pages/Premium/PremiumPage";
import LatexDocumentationIndex from "./Pages/Documentation/LatexDocumentationIndex";
import BlogIndex from "./Blogs/BlogIndex";
import BlogView from "./Blogs/BlogView";
import About from "./SitePages/About";
import PrivacyPolicy from "./SitePages/PrivacyPolicy";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ContactSupport from "./SitePages/ContactSupport";
import TermsAndConditions from "./SitePages/TermsAndConditions";
import WebsiteFeatures from "./SitePages/WebsiteFeatures";
import MyProfileIndex from "./Pages/Projects/MyProjectsList/MyProfileIndex";
import LatexWriterDocumentationIndex from "./Pages/Documentation/LatexWriterDocumentationIndex";
import { Footer } from "./components/Footer";
import LatexWriterDocumentationPageView from "./Pages/Documentation/LatexWriterDocumentationPageView";
import DownloadPage from "./Pages/Download/DownloadPage";
import SetPasswordForm from "./Pages/UserAuth/SetPasswordForm";

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
  const location = useLocation();
  const hiddenFooterPaths = [
    "/latexeditor",
    "/login",
    "/create/project",
    "/register",
  ];

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div>
        <Navbar token={token}/>

      
          <Routes>
            <Route path="/" element={token ? <DownloadPage /> : <Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<UserEdit />} />
            {/*   <Route path="/latexeditor/:projectid" element={<EditorIndex />} /> 
               <Route path="/project/:projectid" element={<ProjectView />} />
            <Route path="/profile/:username" element={<UserProfileIndex />} />
             <Route path="/templates" element={<TemplatesIndex />} />*/}

            {/*    Sitepage */}
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/About" element={<About />} />
            <Route path="/Blog" element={<BlogIndex />} />
            <Route path="/Blog/:blogSlug" element={<BlogView />} />
            <Route
              path="/documentation/latex"
              element={<LatexDocumentationIndex />}
            />
            <Route
              path="/documentation/latexwriter"
              element={<LatexWriterDocumentationIndex />}
            />
            <Route
              path="/documentation/latexwriter/:slug"
              element={<LatexWriterDocumentationPageView />}
            />
            <Route path="/pricing" element={<PremiumPage />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<ContactSupport />} />
            <Route
              path="/TermsAndConditions"
              element={<TermsAndConditions />}
            />
            <Route path="/features" element={<WebsiteFeatures />} />

            {/*   <Route path="/create/project" element={<CreateProject />} /> */}
          </Routes>

          {!hiddenFooterPaths.some((path) =>
            location.pathname.startsWith(path)
          ) && <Footer />}
        </div>
    </GoogleOAuthProvider>
  );
}

export default App;
