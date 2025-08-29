import { CirclePlus, FileType2, Folder, X } from "lucide-react";
import FolderTools from "./FolderTools";
import { useEffect, useState } from "react";
import api from "../../api";
import Input from "../../ui/Input/Input";

export default function FolderView({
  currFolder,
  setCurrFolder,
  currFile,
  setCurrFile,
  folders,
  setFolders,
  files,
  setFiles,
  saveFile,
  projectid,
  setLatex,
}) {
  const [createNew, setCreateNew] = useState(null); // content state
  const [newName, setNewName] = useState(""); // content state

  const openFile = async (fileID) => {
    const res = await api.get(`/projects/getfile/${projectid}`, {
      params: { fileID: fileID },
    });
    setLatex(res.data.fileContent);
    setCurrFile(fileID);
  };

  const openFolder = async (folderID) => {
    const res = await api.get(`/projects/getfolder/${projectid}`, {
      params: { folderID: folderID },
    });
    setFolders(res.data.Folders);
    setFiles(res.data.Files);
    setCurrFolder(folderID);
  };

  const newFile = async (filename) => {
    if (!filename.trim()) return;

    const res = await api.post(`/projects/newfile/${projectid}`, {
      currFolder,
      filename,
    });

    setNewName("");
    setCreateNew(null);
    setFiles(res.data.Files);
    console.log(
      "File Created Successfully +   setLatex(res.data.fileContent);"
    );
  };

  const newFolder = async (foldername) => {
    if (!foldername.trim()) return;
    const res = await api.post(`/projects/newfolder/${projectid}`, {
      currFolder,
      foldername,
    });
    setFolders(res.data.Folders);
    setNewName("");
    setCreateNew(null);
    console.log(
      "File Created Successfully +   setLatex(res.data.fileContent);"
    );
  };
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("currFolder", currFolder);

    const res = await api.post(`/projects/uploadimage/${projectid}`, formData);
    setFiles(res.data.Files);
    const data = await res.data.json();
    console.log(data);
  };

  return (
    <div className="flex-1">
      <FolderTools
        saveFile={saveFile}
        setCreateNew={setCreateNew}
        projectid={projectid}
        uploadImage={uploadImage}
      />
      <div className="flex flex-col text-gray-800">
        {createNew && (
          <div className="w-full flex items-center gap-4 mt-2  px-8">
            <Input
              className="border-2 border-blue-500"
              placeholder={
                createNew === "folder" ? "Enter folder name" : "Enter file name"
              }
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <X
              className="text-red-500 cursor-pointer"
              onClick={() => {
                setNewName("");
                setCreateNew(null);
              }}
            />
            <CirclePlus
              className="text-green-500 cursor-pointer"
              onClick={() =>
                createNew === "folder" ? newFolder(newName) : newFile(newName)
              }
            />
          </div>
        )}
        {folders?.map((folderInside, i) => (
          <button
            onClick={() => openFolder(folderInside._id)}
            className="border-b-2 border-gray-200 p-2 flex gap-2 items-center  px-8"
            key={i}
          >
            <Folder size={16} />
            {folderInside.name}
          </button>
        ))}
        {files?.map((filesInside, i) => (
          <button
            onClick={() => openFile(filesInside)}
            className={`border-b-2 border-gray-200 p-2 flex gap-2 items-center ${currFile == filesInside._id &&"text-blue-800" }  px-8`}
            key={i}
          >
            <FileType2 size={16} className={``} />
            {filesInside.name}
          </button>
        ))}
      </div>
    </div>
  );
}
