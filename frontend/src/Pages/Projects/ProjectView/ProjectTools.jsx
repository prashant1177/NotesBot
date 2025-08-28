import { useEffect } from "react";
import Button from "../../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

export default function ProjectTools({ projectid }) {
  const navigate = useNavigate();

  const openeditor = async () => {
    try {
      await api.get(`/openeditor/${projectid}`);
      navigate(`/latexeditor/${projectid}`);
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  return (
    <div className="flex justify-between p-4 px-8 bg-gray-100">
      <div className="flex items-center gap-8">
        <h1>Project</h1>
        <h1>Issues</h1>
        <h1>Contribution Requests</h1>
        <h1>Approvals</h1>
      </div>
      <div className="flex gap-8">
        <Button>View PDF</Button>
        <Button onClick={openeditor} varient="primary">Open in Editor</Button>
      </div>
    </div>
  );
}
