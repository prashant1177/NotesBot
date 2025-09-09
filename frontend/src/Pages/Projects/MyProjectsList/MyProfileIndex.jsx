import { useEffect, useState } from "react";
import api from "../../../api";
import ProjectList from "./ProjectList";
import { LibraryBig, PencilLine } from "lucide-react";
import { Link } from "react-router-dom";
import { NoteCard, NoteCardHeader } from "../../../ui/Card/Card";

export default function MyProfileIndex() {
  const [projects, setprojects] = useState([]);
  const [author, setAuthor] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/profile/user`);
        setprojects(res.data.projects);
        setAuthor(res.data.author);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="sticky top-0 flex justify-between md:px-8 backdrop-blur-md border-b border-gray-500/20 p-4
">
        <h1 className="text-gray-800 text-xl font-medium flex items-center gap-2 ">
          {" "}
          <LibraryBig className="text-gray-700" />
          YOUR PROJECTS
        </h1>
        <Link
          to={`/create/project`}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-900 text-gray-50 hover:bg-gray-700 focus:ring-gray-500"
        >
          <PencilLine className="w-4 h-4" /> Create New Project
        </Link>{" "}
      </div>

      <div className="px-2 md:px-16 ">
        {" "}
        <div className="flex flex-col mt-4">
          {author ? (
            <ProjectList projects={projects} />
          ) : (
            
      <NoteCard className="bg-gray-50 animate-pulse text-gray-500 mt-8">
        <NoteCardHeader>
          <h1 className="text-center w-full">Loading you content...</h1>
        </NoteCardHeader>
      </NoteCard>
          )}
        </div>{" "}
      </div>
    </div>
  );
}
