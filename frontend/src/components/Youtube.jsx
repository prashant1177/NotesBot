import React, { useEffect, useState, useRef } from "react";
import Recent from "./Recent";
import { marked } from "marked";
import "@tailwindcss/typography";
import "../index.css";
// Enable GitHub-flavored markdown
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
});

export default function Youtube() {
  const [message, setMessage] = useState("");
  const [textInput, setTextInput] = useState("");
  const [geminiHTML, setGeminiHTML] = useState("");


  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [textInput]);

  useEffect(() => {
    const text = "Copy Youtube URL to generate notes...";
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
  const token = localStorage.getItem("token");
  const url = textInput.trim();

  if (!url.includes("youtube.com/watch") && !url.includes("youtu.be")) {
    alert("Please enter a valid YouTube URL");
    return;
  }

  const formData = new FormData();
  formData.append("url", url);
console.log("Base API URL is:", import.meta.VITE_API_URL);
  try {
    const response = await fetch(`${import.meta.VITE_API_URL}/ytrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Something went wrong");
      return;
    }

    if (result.response) {
      setGeminiHTML(marked.parse(result.response));
    } else {
      setGeminiHTML("<p>No notes generated.</p>");
    }
  } catch (err) {
    console.error("Error submitting:", err);
    alert("An error occurred while submitting. Check console.");
  }
};

  return (
    <div className="container mx-auto flex flex-col items-center px-24">
      <main className=" flex flex-col justify-between w-full mx-auto px-2 py-6 my-16">
        <div className="bg-white/50 backdrop-blur-lg py-8 px-8 rounded-2xl shadow-md w-full text-center my-auto">
          {geminiHTML ? (
            <div className="prose max-w-none text-left">
              <div dangerouslySetInnerHTML={{ __html: geminiHTML }} />
            </div>
          ) : (
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{message}</h1>
          )}
          <div className="sticky bottom-4 z-20 mt-8 rounded-lg shadow-2xl shadow-white">
            <div className="flex flex-col items-center bg-white rounded-lg  shadow-sm w-full ">
              <div className="w-full flex items-center bg-white rounded-lg  ps-2  inset-ring">
                {/* Upload Icon with Tooltip */}

                {/* Auto-growing Textarea */}
                <textarea
                  ref={textareaRef}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste Youtube URL here..."
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
            </div>
          </div>
        </div>
      </main>
      <Recent />
    </div>
  );
}
