import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Recent from "./components/Recent";

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-purple-100 to-white min-h-screen">
        {" "}
        <Main />
        <Recent />
      </div>
    </>
  );
}

export default App;
