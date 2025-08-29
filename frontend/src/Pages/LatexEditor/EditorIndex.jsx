import { useEffect, useState } from "react";
import EditorTool from "./EditorTool";
import PdfViewer from "./PdfViewer";
import FolderView from "./FolderView";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import MonacoEditor from "./MonacoEditor";

import { debounce } from "lodash";
import Commit from "./Commit";
import Versions from "./Versions";
export default function EditorIndex() {
  const { projectid } = useParams(); // 👈 here you get "id" from the URL

  const [currFolder, setCurrFolder] = useState("");
  const [currfile, setCurrFile] = useState({}); // content state
  const [folders, setFolders] = useState([]); // content state
  const [files, setFiles] = useState([]); // content state

  const [viewPdf, setviewPdf] = useState(false);
  const [rightView, setRightView] = useState("Editor");
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState("");
  const [latex, setLatex] = useState(
    "\\documentclass{article}\n\\begin{document}\nHello Tectonic!\n\\end{document}"
  );
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

  const handleViewToggle = () => {
    setviewPdf((prev) => !prev);
  };
  const handleViewRight = (s) => {
    setRightView(s);
  };

  const compileLatexWithImage = async () => {
    const res = await api.post(
      `/projects/compile/${projectid}`,
      { content: latex },
      {
        responseType: "blob",
        headers: { "Content-Type": "application/json" },
      }
    );

    const blob = res.data;
    console.log(blob);

    setPdfUrl(URL.createObjectURL(blob));
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
    <div className="flex flex-col h-screen">
      <EditorTool
        compileLatexWithImage={compileLatexWithImage}
        handleViewRight={handleViewRight}
        handleViewToggle={handleViewToggle}
        viewPdf={viewPdf}
        com={viewPdf}
      />
      <div className="flex h-full">
        {viewPdf ? (
          <PdfViewer pdfUrl={pdfUrl} />
        ) : (
          <FolderView
            saveFile={saveFile}
            projectid={projectid}
            setLatex={setLatex}
            currFolder={currFolder}
            setCurrFolder={setCurrFolder}
            currFile={currfile}
            setCurrFile={setCurrFile}
            folders={folders}
            setFolders={setFolders}
            files={files}
            setFiles={setFiles}
          />
        )}
        <div className="flex-1">
          {rightView === "commit" ? (
  <Commit projectid={projectid} />
) : rightView === "versions" ? (
  <Versions projectid={projectid} />
) : (
  <MonacoEditor latex={latex} setLatex={setLatex} />
)}
        </div>
      </div>
    </div>
  );
}
