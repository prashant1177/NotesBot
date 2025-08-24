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
  // ---- Selection helpers ----
  const saveSelectionIfInside = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    if (
      editorRef.current &&
      editorRef.current.contains(range.commonAncestorContainer)
    ) {
      savedRangeRef.current = range;
    }
  };

  const saveNote = () => {
    alert("Save Notes");
    console.log("Save Notes");
  };

  const deleteNote = async () => {
    alert("Delete Notes");
    await api.delete(`/note/${noteId}`);
    navigate(`/`);
    console.log("Delete Notes");
  };
  const viewNote = () => {
    navigate(`/shownote/${noteId}`);
  };

  const detailsNote = () => {
    navigate(`/details/${noteId}`);
  };
  const restoreSelection = () => {
    const sel = window.getSelection();
    const range = savedRangeRef.current;
    if (sel && range) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
    editorRef.current && editorRef.current.focus();
  };

  useEffect(() => {
    const onSelectionChange = () => saveSelectionIfInside();
    document.addEventListener("selectionchange", onSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", onSelectionChange);
  }, []);

  // ---- Exec helpers ----
  const exec = (command, value = null) => {
    restoreSelection();
    document.execCommand(command, false, value);
    saveSelectionIfInside();
  };

  // More robust formatBlock that works across browsers
  const formatBlock = (tag) => {
    restoreSelection();
    // Try without angle brackets first
    document.execCommand("formatBlock", false, tag);
    // Some engines only accept with angle brackets
    document.execCommand("formatBlock", false, `<${tag.toLowerCase()}>`);
    saveSelectionIfInside();
  };

  // Get current block tag (P, DIV, H1, H2, BLOCKQUOTE, etc.)
  const getCurrentBlockTag = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    const range = sel.getRangeAt(0);
    let node = range.startContainer;
    if (node.nodeType === 3) node = node.parentNode; // text → element

    // climb until direct child of editor or the editor itself
    while (node && node !== editorRef.current) {
      if (node.parentNode === editorRef.current) break;
      node = node.parentNode;
    }
    if (!node || node === editorRef.current) return null;
    return node.tagName || null;
  };

  // Toggle helpers
  const toggleHeading = (level /* "H1" | "H2" */) => {
    const current = getCurrentBlockTag();
    if (current === level) {
      formatBlock("P"); // toggle back to paragraph
    } else {
      formatBlock(level);
    }
  };

  const toggleBlockquote = () => {
    const current = getCurrentBlockTag();
    if (current === "BLOCKQUOTE") {
      formatBlock("P");
    } else {
      formatBlock("BLOCKQUOTE");
    }
  };

  const toggleList = (kind /* "ordered" | "unordered" */) => {
    if (kind === "ordered") exec("insertOrderedList");
    else exec("insertUnorderedList");
  };

  // Add new empty block when clicking blank space in the editor container
  useEffect(() => {
    const handleClick = (e) => {
      if (editorRef.current && e.target === editorRef.current) {
        const p = document.createElement("p");
        p.innerHTML = "<br/>";
        editorRef.current.appendChild(p);

        const range = document.createRange();
        range.setStart(p, 0);
        range.collapse(true);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        editorRef.current.focus();
        saveSelectionIfInside();
      }
    };

    const container = editorRef.current;
    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center relative">
      <Toolbar
        exec={exec}
        toggleHeading={toggleHeading}
        toggleBlockquote={toggleBlockquote}
        toggleList={toggleList}
        deleteNote={deleteNote}
        detailsNote={detailsNote}
        viewNote={viewNote}
        saveNote={saveNote}
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
