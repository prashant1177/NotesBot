import {
  ArrowLeftToLine,
  File,
  FileType2,
  Folder,
  MoveLeft,
} from "lucide-react";
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
  const [imageUrl, setImageUrl] = useState(null);

  const [showDetails, setShowDetails] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/projects/view/${projectid}`);
        setFolders(res.data.Folders);
        setFiles(res.data.Files);
        setCurrFolder(res.data.rootFolder);
        setProject(res.data.projects);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };
    fetchData();
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
      setShowDetails(false);
      return;
    }

    const res = await api.get(`/projects/getfile/${projectid}`, {
      params: { fileID },
    });
    setImageUrl(null);
    setLatex(res.data.fileContent);
    setCurrFile(fileID);
    setShowDetails(false);
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
        compileLatexWithImage={compileLatexWithImage}
        viewPdf={viewPdf}
        setShowDetails={setShowDetails}
      />
      {project.title ? (
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row w-full">
          <div className="flex-1 flex flex-col w-full border-r-1 border-gray-100 ">
            <div className=" text-gray-200 mb-2   bg-gray-950">
              <h1 className="flex items-center gap-2 text-2xl py-2 px-4 md:px-8 border-b-1 border-gray-300/30" >
                {project.title}
              </h1>
              <div className="flex justify-between gap-4 pe-8 px-4 py-2 md:px-8 bg-gray-900 text-gray-400 text-sm">
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
                  className="border-b-2 border-gray-200 p-2 flex gap-2 items-center  px-4 md:px-8"
                  key={i}
                >
                  <Folder size={16} />
                  {folderInside.name}
                </button>
              ))}
              {files?.map((filesInside, i) => (
                <div
                  className="flex justify-between border-b-2 border-gray-200  px-4 md:px-8"
                  key={i}
                >
                  <button
                    onClick={() => openFile(filesInside._id, filesInside.name)}
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
                  className="border-b-1 border-gray-200 bg-gray-50 p-2 flex gap-2 items-center  px-4 md:px-8"
                >
                  <MoveLeft size={16} />
                  Go Back
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 h-screen flex overflow-auto">
            {viewPdf && pdfUrl ? (
              <PdfViewer pdfUrl={pdfUrl} loading={loading} />
            ) : viewPdf ? (
              <PremiumIndex />
            ) : !showDetails && (latex || imageUrl) ? (
              <div className="border-l-1 border-gray-200 w-full flex flex-col flex-1 relative ">
                <div className="shrink-0 flex justify-between p-2 md:p-4 pe-4 bg-gray-100 text-sm text-gray-800">
                  <h1 className="flex  items-center gap-2">
                    <File size={20} />
                    File Content
                  </h1>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeftToLine size={20} /> Close
                  </button>
                </div>
                {imageUrl ? (
                  <img src={imageUrl} alt="Image" className="w-full"/>
                ) : (
                  <div className="flex-1 overflow-auto px-4 whitespace-pre-wrap font-mono">
                    {latex}
                  </div>
                )}
              </div>
            ) : (
              <ProjectViewSidebar project={project} />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center my-8">
          <div className="animate-pulse flex flex-col items-center gap-4 w-60">
            <div>
              <div className="w-48 h-6 bg-gray-400 rounded-md"></div>
              <div className="w-28 h-4 bg-gray-400 mx-auto mt-3 rounded-md"></div>
            </div>
            <div className="h-7 bg-gray-400 w-full rounded-md"></div>
            <div className="h-7 bg-gray-400 w-full rounded-md"></div>
            <div className="h-7 bg-gray-400 w-full rounded-md"></div>
            <div className="h-7 bg-gray-400 w-1/2 rounded-md"></div>
          </div>{" "}
          <h6 className="text-gray-400 text-lg mt-8">Loading project...</h6>
        </div>
      )}
    </div>
  );
}
