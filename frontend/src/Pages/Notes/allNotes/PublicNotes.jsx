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
import { Eye, Heart, LibraryBig, Search } from "lucide-react";
import Button from "../../../ui/Button/Button";

export default function PublicNotes() {
  const [topicsRes, setTopicsRes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch notes
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/PublicNotes");
      setNotes(res.data.notes);
      setTopicsRes(res.data.topicsRes);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSorting = async (sort) => {
    handleSearch(sort);
  };
  const handleSearch = async (sort) => {
    try {
      const res = await api.get("/searchnotes", {
        params: {
          search: searchTerm,
          sort: sort,
        },
      });
      setNotes(res.data.notes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-8 flex w-full px-16">
      <div className="flex-3/4 flex flex-col w-full px-8">
        <div className="text-3xl font-bold text-gray-900 mb-6">
          <h1 className="flex text-gray-900 mb-4 items-center gap-2 text-lg">
            <LibraryBig strokeWidth={1} size={20} /> Published Drafts
          </h1>
        </div>
        <div className="flex flex-col gap-8">
          {notes.map((note) => (
            <NoteCard key={note._id}>
              <NoteCardHeader className="overflow-hidden flex-9/12">
                <Link to={`/shownote/${note._id}`}>
                  <NoteCardTitle>{note.title}</NoteCardTitle>
                </Link>
                <NoteCardAbout>{note.about}</NoteCardAbout>
              </NoteCardHeader>
              <NoteCardStats className="flex flex-col items-end justify-baseline p-6 space-y-2 w-full flex-3/12">
                <span className="text-gray-500 flex items-center gap-2">
                  <Eye size={16} strokeWidth={2} /> {note.views}
                </span>
                <span className="text-gray-500 flex items-center gap-2">
                  <Heart size={16} strokeWidth={2} /> {note.like.length}
                </span>
              </NoteCardStats>
            </NoteCard>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex-1/4">
        <div className="w-full p-4">
          <div className="flex flex-col">
            {/* Search */}
            <div className="flex items-center justify-between rounded-lg w-full bg-gray-50 text-gray-700 hover:bg-gray-100 focus:ring-gray-500">
              <input
                placeholder="Search Anything..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full focus:outline-none focus:ring-0 p-2.5"
              />
              <Button varient="transparent" onClick={handleSearch}>
                <Search size={20} strokeWidth={1} />
              </Button>
            </div>

            {/* Sort Options */}
            <div className="border-b-1 border-gray-300 py-4">
              <h1 className="text-lg text-gray-900">Sort By</h1>
              <div className="flex flex-col gap-1 mt-2">
                <h1
                  className="text-gray-500 cursor-pointer hover:underline"
                  onClick={() => handleSorting("views")}
                >
                  Most Viewed
                </h1>
                <h1
                  className="text-gray-500 cursor-pointer hover:underline"
                  onClick={() => handleSorting("recent")}
                >
                  Most Recent
                </h1>
              </div>
            </div>

            {/* Topics */}
            <div>
              <h1 className="text-lg my-4">Topics</h1>
              <div className="flex flex-wrap gap-2">
                {topicsRes.map((topic, i) => (
                  <h1
                    key={i}
                    className="px-2 text-blue-800 rounded-md border-1 border-blue-200 bg-blue-100 w-fit h-fit"
                  >
                    {topic}
                  </h1>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
