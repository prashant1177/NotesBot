import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Info,
  List,
  ListOrdered,
  Quote,
  Save,
  Trash2,
  View,
} from "lucide-react";

const Toolbar = ({ toggleHeading, toggleBlockquote, exec, toggleList, deleteNote, detailsNote, viewNote, saveNote }) => {
  return (
    <div
      id="toolbar"
      className="flex flex-col items-center justify-between py-4 h-screen bg-gray-50 text-gray-600  sticky top-0"
    >
      {/* Text styles */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("bold");
          }}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("italic");
          }}
        >
          <i>I</i>
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("underline");
          }}
        >
          <u>U</u>
        </button>

        {/* Headings */}
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleHeading("H1");
          }}
        >
          H1
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleHeading("H2");
          }}
        >
          H2
        </button>

        {/* Lists */}
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleList("unordered");
          }}
        >
          <List />
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleList("ordered");
          }}
        >
          <ListOrdered />
        </button>

        {/* Alignments */}
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("justifyLeft");
          }}
        >
          <AlignLeft strokeWidth={1} />
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("justifyCenter");
          }}
        >
          <AlignCenter strokeWidth={1} />
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("justifyRight");
          }}
        >
          <AlignRight strokeWidth={1} />
        </button>

        {/* Blockquote */}
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockquote();
          }}
        >
          <Quote strokeWidth={1} />
        </button>
      </div>
      <div className="flex flex-col items-center ">
        <button
          type="button"
          className=" hover:text-blue-500 hover:bg-gray-100 w-full p-2 "
          onMouseDown={(e) => {
            e.preventDefault();
            saveNote();
          }}
        >
          <Save strokeWidth={1} />
        </button>
        <button
          type="button"
          className="hover:text-blue-500 hover:bg-gray-100  w-full p-2 "
          onMouseDown={(e) => {
            e.preventDefault();
            detailsNote();
          }}
        >
          <Info strokeWidth={1} />
        </button>
        <button
          type="button"
          className="hover:text-blue-500 hover:bg-gray-100  w-full p-2 "
          onMouseDown={(e) => {
            e.preventDefault();
            viewNote();
          }}
        >
          <View strokeWidth={1} />
        </button>
        <button
          type="button"
          className=" hover:text-red-500 hover:bg-gray-100  w-full p-2 "
          onMouseDown={(e) => {
            e.preventDefault();
            deleteNote();
          }}
        >
          <Trash2 strokeWidth={1} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
