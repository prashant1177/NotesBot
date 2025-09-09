// Import the main component
import { Viewer, Worker } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import PdfTools from "./PdfTools";
import { useState } from "react";
import Button from "../../ui/Button/Button";
import api from "../../api";
import ErrorByAI, { generateFormattedHtml } from "./ErrorByAI";

export default function PdfViewer({
  pdfUrl,
  loading,
  isError,
  ErrorFix,
  setErrorFix,
  setDebug,
  debug,
  compileLatexWithImage,
}) {
  const [isChecked, setIsChecked] = useState(true);
  const [thinking, setThinking] = useState(false);

  const handleAskAi = async () => {
    setThinking(true);
    const res = await api.post(`/projects/debugerror`, { error: ErrorFix });

    setErrorFix(generateFormattedHtml(res.data.debuggedError));
    setThinking(false);
    setDebug(false);
  };
  return (
    <div className="flex flex-col flex-1 relative ">
      <div className="shrink-0">
        <PdfTools
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          pdfUrl={pdfUrl}
        />
      </div>

      {/* PDF content fills remaining space */}
      <div className="flex-1 overflow-auto">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center ">
            <div className="animate-spin rounded-full h-24 w-24 border-b-4"></div>
          </div>
        )}
        {pdfUrl ? (
          isChecked ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer className="h-full w-full " fileUrl={pdfUrl} />
            </Worker>
          ) : (
            <iframe
              src={pdfUrl}
              className="h-full w-full border-0"
              title="PDF Viewer"
            />
          )
        ) : isError ? (
          <ErrorByAI
            handleAskAi={handleAskAi}
            thinking={thinking}
            debug={debug}
            ErrorFix={ErrorFix}
          />
        ) : (
          <div className="flex w-full h-full items-center justify-center">
            {" "}
            <Button
              onClick={() => compileLatexWithImage()}
              className="text-xs sm:text-sm px-3 sm:px-4 py-2 flex-shrink-0 flex items-center gap-2 h-fit"
              
              disabled={loading}
            >
              <span className="hidden sm:inline">Compile PDF</span>
              <span className="sm:hidden">Compile</span>
            </Button>{" "}
          </div>
        )}{" "}
      </div>
    </div>
  );
}

/* 
;
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer className="h-full w-full" fileUrl={pdfUrl} />
        </Worker>
*/
