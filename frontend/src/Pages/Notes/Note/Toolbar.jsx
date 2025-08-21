import { AlignCenter, AlignLeft, AlignRight, List, ListOrdered, Quote } from "lucide-react";

const Toolbar = ({ toggleHeading, toggleBlockquote, exec, toggleList }) => {
  return (
    <div
      id="toolbar"
      className="flex flex-col items-center gap-4 h-screen bg-gray-900 text-gray-100 p-2 sticky top-0"
    >
      {/* Text styles */}
      <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("bold"); }}>
        <b>B</b>
      </button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("italic"); }}>
        <i>I</i>
      </button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("underline"); }}>
        <u>U</u>
      </button>

      {/* Headings */}
      <button type="button" onMouseDown={(e) => { e.preventDefault(); toggleHeading("H1"); }}>H1</button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); toggleHeading("H2"); }}>H2</button>

      {/* Lists */}
      <button type="button" onMouseDown={(e) => { e.preventDefault(); toggleList("unordered"); }}>
        <List />
      </button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); toggleList("ordered"); }}>
        <ListOrdered />
      </button>

      {/* Alignments */}
      <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("justifyLeft"); }}>
        <AlignLeft strokeWidth={1} />
      </button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("justifyCenter"); }}>
        <AlignCenter strokeWidth={1} />
      </button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("justifyRight"); }}>
        <AlignRight strokeWidth={1} />
      </button>

      {/* Blockquote */}
      <button type="button" onMouseDown={(e) => { e.preventDefault(); toggleBlockquote(); }}>
        <Quote />
      </button>
    </div>
  );
};

export default Toolbar;
