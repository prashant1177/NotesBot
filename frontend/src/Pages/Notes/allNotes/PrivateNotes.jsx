import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/Card/Card";
import api from "../../../api";

export default function PublicNotes() {
  const [notes, setNotes] = useState([]); // title state
  useEffect(() => {
    async function fetchData() {
      const res = await api.get(`/PrivateNotes`);
      console.log(res.data.notes);
      setNotes(res.data.notes);
    }
    fetchData();
  }, []);
  return (
    <div className="mt-8 flex flex-col items-center min-h-screen w-full p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 col-span-4">
        Private Notes
        </h1>
    <div className="mx-48 grid grid-cols-4 gap-4 h-64 ">
      {notes.map((note) => (
        <Card key={note._id}>
          <CardHeader className="overflow-hidden">
            <CardTitle>{note.title}</CardTitle>
            <CardDescription >{note.content.substring(0, 250)}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div></div>
  );
}
