import logo from "../assets/logo1.png";
import React, { useEffect, useState, useRef } from "react";

export default function Main() {
  const [message, setMessage] = useState("");
  const [textInput, setTextInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("Custom");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [textInput]);

  useEffect(() => {
    const text = "What's on your mind...";
    let index = -1;

    const typeInterval = setInterval(() => {
      index += 1;
      if (index >= text.length) {
        clearInterval(typeInterval);
        return;
      }

      setMessage((prev) => {
        const newMsg = prev + text.charAt(index);
        return newMsg;
      });
    }, 80);

    return () => clearInterval(typeInterval);
  }, []);
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("message", textInput);
    formData.append("file", file);
    formData.append("selectedOption", selectedOption);

    try {
      const response = await fetch("http://localhost:5000/sendrequest", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      alert(result.message);
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };
  return (
    <main className="container max-w-4xl mx-auto flex justify-center items-center py-20">
      <div className="bg-white/50 backdrop-blur-lg p-10 rounded-2xl shadow-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{message}</h1>

        <div className="flex flex-col items-center bg-white rounded-lg  shadow-sm w-full">
          <div className="w-full flex items-center bg-white rounded-lg  ps-2">
            {/* Upload Icon with Tooltip */}
            <div className="text-purple-900 px-2 py-2 h-full">
              <input
                type="file"
                id="fileInput1"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileInput1"
                className="relative group inline-block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-file-earmark-break-fill cursor-pointer"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V9H2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM2 12h12v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM.5 10a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1z" />
                </svg>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2  bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-normal  text-center z-10">
                  Upload PDF
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 mt-[-4px]" />
                </div>
              </label>
            </div>

            {/* Auto-growing Textarea */}
            <textarea
              ref={textareaRef}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your message..."
              rows={1}
              className="w-full px-2 py-4 text-gray-800 bg-transparent resize-none overflow-hidden outline-none border-none focus:outline-none focus:border-none focus:ring-0"
            />

            {/* Arrow Send Icon */}
            <div className="flex items-center bg-purple-900 text-white px-6 py-3 h-full rounded-tr-lg">
              <button onClick={handleSubmit}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-arrow-right-circle-fill w-8 cursor-pointer"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between w-full bg-purple-100 px-4 py-2">
            <div className="flex flex-wrap justify-center gap-4">
              {["Summary", "Questions", "Bullets", "Organize", "Custom"].map(
                (label) => (
                  <div key={label}>
                    <input
                      type="radio"
                      name="option"
                      value={label}
                      id={label}
                      checked={selectedOption === label}
                      onChange={() => setSelectedOption(label)}
                      className="hidden peer"
                    />
                    <label
                      htmlFor={label}
                      className="peer-checked:bg-purple-600 peer-checked:text-white inline-flex items-center px-5 py-2 border border-purple-500 rounded-full text-purple-700 cursor-pointer hover:bg-purple-500 transition-colors duration-150"
                    >
                      {label}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
