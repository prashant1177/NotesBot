import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import debounce from "lodash/debounce";
import Button from "../../ui/Button/Button";
import { FileType2, Folder } from "lucide-react";
import { useParams } from "react-router-dom";
import api from "../../api";

export default function LatexEditor() {
  const { projectid, path, fileName } = useParams(); // 👈 here you get "id" from the URL
  console.log(projectid, path);
  const [latex, setLatex] = useState(
    "\\documentclass{article}\n\\begin{document}\nHello Tectonic!\n\\end{document}"
  );
  const [pdfUrl, setPdfUrl] = useState("");
  const [viewPdf, setviewPdf] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(path);

  useEffect(() => {
    const openFile = async () => {
      console.log(path, fileName);
      const res = await api.get(`/projects/getfile/${projectid}`, {
        params: { path, fileName },
      });
      setLatex(res.data.fileContent);
      console.log(res.data.fileContent);
    };

    openFile();
  }, [projectid]);

  const newFile = async (filename) => {
    console.log(path, currentFolder, filename);
    const res = await api.post(`/projects/newfile`, { path, currentFolder, filename});
    setLatex(res.data.fileContent);
    console.log(res.data.fileContent);
  };

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

  const handleViewToggle = () => {
    setviewPdf((prev) => !prev);
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between p-4 px-8 bg-gray-100">
        <div className="flex items-center gap-8">
          <Button onClick={handleViewToggle}>
            {" "}
            {viewPdf ? "Files Structure" : "View PDF"}
          </Button>
          <h1>Project</h1>
          <h1>Issues</h1>
          <h1>Contribution Requests</h1>
          <h1>Approvals</h1>
        </div>
        <div></div>
      </div>
      
      <div className="flex h-full">
        {/* Right: PDF Preview */}

        {viewPdf ? (
          <div className="flex-1">
            {pdfUrl && (
              <iframe
                src={pdfUrl}
                style={{ width: "100%", height: "100%" }}
                title="PDF Preview"
              />
            )}
          </div>
        ) : (
          <div className="flex-1">
            <div className="w-full bg-gray-950 px-8 text-gray-300">
              <div className="flex items-center gap-8 text-gray-300 h-full">
                <button className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 p-2">
                  New Folder
                </button>
                <button onClick={() => newFile("reference.tex")} className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 p-2">
                  New File
                </button>
                <button className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 p-2">
                  Upload File
                </button>
                <button className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 p-2">
                  Upload Image
                </button>
              </div>
            </div>
            <div className="flex flex-col px-8">
              <h1 className="border-b-2 border-gray-200 p-2 flex gap-2 items-center">
                <Folder size={16} />
                Reference
              </h1>
              <h1 className="border-b-2 border-gray-200 p-2 flex gap-2 items-center">
                <FileType2 size={16} />
                Filename.txt
              </h1>
              <h1 className="border-b-2 border-gray-200 p-2 flex gap-2 items-center">
                <FileType2 size={16} />
                Filename.txt
              </h1>
              <h1 className="border-b-2 border-gray-200 p-2 flex gap-2 items-center">
                <FileType2 size={16} />
                Filename.txt
              </h1>
              <h1 className="border-b-2 border-gray-200 p-2 flex gap-2 items-center">
                <FileType2 size={16} />
                Filename.txt
              </h1>
            </div>
          </div>
        )}
        {/* Left: Editor */}
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
