import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Info,
  Italic,
  List,
  ListOrdered,
  Quote,
  Save,
  Trash2,
  Underline,
  View,
} from "lucide-react";
import { useEffect } from "react";
import api from "../../../api";

const Toolbar = ({ editorRef, savedRangeRef, actionsSection, noteId, saveNote, deleteNote, viewNote, detailsNote }) => {
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

  return (
    <div
      id="toolbar"
      className="flex flex-col items-center justify-between py-4 h-screen bg-gray-50 text-gray-600 border-r-1 border-gray-200 sticky top-0"
    >
      {/* Text styles */}
      <div className="flex flex-col items-center justify-center w-full">
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("bold");
          }}
        >
          <Bold strokeWidth={1} size={20} />
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("italic");
          }}
        >
          <Italic strokeWidth={1} size={20} />
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("underline");
          }}
        >
          <Underline strokeWidth={1} size={20} />
        </button>
        <div className="w-6 border-b border-gray-600 my-2"></div>
        {/* Headings */}
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleHeading("H1");
          }}
        >
          <Heading1 strokeWidth={1} size={20} />
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleHeading("H2");
          }}
        >
          <Heading2 strokeWidth={1} size={20} />
        </button>
        <div className="w-6 border-b border-gray-600 my-2"></div>
        {/* Lists */}
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleList("unordered");
          }}
        >
          <List strokeWidth={1} size={20} />
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleList("ordered");
          }}
        >
          <ListOrdered strokeWidth={1} size={20} />
        </button>
        <div className="w-6 border-b border-gray-600 my-2"></div>
        {/* Alignments */}
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("justifyLeft");
          }}
        >
          <AlignLeft strokeWidth={1} size={20} />
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("justifyCenter");
          }}
        >
          <AlignCenter strokeWidth={1} size={20} />
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("justifyRight");
          }}
        >
          <AlignRight strokeWidth={1} size={20} />
        </button>
        <div className="w-6 border-b border-gray-600 my-2"></div>
        {/* Blockquote */}
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockquote();
          }}
        >
          <Quote strokeWidth={1} size={20} />
        </button>
      </div>
      {actionsSection && (
        <div className="flex flex-col items-center justify-center">
          <button
            type="button"
            className=" hover:text-blue-500 hover:bg-gray-100 w-full p-2 "
            onMouseDown={(e) => {
              e.preventDefault();
              saveNote();
            }}
          >
            <Save strokeWidth={1} size={20} />
          </button>
          <button
            type="button"
            className="hover:text-blue-500 hover:bg-gray-100  w-full p-2 "
            onMouseDown={(e) => {
              e.preventDefault();
              detailsNote();
            }}
          >
            <Info strokeWidth={1} size={20} />
          </button>
          <button
            type="button"
            className="hover:text-blue-500 hover:bg-gray-100  w-full p-2 "
            onMouseDown={(e) => {
              e.preventDefault();
              viewNote();
            }}
          >
            <View strokeWidth={1} size={20} />
          </button>
          <button
            type="button"
            className=" hover:text-red-500 hover:bg-gray-100  w-full p-2 "
            onMouseDown={(e) => {
              e.preventDefault();
              deleteNote();
            }}
          >
            <Trash2 strokeWidth={1} size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
