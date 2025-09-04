import { useEffect, useRef, useState } from "react";
import EditorTool from "./EditorTool";
import PdfViewer from "./PdfViewer";
import FolderView from "./FolderView";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import MonacoEditor from "./MonacoEditor";

import { debounce } from "lodash";
import Commit from "./Commit";
import Versions from "./Versions";
import PremiumIndex from "../Premium/PremiumIndex";
import MathSymbolsEditor from "./MathSymbolsEditor";
export default function EditorIndex() {
  const { projectid } = useParams(); // 👈 here you get "id" from the URL
  const [loading, setLoading] = useState(false);
  const [currFolder, setCurrFolder] = useState("");
  const [currfile, setCurrFile] = useState({}); // content state
  const [folders, setFolders] = useState([]); // content state
  const [files, setFiles] = useState([]); // content state

  const [leftView, setLeftView] = useState("files");
  const [rightView, setRightView] = useState("Editor");
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState("");
  const [latex, setLatex] = useState(
    "\\documentclass{article}\n\\begin{document}\nHello Tectonic!\n\\end{document}"
  );
  const editorRef = useRef(null);
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
    compileLatexWithImage();
  }, [projectid]);

  const handleViewLeft = async (s) => {
     if (s === "math") {
    try {
      const res = await api.get("/api/checkpremium");
      
      if (!res.data.isPremium) {
        setLeftView("premium");
        return; 
      }
    } catch (err) {
      console.error("Error checking premium:", err);
     
      setLeftView("premium");
      return;
    }
  }
    setLeftView(s);
  };
  const handleViewRight = (s) => {
    setRightView(s);
  };

  const compileLatexWithImage = async () => {
    try {
      setLoading(true); // start loading
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
    } catch (err) {
      console.error("Error compiling LaTeX:", err);
    } finally {
      setLoading(false); // stop loading
    }
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
  function handleEditorMount(editor, monaco) {
    monaco.editor.setTheme("latexThemeOverleaf");
    editorRef.current = editor;
  }
  return (
    <div className="flex flex-col h-screen">
      <div className="shrink-0">
        <EditorTool
          compileLatexWithImage={compileLatexWithImage}
          handleViewRight={handleViewRight}
          handleViewLeft={handleViewLeft}
          leftView={leftView}
          rightView={rightView}
        />
      </div>
      <div className="flex flex-col-reverse  md:flex-row flex-1 md:overflow-hidden">
        {leftView == "PDF" ? (
          <PdfViewer pdfUrl={pdfUrl} loading={loading} />
        ) : leftView == "versions" ? (
          <Versions projectid={projectid} />
        ) : leftView == "math" ? (
          <MathSymbolsEditor editorRef={editorRef} />
        ) : leftView == "premium" ? <PremiumIndex />: (
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
        <div className="flex-1 border-l-1 border-gray-200">
          {rightView == "commit" ? (
            <>
              {" "}
              <Commit projectid={projectid} handleViewRight={handleViewRight} />
              {/* 
                        
 */}
            </>
          ) : (
            <MonacoEditor
              latex={latex}
              setLatex={setLatex}
              handleEditorMount={handleEditorMount}
              editorRef={editorRef}
            />
          )}
        </div>
      </div>
    </div>
  );
}
