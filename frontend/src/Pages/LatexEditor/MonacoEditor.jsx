import { useRef } from "react";
import { Editor } from "@monaco-editor/react";
import LaTeXToolbar from "./LatexToolbar";

// Enhanced Monaco Editor Component with Toolbar
export default function MonacoEditor({
  latex,
  setLatex,
  handleEditorMount,
  editorRef,
  fetch,
}) {
  function handleBeforeMount(monaco) {
    monaco.languages.register({ id: "latex" });
    monaco.languages.setMonarchTokensProvider("latex", {
      tokenizer: {
        root: [
          [/%.*/, "comment"],
          [/\\[a-zA-Z]+/, "keyword"],
          [/\$[^$]*\$/, "string"],
          [/{[^}]*}/, "identifier"],
        ],
      },
    });

    monaco.editor.defineTheme("latexThemeOverleaf", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "008000", fontStyle: "italic" },
        { token: "keyword", foreground: "0000CC", fontStyle: "bold" },
        { token: "string", foreground: "AA5500" },
        { token: "identifier", foreground: "000000" },
      ],
      colors: {
        "editor.background": "#FFFFFF",
        "editor.foreground": "#000000",
        "editorLineNumber.foreground": "#999999",
        "editorCursor.foreground": "#000000",
        "editor.selectionBackground": "#CCE5FF",
        "editor.lineHighlightBackground": "#F7F7F7",
        "editorGutter.background": "#FFFFFF",
      },
    });
  }

  return (
    <div className="flex flex-col h-full">
      <LaTeXToolbar editorRef={editorRef} />
      {fetch ? (
        <div role="status" class="space-y-2.5 animate-pulse flex-1 p-8">
          <div class="flex items-center w-full">
            <div class="h-2.5 bg-gray-100 rounded-full  w-32"></div>
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full  w-24"></div>
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full  w-full"></div>
          </div>
          <div class="flex items-center w-full max-w-[480px]">
            <div class="h-2.5 bg-gray-100 rounded-full  w-full"></div>
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full  w-full"></div>
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full  w-24"></div>
          </div>
          <div class="flex items-center w-full max-w-[400px]">
            <div class="h-2.5 bg-gray-200 rounded-full  w-full"></div>
            <div class="h-2.5 ms-2 bg-gray-100 rounded-full  w-80"></div>
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full  w-full"></div>
          </div>
          <div class="flex items-center w-full max-w-[480px]">
            <div class="h-2.5 ms-2 bg-gray-100 rounded-full  w-full"></div>
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full  w-full"></div>
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full  w-24"></div>
          </div>
          <div class="flex items-center w-full max-w-[440px]">
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full  w-32"></div>
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full  w-24"></div>
            <div class="h-2.5 ms-2 bg-gray-100 rounded-full  w-full"></div>
          </div>
          <div class="flex items-center w-full max-w-[360px]">
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full  w-full"></div>
            <div class="h-2.5 ms-2 bg-gray-100 rounded-full  w-80"></div>
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full  w-full"></div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="flex-1">
          <Editor
            height="100%"
            defaultLanguage="latex"
            value={latex}
            onChange={setLatex}
            beforeMount={handleBeforeMount}
            onMount={handleEditorMount}
            options={{
              minimap: { enabled: false },
              stickyScroll: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
      )}
    </div>
  );
}
