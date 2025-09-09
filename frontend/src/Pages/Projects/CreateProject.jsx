import { useState } from "react";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import TextArea from "../../ui/Input/TextArea";
import { useNavigate } from "react-router-dom";
import api from "../../api";
export default function CreateProject() {
  const [title, setTitle] = useState(""); // title state
  const [about, setAbout] = useState(""); // title state
  const [topics, setTopics] = useState(""); // content state
  const [privatMark, setPrivateMark] = useState(false); // content state

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const Project = {
        title: title,
        about: about,
        topics: topics,
        privatMark: privatMark,
      };
      const res = await api.post("/projects/create", Project);
      const ProjectID = res.data.id;
      navigate(`/latexeditor/${ProjectID}`);
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
        if (err.response.data.requiredpremium) {
          navigate(`/pricing`);
        }
      }
      console.error("Failed to save note:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center  w-full p-4 sm:p-6">
      <div className="w-full max-w-2xl lg:w-3/6 flex flex-col space-y-6 sm:space-y-8 p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 mt-8 sm:mt-12 lg:mt-16 ">
        <div className="text-center">
           <h1 className="text-gray-800 text-2xl sm:text-3xl font-medium  gap-2 py-2 uppercase">
          {" "}
            Create New Project
            </h1>
            
          <div className="w-16 h-1 bg-blue-300 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label className="text-gray-900 block text-sm font-medium">
              Title
            </label>
            <Input
              disabled={loading}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              varient="transparent"
              maxLength={70}
              className="transition-all duration-200 focus:scale-[1.02]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-900 block text-sm font-medium">
              About (Optional)
            </label>
            <TextArea
              disabled={loading}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              varient="transparent"
              className="transition-all duration-200 focus:scale-[1.01] min-h-[100px] sm:min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-900 block text-sm font-medium">
              Topics (Optional)
            </label>
            <Input
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              varient="transparent"
              placeholder="Add relevant topics separated with commas"
              className="transition-all duration-200 focus:scale-[1.02]"
              type="text"
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 pt-4 border-t border-white/10">
          <div className="flex items-center space-x-3 order-2 sm:order-1">
            <label className="text-gray-900 text-sm font-medium cursor-pointer select-none">
              Make it private
            </label>
            <div className="relative">
              <input
                type="checkbox"
                onChange={() => setPrivateMark(!privatMark)}
                disabled={loading}
                className="h-5 w-5 text-blue-600 border-2 border-gray-300 rounded-md focus:ring-blue-500 focus:ring-2 transition-all duration-200 cursor-pointer hover:border-blue-400"
              />
            </div>
          </div>

          <div className="order-1 sm:order-2">
            <Button
              disabled={loading}
              onClick={handleSave}
              className="w-full sm:w-auto px-8 py-2.5 transition-all duration-200 hover:scale-105 active:scale-95 "
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Just a moment…
                </div>
              ) : (
                <div className="flex items-center gap-2">Create Project</div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
