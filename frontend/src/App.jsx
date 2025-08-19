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
import NewNote from "./Pages/Notes/Note/NewNote";
import NoteEditor from "./Pages/Notes/Note/NoteEditor";
import ShowNote from "./Pages/Notes/Note/ShowNote";
import PublicNotes from "./Pages/Notes/allNotes/PublicNotes";
import PrivateNotes from "./Pages/Notes/allNotes/PrivateNotes";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-text">
        <Navbar />
        <Sidebar />
        <Routes >
          <Route path="/" element={<Maintenance />} />
          <Route path="/main" element={<Main />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/NewNote" element={<NewNote />} />
          <Route path="/PublicNotes" element={<PublicNotes />} />
          <Route path="/PrivateNotes" element={<PrivateNotes />} />
          <Route path="/shownote" element={<ShowNote />} />
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
