import {
  CirclePlus,
  FileType2,
  Folder,
  MoveLeft,
  Trash,
  X,
} from "lucide-react";
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
  setImageUrl
}) {
  const [createNew, setCreateNew] = useState(null); // content state
  const [newName, setNewName] = useState(""); // content state
  const [backFolder, setBackFolder] = useState(null);

  const openFile = async (fileID, fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();

    if (["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(ext)) {
      const res = await api.get(`/projects/getfile/${projectid}`, {
        params: { fileID },
        responseType: "arraybuffer",
      });
      const blob = new Blob([res.data], {
        type: res.headers["content-type"] || "image/*",
      });
      setImageUrl(URL.createObjectURL(blob));
      setCurrFile(fileID);
      return;
    }

    const res = await api.get(`/projects/getfile/${projectid}`, {
      params: { fileID },
    });
    setImageUrl(null);
    setLatex(res.data.fileContent);
    setCurrFile(fileID);
  };

  const openFolder = async (folderID) => {
    const res = await api.get(`/projects/getfolder/${projectid}`, {
      params: { folderID: folderID },
    });
    setFolders(res.data.Folders);
    setBackFolder(res.data.parentId);
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
  };
  
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("currFolder", currFolder);

    const res = await api.post(`/projects/uploadimage/${projectid}`, formData);
    setFiles(res.data.Files);
    const data = await res.data.json();
  };

  const deleteFile = async (fileID) => {
    const res = await api.post(`/projects/deleteFile/${projectid}`, {
      fileID,
    });
    setFiles(res.data.Files);
  };
  return (
    <div className="flex-1">
      <FolderTools
        saveFile={saveFile}
        setCreateNew={setCreateNew}
        projectid={projectid}
        uploadImage={uploadImage}
      />
      {!currFolder ? (
        <div className="flex flex-col text-gray-800">
          {" "}
          <div className="flex justify-between bg-gray-100 border-b-2 border-gray-200  px-8 animate-pulse">
            <button className={` p-2 flex gap-2 items-center `}>
              <FileType2 size={16} className={``} />
              Main.tex
            </button>
            <button className=" hover:text-red-500 transition-colors">
              <Trash strokeWidth={1} />{" "}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-gray-800">
          {createNew && (
            <div className="w-full flex items-center gap-4 mt-2  px-8">
              <Input
                className="border-2 border-blue-500"
                placeholder={
                  createNew === "folder"
                    ? "Enter folder name"
                    : "Enter file name"
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
            <div
              className="flex justify-between border-b-2 border-gray-200  px-8"
              key={i}
            >
              <button
                onClick={() => openFile(filesInside._id, filesInside.name)}
                className={` p-2 flex gap-2 items-center ${
                  currFile == filesInside._id && "text-blue-800"
                }`}
              >
                <FileType2 size={16} className={``} />
                {filesInside.name}
              </button>
              <button
                className=" hover:text-red-500 transition-colors"
                onClick={() => deleteFile(filesInside._id)}
              >
                <Trash strokeWidth={1} />{" "}
              </button>
            </div>
          ))}
          {backFolder && (
            <button
              onClick={() => openFolder(backFolder)}
              className="border-y-1 border-gray-200 bg-gray-100 p-2 flex gap-2 items-center  px-8"
            >
              <MoveLeft size={16} />
              Go Back
            </button>
          )}
        </div>
      )}
    </div>
  );
}
