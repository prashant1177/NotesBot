import React, { useEffect, useState, useRef } from "react";
import Recent from "../components/Recent";
import { marked } from "marked";
import { Link } from "react-router-dom";
import { FileText, Upload, Sparkles, Brain } from "lucide-react";
import { Link as LinkEmoji } from "lucide-react";
import "@tailwindcss/typography";
import "../index.css";
// Enable GitHub-flavored markdown
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
});
const Input = ({
  className = "",
  type = "text",
  placeholder = "",
  value,
  onChange,
  ...props
}) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

const Textarea = ({
  className = "",
  placeholder = "",
  value,
  onChange,
  ...props
}) => {
  return (
    <textarea
      className={`flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    lg: "h-12 px-8",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
export default function Main() {
  const [title, setTitle] = useState("");
  const [textInput, setTextInput] = useState("");
  const [file, setFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [youtubeURL, setYoutubeURL] = useState("");
  const [geminiHTML, setGeminiHTML] = useState("");
  const [youtube, setYoutube] = useState("");

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

  const handleSubmit = async () => {
    const token = localStorage.getItem("token"); // ✅ Get token here

    const formData = new FormData();

    formData.append("title", title);
    formData.append("message", textInput);
    formData.append("url", youtubeURL);
    formData.append("file", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/pdfrequest`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Make sure token is included!
          },
          body: formData,
        }
      );

      const result = await response.json();
      alert(result.message);
      console.log("Response from server:", result);
      setGeminiHTML(marked.parse(result.response)); // convert to HTML
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };
  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-6 ">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium mb-2 bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
              Create AI-Powered Notes
            </h2>
            <p className="text-muted-foreground">
              Fill in the details below and let AI generate comprehensive notes
              for you
            </p>
          </div>
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-medium">
                <FileText className="w-4 h-4 text-chart-1" />
                Note Title *
              </label>
              <Input
                placeholder="Enter the main topic or title for your notes..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-muted/30 border-border/20"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-medium">
                <FileText className="w-4 h-4 text-chart-2" />
                Description
              </label>
              <Textarea
                placeholder="Provide additional context, details, or specific aspects you'd like the AI to focus on..."
                ref={textareaRef}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="bg-muted/30 border-border/20 min-h-[100px]"
              />
            </div>
          </div>

          {youtube ? (
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-medium">
                <LinkEmoji className="w-4 h-4 text-chart-3" />
                Youtube URL
              </label>
              <Input
                type="url"
                placeholder="Add a reference URL for additional context..."
                value={youtubeURL}
                onChange={(e) => setYoutubeURL(e.target.value)}
                className="bg-muted/30 border-border/20"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-medium">
                <Upload className="w-4 h-4 text-chart-4" />
                Upload Document
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx,.txt"
                />
                <div className="flex items-center justify-between p-3 border border-border/20 rounded-md bg-muted/30 hover:bg-muted/40 transition-colors">
                  <span className="text-muted-foreground">
                    {file ? "File uploaded" : "Choose a file to upload..."}
                  </span>
                  <Upload className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          )}
          {/* Auto-growing Textarea */}
          <div className="text-center pt-2">
              <Button
    variant="outline"onClick={() => setYoutube((prev) => !prev)}>
              {youtube ? <>Upload files</> : <>Youtube URL</>}
            </Button>
          </div>
          {/* Arrow Send Icon */}
          {/* Generate Button */}
          <div className="pt-4">
            <Button
              onClick={handleSubmit}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-primary-foreground"
            >
              {isGenerating ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <Brain className="w-5 h-5 animate-pulse" />
                  Generating AI Notes...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Generate AI Notes
                </div>
              )}
            </Button>
          </div>

          {isGenerating && (
            <div className="text-center py-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted/30 border border-border/20">
                <Sparkles className="w-4 h-4 text-chart-1 mr-2 animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  AI is analyzing and generating your notes...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
