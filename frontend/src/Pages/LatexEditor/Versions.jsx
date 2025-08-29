import { useEffect, useState } from "react";
import api from "../../api";

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

  return (
    <div>
      {" "}
      {versions?.map((version, i) => (
       <div key={i}>
        <h1>{version.message}</h1>
        <h1>{version.createdAt}</h1>
        </div>
      ))}
    </div>
  );
}
