import React, { useState, useRef, useEffect } from "react";
import { Copy, Search, X } from "lucide-react";

const MathSymbolsEditor = ({ editorRef }) => {
  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedSymbol, setCopiedSymbol] = useState("");
  
  const symbols = {
    "Basic Arithmetic & Relations": [
      { symbol: "+", latex: "+", description: "Plus" },
      { symbol: "−", latex: "-", description: "Minus" },
      { symbol: "±", latex: "\\pm", description: "Plus-minus" },
      { symbol: "×", latex: "\\times", description: "Times" },
      { symbol: "÷", latex: "\\div", description: "Division" },
      { symbol: "=", latex: "=", description: "Equal" },
      { symbol: "≠", latex: "\\neq", description: "Not equal" },
      { symbol: "≈", latex: "\\approx", description: "Approximately" },
      { symbol: "≡", latex: "\\equiv", description: "Equivalent" },
      { symbol: "<", latex: "<", description: "Less than" },
      { symbol: "≤", latex: "\\leq", description: "Less than or equal" },
      { symbol: ">", latex: ">", description: "Greater than" },
      { symbol: "≥", latex: "\\geq", description: "Greater than or equal" },
      { symbol: "≪", latex: "\\ll", description: "Much less than" },
      { symbol: "≫", latex: "\\gg", description: "Much greater than" },
      { symbol: "∝", latex: "\\propto", description: "Proportional to" },
      { symbol: "∼", latex: "\\sim", description: "Similar to" },
    ],
    "Set Theory & Logic": [
      { symbol: "∈", latex: "\\in", description: "Element of" },
      { symbol: "∉", latex: "\\notin", description: "Not element of" },
      { symbol: "∋", latex: "\\ni", description: "Contains" },
      { symbol: "∅", latex: "\\emptyset", description: "Empty set" },
      { symbol: "⊂", latex: "\\subset", description: "Subset" },
      { symbol: "⊆", latex: "\\subseteq", description: "Subset or equal" },
      { symbol: "⊄", latex: "\\nsubseteq", description: "Not subset" },
      { symbol: "⊃", latex: "\\supset", description: "Superset" },
      { symbol: "⊇", latex: "\\supseteq", description: "Superset or equal" },
      { symbol: "⊅", latex: "\\nsupseteq", description: "Not superset" },
      { symbol: "∪", latex: "\\cup", description: "Union" },
      { symbol: "∩", latex: "\\cap", description: "Intersection" },
      { symbol: "⊕", latex: "\\oplus", description: "Direct sum" },
      { symbol: "⊗", latex: "\\otimes", description: "Tensor product" },
      { symbol: "∧", latex: "\\wedge", description: "Logical and" },
      { symbol: "∨", latex: "\\vee", description: "Logical or" },
      { symbol: "¬", latex: "\\neg", description: "Not" },
      { symbol: "⇒", latex: "\\Rightarrow", description: "Implies" },
      { symbol: "⇔", latex: "\\Leftrightarrow", description: "If and only if" },
      { symbol: "→", latex: "\\to", description: "Maps to" },
      { symbol: "←", latex: "\\leftarrow", description: "Left arrow" },
    ],
    "Greek Letters": [
      { symbol: "α", latex: "\\alpha", description: "Alpha" },
      { symbol: "Α", latex: "A", description: "Alpha (uppercase)" },
      { symbol: "β", latex: "\\beta", description: "Beta" },
      { symbol: "Β", latex: "B", description: "Beta (uppercase)" },
      { symbol: "γ", latex: "\\gamma", description: "Gamma" },
      { symbol: "Γ", latex: "\\Gamma", description: "Gamma (uppercase)" },
      { symbol: "δ", latex: "\\delta", description: "Delta" },
      { symbol: "Δ", latex: "\\Delta", description: "Delta (uppercase)" },
      { symbol: "ε", latex: "\\epsilon", description: "Epsilon" },
      { symbol: "Ε", latex: "E", description: "Epsilon (uppercase)" },
      { symbol: "ζ", latex: "\\zeta", description: "Zeta" },
      { symbol: "Ζ", latex: "Z", description: "Zeta (uppercase)" },
      { symbol: "η", latex: "\\eta", description: "Eta" },
      { symbol: "Η", latex: "H", description: "Eta (uppercase)" },
      { symbol: "θ", latex: "\\theta", description: "Theta" },
      { symbol: "Θ", latex: "\\Theta", description: "Theta (uppercase)" },
      { symbol: "ι", latex: "\\iota", description: "Iota" },
      { symbol: "Ι", latex: "I", description: "Iota (uppercase)" },
      { symbol: "κ", latex: "\\kappa", description: "Kappa" },
      { symbol: "Κ", latex: "K", description: "Kappa (uppercase)" },
      { symbol: "λ", latex: "\\lambda", description: "Lambda" },
      { symbol: "Λ", latex: "\\Lambda", description: "Lambda (uppercase)" },
      { symbol: "μ", latex: "\\mu", description: "Mu" },
      { symbol: "Μ", latex: "M", description: "Mu (uppercase)" },
      { symbol: "ν", latex: "\\nu", description: "Nu" },
      { symbol: "Ν", latex: "N", description: "Nu (uppercase)" },
      { symbol: "ξ", latex: "\\xi", description: "Xi" },
      { symbol: "Ξ", latex: "\\Xi", description: "Xi (uppercase)" },
      { symbol: "ο", latex: "o", description: "Omicron" },
      { symbol: "Ο", latex: "O", description: "Omicron (uppercase)" },
      { symbol: "π", latex: "\\pi", description: "Pi" },
      { symbol: "Π", latex: "\\Pi", description: "Pi (uppercase)" },
      { symbol: "ρ", latex: "\\rho", description: "Rho" },
      { symbol: "Ρ", latex: "P", description: "Rho (uppercase)" },
      { symbol: "σ", latex: "\\sigma", description: "Sigma" },
      { symbol: "Σ", latex: "\\Sigma", description: "Sigma (uppercase)" },
      { symbol: "τ", latex: "\\tau", description: "Tau" },
      { symbol: "Τ", latex: "T", description: "Tau (uppercase)" },
      { symbol: "υ", latex: "\\upsilon", description: "Upsilon" },
      { symbol: "Υ", latex: "\\Upsilon", description: "Upsilon (uppercase)" },
      { symbol: "φ", latex: "\\phi", description: "Phi" },
      { symbol: "Φ", latex: "\\Phi", description: "Phi (uppercase)" },
      { symbol: "χ", latex: "\\chi", description: "Chi" },
      { symbol: "Χ", latex: "X", description: "Chi (uppercase)" },
      { symbol: "ψ", latex: "\\psi", description: "Psi" },
      { symbol: "Ψ", latex: "\\Psi", description: "Psi (uppercase)" },
      { symbol: "ω", latex: "\\omega", description: "Omega" },
      { symbol: "Ω", latex: "\\Omega", description: "Omega (uppercase)" },
    ],
    "Calculus Symbols": [
      { symbol: "∂", latex: "\\partial", description: "Partial derivative" },
      { symbol: "∇", latex: "\\nabla", description: "Nabla/gradient" },
      { symbol: "∫", latex: "\\int", description: "Integral" },
      { symbol: "∬", latex: "\\iint", description: "Double integral" },
      { symbol: "∭", latex: "\\iiint", description: "Triple integral" },
      { symbol: "∮", latex: "\\oint", description: "Contour integral" },
      { symbol: "lim", latex: "\\lim", description: "Limit" },
      { symbol: "∞", latex: "\\infty", description: "Infinity" },
      { symbol: "d", latex: "\\mathrm{d}", description: "Differential" },
    ],
    Arrows: [
      { symbol: "↑", latex: "\\uparrow", description: "Up arrow" },
      { symbol: "↓", latex: "\\downarrow", description: "Down arrow" },
      {
        symbol: "↔",
        latex: "\\leftrightarrow",
        description: "Left-right arrow",
      },
      { symbol: "⇒", latex: "\\Rightarrow", description: "Right double arrow" },
      { symbol: "⇐", latex: "\\Leftarrow", description: "Left double arrow" },
      {
        symbol: "⇔",
        latex: "\\Leftrightarrow",
        description: "Left-right double arrow",
      },
      { symbol: "↦", latex: "\\mapsto", description: "Maps to" },
      { symbol: "⇑", latex: "\\Uparrow", description: "Up double arrow" },
      { symbol: "⇓", latex: "\\Downarrow", description: "Down double arrow" },
      {
        symbol: "⇕",
        latex: "\\Updownarrow",
        description: "Up-down double arrow",
      },
    ],
    "Delimiters & Brackets": [
      { symbol: "(", latex: "(", description: "Left parenthesis" },
      { symbol: ")", latex: ")", description: "Right parenthesis" },
      { symbol: "[", latex: "[", description: "Left bracket" },
      { symbol: "]", latex: "]", description: "Right bracket" },
      { symbol: "{", latex: "\\{", description: "Left brace" },
      { symbol: "}", latex: "\\}", description: "Right brace" },
      { symbol: "|", latex: "|", description: "Vertical bar" },
      { symbol: "⌈", latex: "\\lceil", description: "Left ceiling" },
      { symbol: "⌉", latex: "\\rceil", description: "Right ceiling" },
      { symbol: "⌊", latex: "\\lfloor", description: "Left floor" },
      { symbol: "⌋", latex: "\\rfloor", description: "Right floor" },
      { symbol: "⟨", latex: "\\langle", description: "Left angle bracket" },
      { symbol: "⟩", latex: "\\rangle", description: "Right angle bracket" },
    ],
    Miscellaneous: [
      { symbol: "∴", latex: "\\therefore", description: "Therefore" },
      { symbol: "∵", latex: "\\because", description: "Because" },
      { symbol: "°", latex: "^\\circ", description: "Degree" },
      { symbol: "′", latex: "^\\prime", description: "Prime" },
      { symbol: "″", latex: "^{\\prime\\prime}", description: "Double prime" },
      {
        symbol: "‴",
        latex: "^{\\prime\\prime\\prime}",
        description: "Triple prime",
      },
      { symbol: "∗", latex: "*", description: "Asterisk operator" },
      { symbol: "…", latex: "\\dots", description: "Ellipsis" },
      { symbol: "⋯", latex: "\\cdots", description: "Center dots" },
      { symbol: "⋮", latex: "\\vdots", description: "Vertical dots" },
      { symbol: "⋱", latex: "\\ddots", description: "Diagonal dots" },
      { symbol: "♠", latex: "\\spadesuit", description: "Spade suit" },
      { symbol: "♣", latex: "\\clubsuit", description: "Club suit" },
      { symbol: "♥", latex: "\\heartsuit", description: "Heart suit" },
      { symbol: "♦", latex: "\\diamondsuit", description: "Diamond suit" },
    ],
  };

  const insertSymbol = (symbol) => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = editor.getSelection();
    const model = editor.getModel();
    if (!selection || !model) return;

    const selectedText = model.getValueInRange(selection);
    const textToInsert = selectedText || symbol;

    editor.executeEdits("", [
      {
        range: selection,
        text: textToInsert,
        forceMoveMarkers: true,
      },
    ]);

    // Move cursor after inserted symbol
    const position = editor.getPosition();
    editor.setPosition({
      lineNumber: position.lineNumber,
      column: position.column + symbol.length,
    });

    editor.focus();
  };

  const copyToClipboard = (latex) => {
    navigator.clipboard.writeText(latex).then(() => {
      setCopiedSymbol(latex);
      setTimeout(() => setCopiedSymbol(""), 2000);
    });
  };

  const filteredSymbols = () => {
    if (!searchTerm) return symbols;

    const filtered = {};
    Object.keys(symbols).forEach((category) => {
      const matchingSymbols = symbols[category].filter(
        (item) =>
          item.symbol.includes(searchTerm) ||
          item.latex.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingSymbols.length > 0) {
        filtered[category] = matchingSymbols;
      }
    });
    return filtered;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white overflow-auto flex flex-col h-full">
      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search symbols, LaTeX commands, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Symbol Categories */}
      <div className="grid gap-6 ">
        {Object.entries(filteredSymbols()).map(([category, symbolList]) => (
          <div key={category} className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
              {symbolList.map((item, index) => (
                <div key={index} className="group relative">
                  <button
                    onClick={() => insertSymbol(item.latex)}
                    className="w-12 h-12 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 flex items-center justify-center text-xl font-medium shadow-sm hover:shadow-md"
                    title={`${item.description} (${item.latex})`}
                  >
                    {item.symbol}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* No results message */}
      {searchTerm && Object.keys(filteredSymbols()).length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-xl">No symbols found matching "{searchTerm}"</p>
          <p className="text-sm mt-2">
            Try searching by symbol, LaTeX command, or description
          </p>
        </div>
      )}
    </div>
  );
};

export default MathSymbolsEditor;
