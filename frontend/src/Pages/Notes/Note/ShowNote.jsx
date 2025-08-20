import { ArrowLeft } from "lucide-react";

export default function ShowNote() {
  return (
    <div className="min-h-screen w-full flex justify-center relative">
      <div className="w-3/5 transition-colors duration-500 ease-in-out">
        <div
          className="editor p-6 outline-none min-h-screen cursor-text"
        >
          <h1>This is the title</h1>
          <p>Click anywhere and start typing like Notion ✨</p>
        </div>
      </div>
    </div>
  );
}
