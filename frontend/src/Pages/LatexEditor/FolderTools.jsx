import { useRef } from "react";
import api from "../../api";

export default function FolderTools({
  saveFile,
  setCreateNew,
  projectid,
  uploadImage,
}) {
  
  return (
    <div className="w-full bg-gray-950 px-8 text-gray-300">
      <div className="flex items-center gap-8 text-gray-300 h-full">
        <button
          onClick={() => setCreateNew("folder")}
          className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 p-2"
        >
          New Folder
        </button>
        <button
          onClick={() => setCreateNew("file")}
          className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 p-2"
        >
          New File
        </button>
        <button className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 p-2">
          Upload File
        </button>
        <label className="cursor-pointer">
          {/* Lucide icon as the clickable element */}
          Upload Image
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files.length > 0) {
                uploadImage(e.target.files[0]);
              }
            }}
          />
        </label>
        <button
          onClick={() => saveFile()}
          className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 p-2"
        >
          Save File
        </button>
      </div>
    </div>
  );
}
