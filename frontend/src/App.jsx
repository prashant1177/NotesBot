import "./App.css";
import React, { useState } from "react";
import Landing from "./Pages/Landing/Landing";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Pages/UserAuth/Login";
import Register from "./Pages/UserAuth/Register";
import { setAuthToken } from "./api";
import UserEdit from "./Pages/UserView/UserEdit";
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
import LatexWriterDocumentationIndex from "./Pages/Documentation/LatexWriterDocumentationIndex";
import { Footer } from "./components/Footer";
import LatexWriterDocumentationPageView from "./Pages/Documentation/LatexWriterDocumentationPageView";
import DownloadPage from "./Pages/Download/DownloadPage";
import SetPasswordForm from "./Pages/UserAuth/SetPasswordForm";
import SubCancel from "./Pages/UserView/SubCancel";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  const location = useLocation();
  const hiddenFooterPaths = [
    "/login",
    "/register",
  ];

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div>
        <Navbar token={token}/>

      
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={token ? <DownloadPage /> : <Register />} />
            <Route path="/login" element={token ? <DownloadPage /> : <Login />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/setpassword" element={<SetPasswordForm />} />
            <Route path="/user" element={<UserEdit />} />
            {/*   <Route path="/latexeditor/:projectid" element={<EditorIndex />} /> 
               <Route path="/project/:projectid" element={<ProjectView />} />
            <Route path="/profile/:username" element={<UserProfileIndex />} />
             <Route path="/templates" element={<TemplatesIndex />} />*/}

            {/*    Sitepage */}
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/cancel/premium" element={<SubCancel />} />
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
