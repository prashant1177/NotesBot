import { useEffect, useState } from "react";
import api from "../../../api";
import ProjectList from "./ProjectList";
import { LibraryBig, PencilLine } from "lucide-react";
import { Link } from "react-router-dom";

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
      <div className="sticky top-0 flex justify-between md:px-8 backdrop-blur-md border-b border-border/20 p-4
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
            <ProjectList projects={projects} author={author} />
          ) : (
            <div className="flex flex-col items-center justify-center my-8">
              <div class="animate-pulse flex flex-col items-center gap-4 w-60">
                <div>
                  <div class="w-48 h-6 bg-gray-400 rounded-md"></div>
                  <div class="w-28 h-4 bg-gray-400 mx-auto mt-3 rounded-md"></div>
                </div>
                <div class="h-7 bg-gray-400 w-full rounded-md"></div>
                <div class="h-7 bg-gray-400 w-full rounded-md"></div>
                <div class="h-7 bg-gray-400 w-full rounded-md"></div>
                <div class="h-7 bg-gray-400 w-1/2 rounded-md"></div>
              </div>{" "}
            </div>
          )}
        </div>{" "}
      </div>
    </div>
  );
}
