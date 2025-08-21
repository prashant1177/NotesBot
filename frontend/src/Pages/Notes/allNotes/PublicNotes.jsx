import { useEffect, useState } from "react";
import {
  NoteCard,
  NoteCardAbout,
  NoteCardHeader,
  NoteCardStats,
  NoteCardTitle,
} from "../../../ui/Card/Card";
import api from "../../../api";
import { Link } from "react-router-dom";
import { Eye,ThumbsDown,ThumbsUp } from "lucide-react";

export default function PublicNotes() {
  const [notes, setNotes] = useState([]); // title state
  useEffect(() => {
    async function fetchData() {
      const res = await api.get(`/PublicNotes`);
      console.log(res.data.notes);
      setNotes(res.data.notes);
    }
    fetchData();
  }, []);
  return (
    <div className="mt-8 flex flex-col w-full px-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Trending Notes
        </h1>
    <div className="flex flex-col  gap-8">
      {notes.map((note) => (
        <NoteCard key={note._id}>
          <NoteCardHeader className="overflow-hidden flex-9/12">
        <Link to={`/shownote/${note._id}`}>  <NoteCardTitle>{note.title}</NoteCardTitle></Link>
            <NoteCardAbout>{note.about}</NoteCardAbout>
          </NoteCardHeader>
          <NoteCardStats className="flex flex-col items-end justify-baseline p-6 space-y-2 w-full flex-3/12">
          <span className="text-gray-500 flex items-center gap-2"> <Eye size={16} strokeWidth={1} /> {note.views}</span>
          <span className="text-gray-500 flex items-center gap-2"> <ThumbsUp size={16} strokeWidth={1} /> {note.like}</span>
          <span className="text-gray-500 flex items-center gap-2"> <ThumbsDown size={16} strokeWidth={1} />{note.dislike}</span>
          </NoteCardStats>
        </NoteCard>
      ))}
    </div></div>
  );
}
