// Import the main component
import { Viewer, Worker } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import PdfTools from "./PdfTools";
import { useState } from "react";

export default function PdfViewer({ pdfUrl, loading }) {
  const [isChecked, setIsChecked] = useState(true); // ✅ default ON

  return (
    <div className="flex flex-col flex-1 relative ">
      <div className="shrink-0">
        <PdfTools isChecked={isChecked}  setIsChecked={setIsChecked} />
      </div>

      {/* PDF content fills remaining space */}
      <div className="flex-1 overflow-auto">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center ">
            <div className="animate-spin rounded-full h-24 w-24 border-b-4"></div>
          </div>
        )}
        {pdfUrl &&
          (isChecked ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer className="h-full w-full " fileUrl={pdfUrl} />
            </Worker>
          ) : (
            <iframe
              src={pdfUrl}
              className="h-full w-full border-0"
              title="PDF Viewer"
            />
          ))}{" "}
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
