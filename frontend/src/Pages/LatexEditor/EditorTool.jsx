import api from "../../api";
import Button from "../../ui/Button/Button";

export default function EditorTool({ handleViewToggle, viewPdf,compileLatexWithImage }) {
  return (
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
      <div>
        <Button varient="primary" onClick={()=> compileLatexWithImage()}>
          {" "}
         Compile PDF
        </Button>
      </div>
    </div>
  );
}
