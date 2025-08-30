// Import the main component
import { Viewer, Worker } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function PdfViewer({ pdfUrl, loading }) {
  return (
    <div className="flex-1 relative">
      {/* Overlay Loader */}
      {/* Overlay Loader */}
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center ">
          <div className="animate-spin rounded-full h-24 w-24 border-b-4"></div>
        </div>
      )}
      {pdfUrl && (
        
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer className="h-full w-full" fileUrl={pdfUrl} />
        </Worker>
      )}{" "}
    </div>
  );
}

/* 
;
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer className="h-full w-full" fileUrl={pdfUrl} />
        </Worker>
*/
