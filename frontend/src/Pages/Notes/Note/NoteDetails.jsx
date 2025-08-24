import { ThumbsUp, ThumbsDown, Eye, MoveLeft } from "lucide-react";
import {
  DetailsCard,
  DetailsCardAbout,
  DetailsCardHeader,
  DetailsCardTitle,
} from "../../../ui/Card/Card";
import Button from "../../../ui/Button/Button";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../../api";
import Reaction from "../components/Reaction";

export default function NoteDetails() {
  const { noteId } = useParams(); // 👈 here you get "id" from the URL
  const [note, setNote] = useState({});
  const [creater, setCreater] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("calling");
      const res = await api.get(`/note/${noteId}`);
      console.log(res.data.note);
      setCreater(res.data.note.createdBy);

      setNote(res.data.note);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full flex  flex-col items-center">
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
        <div className="w-full flex flex-col">
          <div className="flex flex-1 mt-4 justify-between">
            <div className="flex-1 pl-4">
              <h1 className="mb-2">About</h1>
              <DetailsCardAbout>{note.about}</DetailsCardAbout>
              <div className="mt-4">
                <h1>Reference</h1>
                <div className="list-decimal list-inside mt-2">
                  {note?.reference?.map((reference) => (
                    <li key={reference._id} className=" text-gray-500">
                     <a href={reference.link} target="_blank" className=" hover:underline"> {reference.title}</a>
                    </li>
                  ))}
                </div>
              </div>{" "}
            </div>
            <div className="flex-1 space-y-4 pl-4 border-l-1 border-gray-200">
              {" "}
              <div>
                <h1>Topics</h1>
                <div className="flex flex-wrap gap-2 my-2">
                <h1 className="px-2 text-blue-800 rounded-md border-1 border-blue-200  bg-blue-100 w-fit h-fit">
                  Engineering
                </h1>
                <h1 className="px-2 text-blue-800 rounded-md border-1 border-blue-200  bg-blue-100 w-fit h-fit">
                  Examples
                </h1>

                <h1 className="px-2 text-blue-800 rounded-md border-1 border-blue-200  bg-blue-100 w-fit h-fit">
                  Tobe Added
                </h1>
              </div>
              </div>{" "}
              <div>
                <h1>Owners</h1>
                <h1 className="text-gray-500">
                  <Link to={`/author/${creater._id}`}> {creater.fullname}</Link>{" "}
                </h1>{" "}
              </div>
              <div>
                <h1>Contributer</h1>
                <h1 className="text-gray-500">
                 Coming Soon in Version 2...
                </h1>{" "}
              </div>
            </div>
          </div>
          <div className="flex justify-between py-4 border-t-1 border-gray-100">
            <Link to={`/shownote/${note._id}`}>
              <Button
                varient="transparent"
                className="w-fit  flex gap-2 items-center"
              >
                <MoveLeft size={20} strokeWidth={1} />
                Go Back
              </Button>
            </Link>
            <Button varient="primary" className="w-fit">
              Edit Your Version
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
