import Button from "../ui/Button/Button";
import {
  ArrowLeftToLine,
  ArrowRightFromLine,
  BadgeInfo,
  FolderDot,
  House,
  Landmark,
  LogOut,
  NotebookText,
  PencilLine,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { setAuthToken } from "../api";

export default function Sidebar({ toggleSidebar, sidebarHide, isActive }) {
  const username = localStorage.getItem("username");
  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    window.location.href = "/";
  };
  const justify = isActive ? null : "justify-center";
  return (
    <div
      className={`transition-all duration-300 z-10 flex flex-col items-center justify-between fixed top-0 left-0 h-screen ${sidebarHide} bg-gray-950   p-4`}
    >
      <div className="flex flex-col space-y-8 items-center justify-center w-full text-gray-500 ">
        <Link to={`/user`}
          className={`flex items-center ${justify} gap-2 text-base font-normal w-full mb-4 pb-4 border-b-2 text-gray-300 border-gray-800`}
        >
          <User />
          {isActive ? <span>{username}</span> : null}
        </Link>
        <Link
          to={`/`}
          className={`flex items-center ${justify} gap-2 text-base font-normal w-full`}
        >
          <House size={24} /> {isActive ? <span>Home</span> : null}
        </Link>
         <Link
          to={`/projects`}
          className={`flex items-center ${justify} gap-2 text-base font-normal w-full`}
        >
          <FolderDot /> {isActive ? <span>Your project</span> : null}
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
        >
          <Landmark />
          {isActive ? <span>Pricing</span> : null}
        </Link>

        <Link
          to={`/About`}
          className={`flex items-center ${justify} gap-2 text-base font-normal w-full`}
        >
          <BadgeInfo />
          {isActive ? <span>About</span> : null}
        </Link>

        <button
          className={`flex items-center ${justify} gap-2 text-base font-normal w-full`}
          onClick={logout}
        >
          <LogOut />
          {isActive ? <span>Log Out</span> : null}
        </button>
      </div>

      <div className="w-full flex items-center justify-center">
        <button
          varient="sidebar"
          onClick={toggleSidebar}
          className="flex items-center justify-center"
        >
          {isActive ? (
            <div className="text-gray-500 flex gap-2 w-full items-center justify-center font-medium">
              {" "}
              <ArrowLeftToLine /> <span>Close</span>
            </div>
          ) : (
            <ArrowRightFromLine className="text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
}
