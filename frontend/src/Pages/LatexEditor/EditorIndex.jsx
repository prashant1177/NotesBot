import { useEffect, useState } from "react";
import EditorTool from "./EditorTool";
import PdfViewer from "./PdfViewer";
import FolderView from "./FolderView";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import MonacoEditor from "./MonacoEditor";

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
    if (!viewPdf) {
      compileLatexWithImage();
    }
  };

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
          <FolderView latex={latex} projectid={projectid} setLatex={setLatex} />
        )}
        <div className="flex-1">
          <MonacoEditor latex={latex} setLatex={setLatex} />
        </div>
      </div>
    </div>
  );
}
