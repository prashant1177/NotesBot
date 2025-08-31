import { ArrowDownToLine } from "lucide-react";
import api from "../../api";
import Button from "../../ui/Button/Button";

export default function EditorTool({
  handleViewRight,
  handleViewLeft,
  leftView,
  rightView,
  compileLatexWithImage,
}) {
  return (
    <div className="flex justify-between p-4 px-8 bg-gray-100 text-sm">
      <div className="flex items-center gap-8">
        <div className="border-1 border-gray-300 ">
          <button
            onClick={() => handleViewLeft("files")}
            className={`${
              leftView == "files"
                ? "bg-gray-300 text-gray-950"
                : "text-gray-950"
            } px-4 py-2`}
          >
            Files Structure
          </button>
          <button
            onClick={() => handleViewLeft("PDF")}
            className={`${
              leftView == "PDF" ? "bg-gray-300 text-gray-950" : "text-gray-950"
            } px-4 py-2`}
          >
            View PDF
          </button>
          <button
            className={`${
              leftView === "versions"
                ? "bg-gray-300 text-gray-950"
                : "text-gray-950"
            } px-4 py-2`}
            onClick={() => handleViewLeft("versions")}
          >
            Older Versions
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <Button onClick={() => handleViewRight("commit")}>
          Commit Changes
        </Button>
        <Button onClick={() => compileLatexWithImage()}> Compile PDF</Button>

      {/*  <div className="border-1 border-gray-300 ">
          <button
            className={`${
              rightView === "versions"
                ? "text-gray-950"
                : "bg-gray-300 text-gray-950"
            } px-4 py-2`}
            onClick={() => handleViewRight("Editor")}
          >
            Editor
          </button>
        </div>
      */}
      </div>
    </div>
  );
}
