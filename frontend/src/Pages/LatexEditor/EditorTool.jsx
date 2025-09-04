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
  <div className="flex flex-col items-center sm:flex-row sm:justify-between p-4 px-4 sm:px-8 bg-gray-100 text-sm gap-4 sm:gap-0">
  <div className="flex items-center gap-2 sm:gap-8">
    <div className="border-1 border-gray-300 flex flex-wrap">
      <button
        onClick={() => handleViewLeft("files")}
        className={`${
          leftView == "files"
            ? "bg-gray-300 text-gray-950"
            : "text-gray-950"
        } px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap`}
      >
        <span className="hidden sm:inline">Files Structure</span>
        <span className="sm:hidden">Files</span>
      </button>
      <button
        onClick={() => handleViewLeft("PDF")}
        className={`${
          leftView == "PDF" ? "bg-gray-300 text-gray-950" : "text-gray-950"
        } px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap`}
      >
        <span className="hidden sm:inline">View PDF</span>
        <span className="sm:hidden">PDF</span>
      </button>
      
      <button
        className={`${
          leftView === "versions"
            ? "bg-gray-300 text-gray-950"
            : "text-gray-950"
        } px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap`}
        onClick={() => handleViewLeft("versions")}
      >
        <span className="hidden sm:inline">Older Versions</span>
        <span className="sm:hidden">Versions</span>
      </button>
      <button
        onClick={() => handleViewLeft("math")}
        className={`${
          leftView == "math"
            ? "bg-gray-300 text-gray-950"
            : "text-gray-950"
        } px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap`}
      >
        <span className="hidden sm:inline">Math Symbols</span>
        <span className="sm:hidden">Math</span>
      </button>
    </div>
  </div>
  <div className="flex gap-2 sm:gap-4 flex-wrap">
    <Button 
      onClick={() => handleViewRight("commit")}
      className="text-xs sm:text-sm px-3 sm:px-4 py-2 flex-shrink-0"
    >
      <span className="hidden sm:inline">Commit Changes</span>
      <span className="sm:hidden">Commit</span>
    </Button>
    <Button 
      onClick={() => compileLatexWithImage()}
      className="text-xs sm:text-sm px-3 sm:px-4 py-2 flex-shrink-0"
    > 
      <span className="hidden sm:inline">Compile PDF</span>
      <span className="sm:hidden">Compile</span>
    </Button>
  </div>
</div>
  );
}
