import { CirclePlus, FileType2, Folder, X } from "lucide-react";
import FolderTools from "./FolderTools";
import { useEffect, useState } from "react";
import api from "../../api";
import Input from "../../ui/Input/Input";
import { debounce } from "lodash";

export default function FolderView({ compileLatexWithImage,latex, projectid, setLatex }) {
  const [currFolder, setCurrFolder] = useState("");
  const [currfile, setCurrFile] = useState({}); // content state
  const [folders, setFolders] = useState([]); // content state
  const [files, setFiles] = useState([]); // content state
  const [createNew, setCreateNew] = useState(null); // content state
  const [newName, setNewName] = useState(""); // content state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/projects/loadEditor/${projectid}`);
        setFolders(res.data.Folders);
        setFiles(res.data.Files);
        setCurrFolder(res.data.rootFolder);
        setCurrFile(res.data.rootFile._id);
        setLatex(res.data.fileContent);
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
  //  save file
  const saveFile = async () => {
    await api.post(`/projects/savefile/${projectid}`, {
      currfile,
      latex,
    });
  };

  const debouncedCompile = debounce(saveFile, 800);
  useEffect(() => {
    debouncedCompile();
    return debouncedCompile.cancel;
  }, [latex]);

  return (
    <div className="flex-1">
      <FolderTools
        saveFile={saveFile}
        setCreateNew={setCreateNew}
        projectid={projectid}
        uploadImage={uploadImage}
      />
      <div className="flex flex-col px-8">
        {createNew && (
          <div className="w-full flex items-center gap-4 mt-2">
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
            className="border-b-2 border-gray-200 p-2 flex gap-2 items-center"
            key={i}
          >
            <Folder size={16} />
            {folderInside.name}
          </button>
        ))}
        {files?.map((filesInside, i) => (
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
