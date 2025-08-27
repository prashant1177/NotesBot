export default function PdfViewer({ pdfUrl }) {
  return (
    <div className="flex-1">
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          style={{ width: "100%", height: "100%" }}
          title="PDF Preview"
        />
      )}
    </div>
  );
}
