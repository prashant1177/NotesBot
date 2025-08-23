import { useParams } from "react-router-dom";
import AuthorNotes from "../Notes/allNotes/AuthorNotes";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import api from "../../api";
import ProfileSide from "./ProfileSide";

export default function UserView() {
  const { authorId } = useParams(); // title state

  const [notes, setNotes] = useState([]); // title state
  const [author, setAuthor] = useState([]); // title state
  useEffect(() => {
    async function fetchData() {
      const res = await api.get(`/AuthorNotes/${authorId}`);
      console.log(res.data.notes);
      setNotes(res.data.notes);
      setAuthor(res.data.author);
      console.log(author);
    }
    fetchData();
  }, []);
  return (
    <div className="px-16 ">
      <div className="flex mt-8">
        
        <div className="flex-1/4">
          {" "}
          <Profile  author={author}/>
        </div>
        <div className="flex-3/4">
          <AuthorNotes notes={notes} author={author} />
        </div>
      </div>
    </div>
  );
}
