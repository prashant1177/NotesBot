import { FileType2, Folder, LetterText, LibraryBig } from "lucide-react";
import Button from "../../../ui/Button/Button";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectTools from "./ProjectTools";
import { useState } from "react";
import api from "../../../api";

export default function ProjectView() {
  const navigate = useNavigate();
  const { projectid } = useParams(); // 👈 here you get "id" from the URL
  const [folder, setFolder] = useState([]); // content state

  const [currFolder, setCurrFolder] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/projects/view/${projectid}`);
        setFolder(res.data.currFolder);
        setCurrFolder(res.data.currFolder.id);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchData();
  }, [projectid]);

  const openFile = async (fileName) => {
    console.log(folder, fileName);
    
  };

  const openFolder = async (folderID) => {
    const res = await api.get(`/projects/getfolder/${projectid}`, {
      params: { folderID: folderID },
    });
    setFolder(res.data.folder);
    setCurrFolder(res.data.folder._id);
  };
  return (
    <div className="">
      <ProjectTools projectid={projectid}/>
      <div className="mt-8 flex w-full px-8">
        <div className="flex-3/4 flex flex-col w-full">
          <div className=" text-gray-900 pb-2  border-b-8 border-gray-100">
            <h1 className="flex text-gray-800 mb-2 items-center gap-2 text-2xl">
              <LibraryBig strokeWidth={1} size={20} /> This will be the title of
              the paper
            </h1>
            <div className="flex justify-between gap-4 pe-8">
              <h1>Project files listed below</h1>
              <div className="flex gap-4">
                <h1>Version 0.1</h1>
                <h1>Last Changed 26-08-2025</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
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
                onClick={() => openFile(filesInside.id)}
                className="border-b-2 border-gray-200 p-2 flex gap-2 items-center"
                key={i}
              >
                <FileType2 size={16} />
                {filesInside.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex-1/4">
          <div className="w-full p-4">
            <div className="flex flex-col">
              <div className="border-b-1 border-gray-100 py-4">
                <h1 className="text-lg text-gray-900">About</h1>
              </div>
              <h1 className="text-lg my-4">Topics </h1>
              <h1 className="text-lg my-4">Original </h1>
              <h1 className="text-lg my-4">Members </h1>
              <h1 className="text-lg my-4">Contributer </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
