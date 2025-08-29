// Import the main component
import { Viewer, Worker } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function PdfViewer({ pdfUrl }) {
  return (
    <div className="flex-1">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        {pdfUrl && (
          <Viewer style={{ width: "100%", height: "100%" }} fileUrl={pdfUrl} />
        )}{" "}
      </Worker>
    </div>
  );
}

/* <iframe
  src={pdfUrl}
  style={{ width: "100%", height: "100%" }}
  title="PDF Preview"
/>;
*/
