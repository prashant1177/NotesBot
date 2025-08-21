import { useState } from "react";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import TextArea from "../../../ui/Input/TextArea";
import { useNavigate } from "react-router-dom";
import api from "../../../api"
export default function NewNote() {
  const [title, setTitle] = useState(""); // title state
  const [about, setAbout] = useState(""); // title state
  const [privatMark, setPrivateMark] = useState(false); // content state

  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const note = {
        title: title, 
        about: about, 
        privatMark: privatMark
      };
      const res = await api.post("/newnote", note);
      const noteId = res.data.id; // MongoDB ID
      console.log("Saved Note ID:", noteId);
      navigate(`/editor/${noteId}`);
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };
  return (
    <div className="flex flex-col items-center min-h-screen w-full p-4">
      <div className="w-3/6 flex flex-col space-y-8 p-6 rounded-lg mt-32">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Create New Note
        </h1>
        <div>
          <label className="text-gray-900 block mb-2 text-sm font-medium">
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            varient="transparent"
          />
          <label className="text-gray-900 block mb-2 text-sm font-medium mt-4">
            About
          </label>
          <TextArea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            varient="transparent"
          />
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <label className="text-gray-900  mb-2 text-sm font-medium">
              Do you want make it private{" "}
            </label>
            <input
              type="checkbox"
              onClick={()=> privatMark ? setPrivateMark(fasle)  : setPrivateMark(true) }
              className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
            />
          </div>
          <Button onClick={handleSave}>Create Note</Button>
        </div>{" "}
      </div>
    </div>
  );
}
