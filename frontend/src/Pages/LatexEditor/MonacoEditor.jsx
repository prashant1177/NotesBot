import { Editor } from "@monaco-editor/react";
export default function MonacoEditor({ latex, setLatex }) {
  // runs before the editor mounts
  function handleBeforeMount(monaco) {
    // Register LaTeX language
    monaco.languages.register({ id: "latex" });

    // Tokenizer (basic LaTeX syntax highlighting)
    monaco.languages.setMonarchTokensProvider("latex", {
      tokenizer: {
        root: [
          [/%.*/, "comment"], // comments
          [/\\[a-zA-Z]+/, "keyword"], // commands
          [/\$[^$]*\$/, "string"], // inline math
          [/{[^}]*}/, "variable"], // braces
        ],
      },
    });

    // Custom theme
    monaco.editor.defineTheme("latexTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A9955", fontStyle: "italic" },
        { token: "keyword", foreground: "569CD6", fontStyle: "bold" },
        { token: "string", foreground: "CE9178" },
        { token: "variable", foreground: "9CDCFE" },
      ],
      colors: {
        "editor.background": "#030712", // Tailwind gray-950
        "editor.foreground": "#FFFFFF", // text color
        "editorLineNumber.foreground": "#6B7280", // Tailwind gray-500 for line numbers
        "editorCursor.foreground": "#FBBF24", // Tailwind amber-400 for cursor
        "editor.selectionBackground": "#1F2937", // Tailwind gray-800 for selection
        "editor.lineHighlightBackground": "#111827", // Tailwind gray-900 highlight
        "editorGutter.background": "#030712", // gutter matches background
      },
    });
  }

  // runs after the editor mounts
  function handleEditorMount(editor, monaco) {
    monaco.editor.setTheme("latexTheme");
  }
  return (
    <Editor
      height="100%"
      defaultLanguage="latex"
      value={latex}
      onChange={setLatex}
      beforeMount={handleBeforeMount}
      onMount={handleEditorMount}
      options={{
        minimap: { enabled: false }, // 🚀 disables the mini-map
      }}
    />
  );
}
