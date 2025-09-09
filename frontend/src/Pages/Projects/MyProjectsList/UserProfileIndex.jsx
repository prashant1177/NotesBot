import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../api";
import ProjectList from "./ProjectList";
import { LibraryBig } from "lucide-react";
import { NoteCard, NoteCardHeader } from "../../../ui/Card/Card";
export default function UserProfileIndex() {
  const { username } = useParams();
  const [projects, setprojects] = useState([]);
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/profile/${username}`);
        setprojects(res.data.projects);
        setAuthor(res.data.author);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [username]);

  return (
    <div className="min-h-screen w-full">
      <div
        className="sticky top-0 flex justify-between md:px-8 backdrop-blur-md border-b border-gray-500/20  p-4
    "
      >
        <h1 className="text-gray-800 text-xl font-medium flex items-center gap-2 py-2 uppercase">
          {" "}
          <LibraryBig className="text-gray-700" />
          PROJECTS BY {username}
        </h1>
      </div>

      <div className="px-2 md:px-16 ">
        {" "}
        <div className="flex flex-col mt-8">
          {author ? (
            <ProjectList projects={projects} />
          ) : (
            <NoteCard className="bg-gray-100 animate-pulse text-gray-500 mt-8">
              <NoteCardHeader>
                <h1 className="text-center w-full">Loading you content... </h1>
              </NoteCardHeader>
            </NoteCard>
          )}
        </div>
      </div>
    </div>
  );
}
