import {
  ThumbsUp,
  ThumbsDown,
  Eye,
  CircleEllipsis,
  SquarePlus,
  FilePenLine,
  SquareMinus,
  BookMarked,
  Info,
} from "lucide-react";
import {
  DetailsCard,
  DetailsCardAbout,
  DetailsCardHeader,
  DetailsCardTitle,
  NoteCardStats,
} from "../../../ui/Card/Card";
import Button from "../../../ui/Button/Button";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../../api";
import Reaction from "../components/Reaction";

export default function ShowNote() {
  const { noteId } = useParams(); // 👈 here you get "id" from the URL
  const [note, setNote] = useState({});
  const [creater, setCreater] = useState([]);
  const [more, setMore] = useState(false);
  const [allowEdit, setAllowEdit] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await api.get(`/note/${noteId}`);
      setNote(res.data.note);
      setCreater(res.data.createdBy);
      setAllowEdit(res.data.allowEdit);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center relative">
      <div className="w-3/5 transition-colors text-gray-800 duration-500 ease-in-out p-6">
        <div
          className="border-b-2 border-gray-100
hover:border-gray-200 focus:border-gray-400  outline-none w-full transition-colors duration-200"
        >
          <h1 className="text-3xl font-bold pb-3     "> {note.title}</h1>
          <div className="flex items-center min-h-12 justify-between">
            <h1>
              Created By
              <Link to={`/author/${creater._id}`}>
                {" "}
                {creater.username}
              </Link>{" "}
            </h1>
            <Reaction note={note} />
          </div>
        </div>
        <div
          className="editor outline-none min-h-screen cursor-text mt-4"
          dangerouslySetInnerHTML={{ __html: note.content }} // 👈 load saved content
        ></div>
      </div>
      <div className="flex flex-col items-center gap-4  p-4  h-fit w-16 text-gray-500 sticky top-0">
        {" "}
        <button
          onClick={() => setMore((prev) => !prev)}
          className="text-gray-500 flex items-center gap-2"
        >
          {more ? (
            <SquareMinus size={24} strokeWidth={1} />
          ) : (
            <SquarePlus size={24} strokeWidth={1} />
          )}
        </button>
        {more ? (
          <>
            {allowEdit ? (
              <Link to={`/editor/${noteId}`}>
                {" "}
                <FilePenLine size={24} strokeWidth={1} />
              </Link>
            ) : null}
            <Link to={`/reference/${noteId}`}>
              <BookMarked strokeWidth={1} />
            </Link>
            <Link to={`/details/${noteId}`}>
              <Info strokeWidth={1} />
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}
