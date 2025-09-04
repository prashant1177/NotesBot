import { useEffect } from "react";
import Button from "../../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

export default function ProjectTools({ projectid,setViewPdf,viewPdf }) {
  const navigate = useNavigate();

  const fork = async () => {
    const res = await api.post(`/projects/fork/${projectid}`);
    navigate(`/latexeditor/${res.data.ForkprojectId}`);
  };
  const viewContent = async () => {
    setViewPdf((prev) => !prev);
  };

  const openeditor = async () => {
    try {
      await api.get(`/openeditor/${projectid}`);
      navigate(`/latexeditor/${projectid}`);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  
  return (
    <div className="flex justify-between p-2 md:p-4 md:px-8 bg-gray-100 text-sm">
      <div className="flex items-center md:gap-8">
        <Button onClick={openeditor}>
          Open in Editor
        </Button></div>
      <div className="flex md:gap-8 gap-2">
        <Button onClick={viewContent}>{viewPdf ?"View File" : "View PDF"} </Button>
        <Button onClick={fork} varient="primary">FORK THIS</Button>
      </div>
    </div>
  );
}
