import api from "../../api";
import Button from "../../ui/Button/Button";

export default function EditorTool({handleViewRight,
  handleViewToggle,
  viewPdf,
  compileLatexWithImage,
}) {
  return (
    <div className="flex justify-between p-4 px-8 bg-gray-100">
      <div className="flex items-center gap-8">
        <div className="border-1 border-gray-300 ">
          <button
            onClick={handleViewToggle}
            className={`${
              viewPdf ? "text-gray-950" : "bg-gray-300 text-gray-950"
            } px-4 py-2`}
          >
            Files Structure
          </button>
          <button
            onClick={handleViewToggle}
            className={`${
              viewPdf ? "bg-gray-300 text-gray-950" : "text-gray-950"
            } px-4 py-2`}
          >
            View PDF
          </button>
        </div>
        <h1>Project</h1>
        <h1>Issues</h1>
        <h1>Contribution Requests</h1>
        <h1>Approvals</h1>
      </div>
      <div className="flex gap-4">
        <Button onClick={() =>handleViewRight("versions")} varient="primary">
          Older Versions
        </Button>
        <Button onClick={() =>handleViewRight("commit")}>Commit Changes </Button>
        <Button varient="primary" onClick={() => compileLatexWithImage()}>
          {" "}
          Compile PDF
        </Button>
        <Button onClick={() =>handleViewRight("Editor")} varient="primary">
         Editor
        </Button>
      </div>
    </div>
  );
}
