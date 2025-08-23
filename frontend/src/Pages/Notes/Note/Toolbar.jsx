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

const Toolbar = ({
  toggleHeading,
  toggleBlockquote,
  exec,
  toggleList,
  deleteNote,
  detailsNote,
  viewNote,
  saveNote,
}) => {
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
          <Bold strokeWidth={1} size={20}/>
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("italic");
          }}
        >
          <Italic strokeWidth={1} size={20}/>
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("underline");
          }}
        >
          <Underline strokeWidth={1} size={20}/>
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
         <Heading1 strokeWidth={1} size={20}/>
        </button>
        <button
          type="button"
          className="hover:bg-gray-100 hover:text-gray-800 w-full p-2"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleHeading("H2");
          }}
        >
          <Heading2 strokeWidth={1} size={20}/>
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
    </div>
  );
};

export default Toolbar;
