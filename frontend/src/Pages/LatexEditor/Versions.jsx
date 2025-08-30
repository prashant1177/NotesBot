import { useEffect, useState } from "react";
import api from "../../api";
import Button from "../../ui/Button/Button";
import { GitGraph } from "lucide-react";

export default function Versions({ projectid }) {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/versions/commit/${projectid}`);
        setVersions(res.data.commits);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };
    fetchData();
  }, [projectid]);

  

    const  Retrieve = async (commitId) => {
      try {
        const res = await api.get(`/versions/retrieve/${projectid}`);
        setVersions(res.data.commits);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };
 
  return (
    <div className=" flex-1">
      <h2 className="flex items-center  gap-2 text-lg  border-b py-2 px-8 bg-gray-950 text-gray-100">
     <GitGraph size={20}/>  Saved Commit History
      </h2>

      {versions?.map((version, i) => {
        const date = new Date(version.createdAt).toLocaleString(); // clean date
        return (
          <div key={i} className="border-b-1 border-gray-400 py-4 px-8">
            <div className="flex justify-between items-center">
              <div>
              <h1 className="text-lg font-semibold text-gray-800">{version.message}</h1>
              
            <h1 className="text-sm text-gray-400">Saved At: {date}</h1></div>
              <Button
                varient="outline"
                onClick={() => Retrieve(version._id)}
              >
                Restore
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
