import { useState } from "react";
import Button from "../ui/Button/Button";
import { House, NotebookText, PencilLine, User } from "lucide-react";
import { Link,  useNavigate } from "react-router-dom";

export default function Sidebar({ toggleSidebar, sidebarHide, isActive }) {
    const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };
  return (
    <div
      className={`transition-all duration-300 z-10 flex flex-col items-center justify-between fixed top-0 left-0 h-screen ${sidebarHide} bg-gray-950 text-white p-4`}
    >
      <div className="flex flex-col space-y-8 items-center justify-center w-full text-gray-300">
        <h1 className="flex items-center space-x-2 text-base font-normal w-full mb-4 pb-4 border-b-2">
          <User />
          {isActive ? <span>Prashant Patil</span> : null}
        </h1>
        <Link
          to={`/home`}
          className="flex items-center space-x-2 text-base font-normal w-full"
        >
          <House size={24} /> {isActive ? <span>Home</span> : null}
        </Link>
        <Link
          to={`/newnote`}
          className="flex items-center space-x-2 text-base font-normal w-full"
        >
          <PencilLine size={24} /> {isActive ? <span>New Note</span> : null}
        </Link>
        <Link
          to={`/PrivateNotes`}
          className="flex items-center space-x-2 text-base font-normal w-full"
        >
          <NotebookText size={24} />
          {isActive ? <span>Your Notes</span> : null}
        </Link>
      </div>

      <div className=" w-full  space-y-2 text-gray-200">
        {isActive ? (
          <button className="text-md w-full text-left">Pricing</button>
        ) : null}
        {isActive ? (
          <button className="text-md w-full text-left">About</button>
        ) : null}
        {isActive ? (
          <button
            className="text-md w-full text-red-500 text-left"
            onClick={logout}
          >
            Log Out
          </button>
        ) : null}
        <Button onClick={toggleSidebar} className="w-full mt-8">
          X
        </Button>
      </div>
    </div>
  );
}
