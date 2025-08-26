import { useParams } from "react-router-dom";
import AuthorNotes from "../Notes/allNotes/AuthorNotes";
import { useEffect, useState } from "react";
import api from "../../api";
import Profile from "../UserView/Profile";

export default function UserProject() {
  const { authorId } = useParams(); // title state

  const [notes, setNotes] = useState([]); // title state
  const [author, setAuthor] = useState([]); // title state
  const [followersCount, setFollowersCount] = useState(0); // title state
  const [followingCount, setFollowingCount] = useState(0); // title state

 
  useEffect(() => {
    async function fetchData() {
      const res = await api.get(`/userdetails`);
      setNotes(res.data.notes);

      setFollowingCount(res.data.author.following?.length);
      setFollowersCount(res.data.author.followers?.length);

      setAuthor(res.data.author);
    }
    fetchData();
  }, []);
  return (
    <div className="px-16 ">
      <div className="flex mt-8">
        <div className="flex-1/4">
          {" "}
          <Profile author={author} followingCount={followingCount} followersCount={followersCount}/>
        </div>
        <div className="flex-3/4">
          <AuthorNotes notes={notes} author={author} />
        </div>
      </div>
    </div>
  );
}
