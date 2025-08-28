import { useEffect, useState } from "react";
import EditorTool from "./EditorTool";
import PdfViewer from "./PdfViewer";
import FolderView from "./FolderView";
import { Editor } from "@monaco-editor/react";
import { debounce } from "lodash";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditorIndex() {
  const { projectid } = useParams(); // 👈 here you get "id" from the URL

  const [viewPdf, setviewPdf] = useState(false);
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState("");
  const [latex, setLatex] = useState(
    "\\documentclass{article}\n\\begin{document}\nHello Tectonic!\n\\end{document}"
  );

  const handleViewToggle = () => {
    setviewPdf((prev) => !prev);
  };

  useEffect(() => {
    const loadEditor = async () => {
      try {
        const res = await api.get(`/projects/loadEditor/${projectid}`);
        setLatex(res.data.fileContent);
      } catch (err) {}
    };

    loadEditor();
  }, [projectid]);

  const compileLatexWithImage = async () => {
    const res = await api.post(
      `/projects/compile/${projectid}`,
      { content: latex },
      {
        responseType: "blob", // important to receive binary PDF
        headers: { "Content-Type": "application/json" },
      }
    );

    const blob = res.data; // Axios stores response in data
    console.log(blob);

    setPdfUrl(URL.createObjectURL(blob));
  };
  {
    /*
  const debouncedCompile = debounce(compileLatexWithImage, 800);
  useEffect(() => {
    debouncedCompile(latex);
    return debouncedCompile.cancel;
  }, [latex]);

*/
  }
  return (
    <div className="flex flex-col h-screen">
      <EditorTool
        compileLatexWithImage={compileLatexWithImage}
        handleViewToggle={handleViewToggle}
        viewPdf={viewPdf}
        com={viewPdf}
      />
      <div className="flex h-full">
        {viewPdf ? (
          <PdfViewer pdfUrl={pdfUrl} />
        ) : (
          <FolderView
            latex={latex}
            projectid={projectid}
            setLatex={setLatex}
          />
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
