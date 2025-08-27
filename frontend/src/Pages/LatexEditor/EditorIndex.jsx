import { useEffect, useState } from "react";
import EditorTool from "./EditorTool";
import PdfViewer from "./PdfViewer";
import FolderView from "./FolderView";
import { Editor } from "@monaco-editor/react";
import { debounce } from "lodash";
import api from "../../api";
import { useParams } from "react-router-dom";

export default function EditorIndex() {
  const { projectid } = useParams(); // 👈 here you get "id" from the URL

  const [viewPdf, setviewPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [latex, setLatex] = useState(
    "\\documentclass{article}\n\\begin{document}\nHello Tectonic!\n\\end{document}"
  );

  const handleViewToggle = () => {
    setviewPdf((prev) => !prev);
  };

  useEffect(() => {
    const loadEditor = async () => {
      const res = await api.get(`/projects/loadEditor/${projectid}`);
      setLatex(res.data.fileContent);
    };

    loadEditor();
  }, [projectid]);

  // compile LaTeX and set PDF URL
  const compileLatex = async (code) => {
    const res = await fetch("http://localhost:8080/compile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: code }),
    });
    const blob = await res.blob();
    setPdfUrl(URL.createObjectURL(blob));
  };

  // debounce typing
  const debouncedCompile = debounce(compileLatex, 800);

  useEffect(() => {
    debouncedCompile(latex);
    return debouncedCompile.cancel;
  }, [latex]);



  return (
    <div className="flex flex-col h-screen">
      <EditorTool handleViewToggle={handleViewToggle} viewPdf={viewPdf} />
      <div className="flex h-full">
        {viewPdf ? (
          <PdfViewer pdfUrl={pdfUrl} />
        ) : (
          <FolderView projectid={projectid} setLatex={setLatex}/>
        )}
        <div className="flex-1">
          <Editor
            height="100%"
            defaultLanguage="latex"
            value={latex}
            onChange={setLatex}
          />
        </div>
      </div>
    </div>
  );
}
