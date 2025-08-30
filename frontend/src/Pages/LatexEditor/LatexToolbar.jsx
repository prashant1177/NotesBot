import {
  Bold,
  Italic,
  Underline,
  Type,
  Link,
  Hash,
  Image,
  Table,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  FileText,
  Sigma,
  Pi,
  ChevronDown,
} from "lucide-react";
import React, { useState } from "react";

// Toolbar Component
export default function LaTeXToolbar({ editorRef }) {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const insertCommand = (before, after = "", placeholder = "") => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = editor.getSelection();
    const selectedText = editor.getModel().getValueInRange(selection);
    const textToInsert = selectedText || placeholder;

    const newText = before + textToInsert + after;

    editor.executeEdits("", [
      {
        range: selection,
        text: newText,
        forceMoveMarkers: true,
      },
    ]);

    // Position cursor inside placeholder if no selection
    if (!selectedText && placeholder) {
      const position = editor.getPosition();
      const newPosition = {
        lineNumber: position.lineNumber,
        column: position.column - after.length - placeholder.length,
      };
      editor.setPosition(newPosition);
      editor.setSelection({
        startLineNumber: newPosition.lineNumber,
        startColumn: newPosition.column,
        endLineNumber: newPosition.lineNumber,
        endColumn: newPosition.column + placeholder.length,
      });
    }

    editor.focus();
  };

  const toolGroups = [
    {
      name: "Text Formatting",
      tools: [
        {
          icon: Bold,
          label: "Bold",
          action: () => insertCommand("\\textbf{", "}", "text"),
        },
        {
          icon: Italic,
          label: "Italic",
          action: () => insertCommand("\\textit{", "}", "text"),
        },
        {
          icon: Underline,
          label: "Underline",
          action: () => insertCommand("\\underline{", "}", "text"),
        },
        {
          icon: Type,
          label: "Typewriter",
          action: () => insertCommand("\\texttt{", "}", "text"),
        },
      ],
    },
    // 🚨 removed "Math" group completely
    {
      name: "Structure",
      dropdown: true,
      icon: FileText,
      label: "Sections",
      items: [
        {
          label: "Chapter",
          action: () => insertCommand("\\chapter{", "}", "Chapter Title"),
        },
        {
          label: "Section",
          action: () => insertCommand("\\section{", "}", "Section Title"),
        },
        {
          label: "Subsection",
          action: () => insertCommand("\\subsection{", "}", "Subsection Title"),
        },
        {
          label: "Subsubsection",
          action: () =>
            insertCommand("\\subsubsection{", "}", "Subsubsection Title"),
        },
        {
          label: "Paragraph",
          action: () => insertCommand("\\paragraph{", "}", "Paragraph Title"),
        },
      ],
    },
    {
      name: "References",
      tools: [
        {
          icon: Link,
          label: "Link",
          action: () =>
            insertCommand("\\href{", "}{link text}", "https://example.com"),
        },
        {
          icon: Hash,
          label: "Cross Reference",
          action: () => insertCommand("\\ref{", "}", "label"),
        },
        {
          icon: Quote,
          label: "Citation",
          action: () => insertCommand("\\cite{", "}", "reference"),
        },
      ],
    },
    {
      name: "Objects",
      tools: [
        {
          icon: Image,
          label: "Figure",
          action: () =>
            insertCommand(
              "\\begin{figure}\\centering\n\\includegraphics[width=0.8\\textwidth]{image.png}\n\\caption{Caption}\n\\label{fig:label}\n",
              "\\end{figure}"
            ),
        },
        {
          icon: Table,
          label: "Table",
          action: () =>
            insertCommand(
              "\\begin{table}\\centering\n\\begin{tabular}{|c|c|c|}\\hline\nA & B & C \\\\\n\\hline\n1 & 2 & 3 \\\\\n\\hline\n\\end{tabular}\n\\caption{Table Caption}\n\\label{tab:label}\n",
              "\\end{table}"
            ),
        },
      ],
    },{
      name: "Math Symbols",
      dropdown: true,
      icon: Sigma,
      items: [
        {
          label: "Inline Math",
          icon: Sigma,
          action: () => insertCommand("$", "$", "x^2"),
        },
        {
          label: "Display Math",
          icon: Pi,
          action: () =>
            insertCommand(
              "\\[",
              "\\]",
              "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"
            ),
        },
        {
          label: "Fraction",
          action: () => insertCommand("\\frac{", "}{denominator}", "numerator"),
        },
        {
          label: "Square Root",
          action: () => insertCommand("\\sqrt{", "}", "x"),
        },
        {
          label: "Sum",
          action: () => insertCommand("\\sum_{", "}^{n}", "i=1"),
        },
        {
          label: "Integral",
          action: () => insertCommand("\\int_{", "}^{b} f(x) dx", "a"),
        },
        {
          label: "Limit",
          action: () => insertCommand("\\lim_{", "} ", "x \\to \\infty"),
        },
        {
          label: "Partial",
          action: () =>
            insertCommand("\\frac{\\partial ", "}{\\partial x}", "f"),
        },
        {
          label: "Binomial",
          action: () => insertCommand("\\binom{", "}{k}", "n"),
        },
        { label: "Vector", action: () => insertCommand("\\vec{", "}", "v") },
      ],
    },
   
    {
      name: "Alignment",
      dropdown: true,
      icon: AlignLeft,
      items: [
        {
          label: "Align Left",
          action: () =>
            insertCommand(
              "\\begin{flushleft}\n",
              "\n\\end{flushleft}",
              "Left aligned text"
            ),
        },
        {
          label: "Center",
          action: () =>
            insertCommand(
              "\\begin{center}\n",
              "\n\\end{center}",
              "Centered text"
            ),
        },
        {
          label: "Align Right",
          action: () =>
            insertCommand(
              "\\begin{flushright}\n",
              "\n\\end{flushright}",
              "Right aligned text"
            ),
        },
        {
          label: "Justify",
          action: () => insertCommand("\\justifying ", "", "Justified text"),
        },
      ],
    }, {
      name: "Lists",
      tools: [
        {
          icon: List,
          label: "Bullet List",
          action: () =>
            insertCommand(
              "\\begin{itemize}\n\\item First item\n\\item Second item\n\\item Third item\n",
              "\\end{itemize}"
            ),
        },
        {
          icon: ListOrdered,
          label: "Numbered List",
          action: () =>
            insertCommand(
              "\\begin{enumerate}\n\\item First item\n\\item Second item\n\\item Third item\n",
              "\\end{enumerate}"
            ),
        },
      ],
    },
    
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
      {toolGroups.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {group.dropdown ? (
            <div className="relative">
              <button
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() =>
                  setDropdownOpen(
                    dropdownOpen === group.name ? null : group.name
                  )
                }
              >
                <group.icon className="w-4 h-4" />
                <span>{group.label}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {dropdownOpen === group.name && (
                <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  {group.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      onClick={() => {
                        item.action();
                        setDropdownOpen(null);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            group.tools.map((tool, toolIndex) => {
              const Icon = tool.icon;
              return (
                <button
                  key={toolIndex}
                  className="p-1.5 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title={tool.label}
                  onClick={tool.action}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })
          )}
          {groupIndex < toolGroups.length - 1 && (
            <div className="w-px h-6 bg-gray-300 mx-1" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
