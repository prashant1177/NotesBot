import { CirclePlus, FileType2, Folder, X } from "lucide-react";
import FolderTools from "./FolderTools";
import { useEffect, useState } from "react";
import api from "../../api";
import Input from "../../ui/Input/Input";

export default function FolderView({ projectid, setLatex }) {
  const [currFolder, setCurrFolder] = useState({});

  const [folder, setFolder] = useState({}); // content state

  const [createNew, setCreateNew] = useState(null); // content state

  const [newName, setNewName] = useState(""); // content state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/projects/loadEditor/${projectid}`);
        setFolder(res.data.rootFolder);
        setCurrFolder(res.data.rootFolder._id);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };
    fetchData();
  }, [projectid]);

  const openFile = async (fileID) => {
    const res = await api.get(`/projects/getfile/${projectid}`, {
      params: { fileID: fileID },
    });
    setLatex(res.data.fileContent);
  };

  const openFolder = async (folderID) => {
    const res = await api.get(`/projects/getfolder/${projectid}`, {
      params: { folderID: folderID },
    });
    console.log(res.data.folder);
    setFolder(res.data.folder);
    setCurrFolder(res.data.folder._id);
  };

  const newFile = async (filename) => {
    if (!filename.trim()) return;

    await api.post(`/projects/newfile/${projectid}`, {
      currFolder,
      filename,
    });

    setNewName("");
    setCreateNew(null);
    console.log(
      "File Created Successfully +   setLatex(res.data.fileContent);"
    );
  };

  const newFolder = async (foldername) => {
    if (!foldername.trim()) return;

    console.log(foldername);
    await api.post(`/projects/newfolder/${projectid}`, {
      currFolder,
      foldername,
    });

    setNewName("");
    setCreateNew(null);
    console.log(
      "File Created Successfully +   setLatex(res.data.fileContent);"
    );
  };
  return (
    <div className="flex-1">
      <FolderTools setCreateNew={setCreateNew} projectid={projectid} />
      <div className="flex flex-col px-8">
        {createNew && (
          <div className="w-full flex items-center gap-4 mt-2">
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
                createNew === "folder"
                  ? newFolder(newName)
                  : newFile(newName)
              }
            />
          </div>
        )}
        {folder?.foldersInside?.map((folderInside, i) => (
          <button
            onClick={() => openFolder(folderInside._id)}
            className="border-b-2 border-gray-200 p-2 flex gap-2 items-center"
            key={i}
          >
            <Folder size={16} />
            {folderInside.name}
          </button>
        ))}
        {folder?.filesInside?.map((filesInside, i) => (
          <button
            onClick={() => openFile(filesInside._id)}
            className="border-b-2 border-gray-200 p-2 flex gap-2 items-center"
            key={i}
          >
            <FileType2 size={16} />
            {filesInside.name}
          </button>
        ))}
      </div>
    </div>
  );
}
