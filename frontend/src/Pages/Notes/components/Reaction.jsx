import { Eye, Heart, ThumbsDown } from "lucide-react";
import api from "../../../api";
import { useState, useEffect } from "react";

export default function Reaction({ note }) {
  const [likes, setLikes] = useState(null);
  const [likesState, setLikesState] = useState(null);
  const handleLike = async () => {
    const res = await api.put(`/like/${note._id}`);
    setLikes(res.data.like);
  };

  return (
    <div className="flex items-center h-full gap-4">
      <span className="text-gray-500 flex items-center gap-2">
        {" "}
        <Eye size={16} strokeWidth={2} /> {note.views}
      </span>{" "}
      <button
        onClick={handleLike}
        className="text-gray-500 flex items-center gap-2"
      >
        {" "}
        <Heart size={16} strokeWidth={2} className="text-red-500"/> {likes ? likes : note.like}
      </button>
    </div>
  );
}
