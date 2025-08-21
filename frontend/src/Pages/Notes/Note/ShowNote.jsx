import { ThumbsUp, ThumbsDown, Eye } from "lucide-react";
import {
  DetailsCard,
  DetailsCardAbout,
  DetailsCardHeader,
  DetailsCardTitle,
  NoteCardStats,
} from "../../../ui/Card/Card";
import Button from "../../../ui/Button/Button";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../../api";

export default function ShowNote() {
  const { noteId } = useParams(); // 👈 here you get "id" from the URL
  const [note, setNote] = useState({});

  useEffect(() => {
    async function fetchData() {
      console.log("calling");
      const res = await api.get(`/note/${noteId}`);
      console.log(res.data.note);

      setNote(res.data.note);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center relative">
      <div className="w-3/5 transition-colors text-gray-800 duration-500 ease-in-out p-6">
        
        <div className="border-b-2 border-gray-100
hover:border-gray-200 focus:border-gray-400  outline-none w-full transition-colors duration-200">
        <h1
          className="text-3xl font-bold pb-3     "
        >
          {" "}
          {note.title}
        </h1>
        <div className="flex min-h-12 justify-between">
          {" "}
          <h1>Created By </h1>
          <div className="flex h-full gap-4">
            
          <span className="text-gray-500 flex items-center gap-2">
            {" "}
            <Eye size={16} strokeWidth={1} /> {note.views}
          </span>{" "}
            <span className="text-gray-500 flex items-center gap-2">
              {" "}
              <ThumbsUp size={16} strokeWidth={1} /> {note.like}
            </span>
            <span className="text-gray-500 flex items-center gap-2">
              {" "}
              <ThumbsDown size={16} strokeWidth={1} />
              {note.dislike}
            </span>
          </div>
        </div></div>
        <div
          className="editor outline-none min-h-screen cursor-text mt-4"
          dangerouslySetInnerHTML={{ __html: note.content }} // 👈 load saved content
        ></div>
      </div>
    </div>
  );
}
