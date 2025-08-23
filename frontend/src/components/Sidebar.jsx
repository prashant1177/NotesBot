import { useState } from "react";
import Button from "../ui/Button/Button";
import { BadgeInfo, BadgePercent, House, Landmark, LogOut, NotebookText, PencilLine, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../api";

export default function Sidebar({ toggleSidebar, sidebarHide, isActive }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    window.location.href = "/";
  };
  const justify = isActive ?  null: "justify-center" ;
  return (
    <div
      className={`transition-all duration-300 z-10 flex flex-col items-center justify-between fixed top-0 left-0 h-screen ${sidebarHide} bg-gray-950   p-4`}
    >
      <div className="flex flex-col space-y-8 items-center justify-center w-full text-gray-500 ">
        <h1 className={`flex items-center ${justify} gap-2 text-base font-normal w-full mb-4 pb-4 border-b-2 text-gray-300 border-gray-800`}>
          <User />
          {isActive ? <span>{username}</span> : null}
        </h1>
        <Link
          to={`/`}
          className={`flex items-center ${justify} gap-2 text-base font-normal w-full`}
        >
          <House size={24} /> {isActive ? <span>Home</span> : null}
        </Link>
        <Link
          to={`/newnote`}
          className={`flex items-center ${justify} gap-2 text-base font-normal w-full`}
        >
          <PencilLine size={24} /> {isActive ? <span>New Note</span> : null}
        </Link>
        <Link
          to={`/PrivateNotes`}
          className={`flex items-center ${justify} gap-2 text-base font-normal w-full`}
        >
          <NotebookText size={24} />
          {isActive ? <span>Your Notes</span> : null}
        </Link>
        <Link
          to={`/Pricing`}
          className={`flex items-center ${justify} gap-2 text-base font-normal w-full`}
        ><Landmark />
          {isActive ? (
            <span>Pricing</span>
          ) : null}
        </Link>

        <Link
          to={`/About`}
          className={`flex items-center ${justify} gap-2 text-base font-normal w-full`}
        ><BadgeInfo />
          {isActive ? (
            <span>About</span>
          ) : null}
        </Link>

        <button
          className={`flex items-center ${justify} gap-2 text-base font-normal w-full`}
          onClick={logout}
        ><LogOut />
          {isActive ? <span>Log Out</span> : null}
        </button>
      </div>

      <div className=" flex flex-col items-center justify-center w-full  space-y-8 text-gray-200">

        <Button onClick={toggleSidebar} className="w-full mt-8">
          X
        </Button>
      </div>
    </div>
  );
}
