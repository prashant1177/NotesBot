import {
  File,
  FileType2,
  Folder,
  LetterText,
  LibraryBig,
  MoveLeft,
} from "lucide-react";
import Button from "../../../ui/Button/Button";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectTools from "./ProjectTools";
import { useState } from "react";
import api from "../../../api";
import ProjectViewSidebar from "./ProjectViewSidebar";
import PdfViewer from "../../LatexEditor/PdfViewer";
import PremiumIndex from "../../Premium/PremiumIndex";

export default function ProjectView() {
  const navigate = useNavigate();
  const { projectid } = useParams(); // 👈 here you get "id" from the URL

  const [folders, setFolders] = useState([]); // content state
  const [files, setFiles] = useState([]); // content state
  const [currFolder, setCurrFolder] = useState("");
  const [currfile, setCurrFile] = useState({}); // content state
  const [project, setProject] = useState({}); // content state
  const [backFolder, setBackFolder] = useState(null);
  const [latex, setLatex] = useState(null);
  const [viewPdf, setViewPdf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/projects/view/${projectid}`);
        setFolders(res.data.Folders);
        setFiles(res.data.Files);
        setCurrFolder(res.data.rootFolder);
        setCurrFile(res.data.rootFile._id);
        setLatex(res.data.fileContent);
        setProject(res.data.projects);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchData();

    compileLatexWithImage();
  }, [projectid]);

  const compileLatexWithImage = async () => {
    try {
      const res = await api.get("/api/checkpremium");
      if (!res.data.isPremium) {
        return;
      }
    } catch (err) {
      console.error("Error checking premium:", err);
      return;
    }
    try {
      setLoading(true);
      const res = await api.post(
        `/projects/compile/${projectid}`,
        { content: latex },
        {
          responseType: "blob",
          headers: { "Content-Type": "application/json" },
        }
      );
      const blob = res.data;
      setPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Error compiling LaTeX:", err);
    } finally {
      setLoading(false); // stop loading
    }
  };

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
    setBackFolder(res.data.parentId);
    setFiles(res.data.Files);
    setCurrFolder(folderID);
  };

  return (
    <div className="">
      <ProjectTools
        projectid={projectid}
        setViewPdf={setViewPdf}
        viewPdf={viewPdf}
      />
      <div className="flex w-full">
        <div className="flex-1 flex flex-col w-full border-r-1 border-gray-200">
          <div className=" text-gray-900 pb-2  border-b-8 border-gray-100">
            <h1 className="flex text-gray-800 mb-2 items-center gap-2 text-2xl pt-4 px-8">
              <LibraryBig strokeWidth={1} size={20} />
              {project.title}
            </h1>
            <div className="flex justify-between gap-4 pe-8 px-8">
              <h1>Project files listed below</h1>
              <div className="flex gap-4">
                <h1>
                  Last Changed: {new Date(project.createdAt).toLocaleString()}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
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
                  onClick={() => openFile(filesInside._id)}
                  className={` p-2 flex gap-2 items-center ${
                    currfile == filesInside._id && "text-blue-800"
                  }`}
                >
                  <FileType2 size={16} className={``} />
                  {filesInside.name}
                </button>
              </div>
            ))}
            {backFolder && (
              <button
                onClick={() => openFolder(backFolder)}
                className="border-b-1 border-gray-200 bg-gray-50 p-2 flex gap-2 items-center  px-8"
              >
                <MoveLeft size={16} />
                Go Back
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 h-screen flex">
          {viewPdf && pdfUrl ? (
            <PdfViewer pdfUrl={pdfUrl} loading={loading} />
          ) : viewPdf ? (
            <PremiumIndex />
          ) : (
            latex && (
              <div className="border-l-1 border-gray-200 w-full flex flex-col flex-1 relative ">
                <div className="shrink-0">
                  <h1 className="flex text-gray-800 items-center gap-2 text-2xl  p-2 bg-gray-200 w-full">
                    <File /> File Content
                  </h1>
                </div>
                <div className="flex-1 overflow-auto px-4 whitespace-pre-wrap font-mono">
                  {latex}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
