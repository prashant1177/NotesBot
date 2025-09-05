import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../api";
import ProjectList from "./ProjectList";
export default function UserProfileIndex() {
  const { username } = useParams(); // 👈 here you get "id" from the URL
  const [projects, setprojects] = useState([]); // title state
  const [author, setAuthor] = useState([]); // title state
  const navigate = useNavigate();

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
    <div className="px-2 md:px-16 ">
      <div className="flex mt-4">
        <ProjectList projects={projects} author={author} />
      </div>
    </div>
  );
}
