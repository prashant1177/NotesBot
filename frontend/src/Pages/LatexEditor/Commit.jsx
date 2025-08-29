import { useState } from "react";
import api from "../../api";
import TextArea from "../../ui/Input/TextArea";
import Button from "../../ui/Button/Button";

export default function Commit({projectid}){
      const [message, setMessage] = useState("");
    
 const commitChanges = async () => {
  console.log("Called")
    await api.post(`/versions/commit/${projectid}`, {
      message,
    });
  console.log("No changes")
  };
    return(
        <div className="p-8">    
          <label className="text-gray-900 block mb-2 text-sm font-medium mt-4">
            Enter Message To Commit
          </label>
            <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            varient="transparent"
          />
          <Button onClick={commitChanges}>Commit Changes</Button>
        </div>
    )
}