import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import debounce from "lodash/debounce";

export default function LatexEditor() {
  const [latex, setLatex] = useState(
    "\\documentclass{article}\n\\begin{document}\nHello Tectonic!\n\\end{document}"
  );
  const [pdfUrl, setPdfUrl] = useState("");

  // compile LaTeX and set PDF URL
  const compileLatex = async (code) => {
    const res = await fetch("http://localhost:8080/compile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: code })
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
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left: Editor */}
      <div style={{ width: "50%" }}>
        <Editor
          height="100%"
          defaultLanguage="latex"
          value={latex}
          onChange={setLatex}
        />
      </div>

      {/* Right: PDF Preview */}
      <div style={{ width: "50%" }}>
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            style={{ width: "100%", height: "100%" }}
            title="PDF Preview"
          />
        )}
      </div>
    </div>
  );
}
