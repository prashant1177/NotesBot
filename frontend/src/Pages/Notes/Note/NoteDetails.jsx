import { ThumbsUp, ThumbsDown } from "lucide-react";
import {
  DetailsCard,
  DetailsCardAbout,
  DetailsCardHeader,
  DetailsCardTitle,
} from "../../../ui/Card/Card";
import Button from "../../../ui/Button/Button";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../../api";

export default function NoteDetails() {
  const { noteId } = useParams(); // 👈 here you get "id" from the URL
  const [note, setNote] = useState( {});

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
    <div className="h-screen w-full flex  flex-col items-center justify-center ">
      <div className="w-4/6 border-2 border-gray-200 p-6 flex ">
        <DetailsCard className="flex-1">
          <DetailsCardHeader>
            <DetailsCardTitle>{note.title}</DetailsCardTitle>
            <DetailsCardAbout>{note.about}</DetailsCardAbout>
          </DetailsCardHeader>
          <div>
            <div className="flex items-center gap-4 h-16">
              <ThumbsUp size={16} />
              {note.like}
              <ThumbsDown size={16} />
              {note.dislike}
              <h1>from {note.views} Views</h1>
            </div>
          </div>
        </DetailsCard>
        <div className="flex-1 pl-4 border-l-2 border-gray-200">
          <div>
            <h1>Owner</h1>
            <div className="h-16"></div>
          </div>

          <div>
            <h1>Contributer</h1>
            <div className="h-16"></div>
          </div>
        </div>
      </div>
      <Button varient="muted" className="mt-8">
        Edit Your Version
      </Button>
    </div>
  );
}
