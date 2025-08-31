import { useRef } from "react";
import api from "../../api";
import { FolderPlus, FilePlus, Upload, ImagePlus, Save } from "lucide-react";

export default function FolderTools({
  saveFile,
  setCreateNew,
  uploadImage,
}) {
  return (
    <div className="w-full bg-gray-950 px-8 py-4 text-gray-300 text-sm">
       <div className="flex items-center justify-between gap-6 text-gray-300 h-full">
      {/* New Folder */}
      <button
        onClick={() => setCreateNew("folder")}
        className="flex items-center gap-2 hover:text-blue-500 transition-all"
      >
        <FolderPlus size={18} />
        New Folder
      </button>

      {/* Divider */}
      <div className="h-5 border-l border-gray-600" />

      {/* New File */}
      <button
        onClick={() => setCreateNew("file")}
        className="flex items-center gap-2 hover:text-blue-500 transition-all"
      >
        <FilePlus size={18} />
        New File
      </button>

      {/* Divider */}
      <div className="h-5 border-l border-gray-600" />

      {/* Upload File */}
      <button className="flex items-center gap-2 hover:text-blue-500 transition-all">
        <Upload size={18} />
        Upload File
      </button>

      {/* Divider */}
      <div className="h-5 border-l border-gray-600" />

      {/* Upload Image */}
      <label className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-all">
        <ImagePlus size={18} />
        Upload Image
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

      {/* Divider */}
      <div className="h-5 border-l border-gray-600" />

      {/* Save File */}
      <button
        onClick={() => saveFile()}
        className="flex items-center gap-2 hover:text-blue-500 transition-all"
      >
        <Save size={18} />
        Save File
      </button>
    </div>
    </div>
  );
}
