import React, { useRef, useEffect } from "react";

const Toolbar = ({ toggleHeading, toggleBlockquote, exec, toggleList }) => {
  return (
    <div style={{ padding: "8px", borderBottom: "1px solid #ddd", display: "flex", gap: "8px" }}>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("bold"); }}>
        <b>B</b>
      </button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("italic"); }}>
        <i>I</i>
      </button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("underline"); }}>
        <u>U</u>
      </button>

      <button type="button" onMouseDown={(e) => { e.preventDefault(); toggleHeading("H1"); }}>
        H1
      </button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); toggleHeading("H2"); }}>
        H2
      </button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); toggleBlockquote(); }}>
        ❝
      </button>

      <button type="button" onMouseDown={(e) => { e.preventDefault(); toggleList("unordered"); }}>
        • List
      </button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); toggleList("ordered"); }}>
        1. List
      </button>

      <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("justifyLeft"); }}>
        ⯇
      </button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("justifyCenter"); }}>
        ≡
      </button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("justifyRight"); }}>
        ⯈
      </button>
    </div>
  );
};

const NoteEditor = () => {
  const editorRef = useRef(null);
  const savedRangeRef = useRef(null);

  // ---- Selection helpers ----
  const saveSelectionIfInside = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
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
    return () => document.removeEventListener("selectionchange", onSelectionChange);
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
    <div style={{ width: "100%", minHeight: "100vh", background: "#f9f9f9", color: "#111" }}>
      <Toolbar
        exec={exec}
        toggleHeading={toggleHeading}
        toggleBlockquote={toggleBlockquote}
        toggleList={toggleList}
      />
      <div
  ref={editorRef}
  contentEditable
  suppressContentEditableWarning
  className="editor p-6 outline-none min-h-[80vh] cursor-text"
>
  <p>Click anywhere and start typing like Notion ✨</p>
</div>
    </div>
  );
};

export default NoteEditor;
