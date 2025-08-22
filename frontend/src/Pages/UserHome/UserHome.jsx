import Sidebar from "../../components/Sidebar";
import PrivateNotes from "../Notes/allNotes/PrivateNotes";
import PublicNotes from "../Notes/allNotes/PublicNotes";

export default function UserHome() {
  return (
    <div className="flex flex-col items-center w-full p-4">
     <PublicNotes/>
    </div>
  );
}