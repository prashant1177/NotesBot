import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../api";
import ProjectList from "./ProjectList";
import Profile from "./Profile";

export default function UserProfileIndex() {
  const { username } = useParams(); // 👈 here you get "id" from the URL
  const [projects, setprojects] = useState([]); // title state
  const [author, setAuthor] = useState([]); // title state
  const [followersCount, setFollowersCount] = useState(0); // title state
  const [followingCount, setFollowingCount] = useState(0); // title state
    const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/profile/${username}`);
        setprojects(res.data.projects);
        setFollowingCount(res.data.author.following?.length);
        setFollowersCount(res.data.author.followers?.length);

        setAuthor(res.data.author);
      } catch (err) {
        alert(err.response.data.error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="px-16 ">
      <div className="flex mt-8">
        <div className="flex-1/4">
          {" "}
          <Profile
            author={author}
            followingCount={followingCount}
            followersCount={followersCount}
          />
        </div>
        <div className="flex-3/4">
          <ProjectList projects={projects} author={author} />
        </div>
      </div>
    </div>
  );
}
