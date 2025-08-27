import { FileType2, Folder } from "lucide-react";
import FolderTools from "./FolderTools";
import { useEffect, useState } from "react";
import api from "../../api";

export default function FolderView({ projectid, setLatex }) {
  const [currFolder, setCurrFolder] = useState({});

  const [folder, setFolder] = useState({}); // content state

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
    console.log(res.data.folder)
    setFolder(res.data.folder);
    setCurrFolder(res.data.folder._id);
  };

  return (
    <div className="flex-1">
      <FolderTools currFolder={currFolder} projectid={projectid} />
      <div className="flex flex-col px-8">
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
