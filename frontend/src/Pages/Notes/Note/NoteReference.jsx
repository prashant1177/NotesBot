import { useRef, useEffect, useState } from "react";
import api from "../../../api";
import { useParams, Link, useNavigate } from "react-router-dom";
import Reaction from "../components/Reaction";
import Toolbar from "./Toolbar";
import {
  NoteCard,
  NoteCardAbout,
  NoteCardHeader,
  NoteCardTitle,
} from "../../../ui/Card/Card";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";

export default function NoteReference() {
  const { noteId } = useParams(); // 👈 here you get "id" from the URL

  const navigate = useNavigate();
  const [note, setNote] = useState({});
  const [creater, setCreater] = useState([]);
  const [references, setReferences] = useState([]);
  const [newReference, setNewReference] = useState({
    title: "",
    details: "",
    link: "",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/reference/${noteId}`);
        setNote(res.data.note);
        setReferences(res.data.note.reference);
        setCreater(res.data.note.createdBy);
      } catch (error) {
        navigate(`/shownote/${noteId}`);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      await api.put(`/reference/${noteId}`, {
        reference: newReference,
      });
    } catch (err) {
      console.error("Failed to update note reference:", err);
    }
  };

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
        {references?.map((reference) => (
          <NoteCard key={reference._id}>
            <NoteCardHeader className="overflow-hidden">
              {" "}
              <NoteCardTitle>{reference.title}</NoteCardTitle>
              <NoteCardAbout>{reference.details}</NoteCardAbout>
            </NoteCardHeader>
          </NoteCard>
        ))}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-50 p-4 rounded-b-xl"
        >
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Add Reference Title"
              required
              onChange={(e) =>
                setNewReference({ ...newReference, title: e.target.value })
              }
              className="border-2 border-gray-200 "
            />
          </div>

          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Add Reference details"
              required
              onChange={(e) =>
                setNewReference({ ...newReference, details: e.target.value })
              }
              className="border-2 border-gray-200 "
            />
          </div>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Add Reference Link"
              required
              onChange={(e) =>
                setNewReference({ ...newReference, link: e.target.value })
              }
              className="border-2 border-gray-200 "
            />
          </div>
          <div className="w-full flex justify-center">
            <Button type="submit">Add New</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
