import { useRef, useEffect, useState } from "react";
import api from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import Toolbar from "./Toolbar";
import Input from "../../../ui/Input/Input";

const NoteEditor = () => {
  const { noteId } = useParams(); // 👈 here you get "id" from the URL
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const savedRangeRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/editor/${noteId}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        navigate(`/shownote/${noteId}`);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.put(`/editor/${noteId}`, {
          title,
          content: editorRef.current.innerHTML,
        });
      } catch (err) {
        console.error("Failed to update note:", err);
      }
    };

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, [noteId, title, editorRef]);

  const saveNote = async () => {
    try {
      await api.put(`/editor/${noteId}`, {
        title,
        content: editorRef.current.innerHTML,
      });
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };

  const deleteNote = async () => {
    try {
      await api.delete(`/note/${noteId}`);
    } catch (err) {
      alert(err);
    }
    navigate(`/`);
  };
   const viewNote = () => {
    navigate(`/shownote/${noteId}`);
  };

  const detailsNote = () => {
    navigate(`/details/${noteId}`);
  };
  return (
    <div className="min-h-screen w-full flex justify-center relative">
      <Toolbar
        editorRef={editorRef}
        savedRangeRef={savedRangeRef}
        actionsSection
        noteId={noteId}
        deleteNote={deleteNote}
        saveNote={saveNote}
        viewNote={viewNote}
        detailsNote={detailsNote}
      />
      <div className="w-3/5 transition-colors text-gray-800 duration-500 ease-in-out p-6">
        <Input
          type="text"
          value={title}
          maxLength={70}
          onChange={(e) => setTitle(e.target.value)}
          varient="titleEditor"
        />
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="editor outline-none min-h-screen cursor-text"
          dangerouslySetInnerHTML={{ __html: content }} // 👈 load saved content
        ></div>
      </div>
    </div>
  );
};

export default NoteEditor;
