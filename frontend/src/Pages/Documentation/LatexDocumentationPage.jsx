import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Search,
  FileText,
  Hash,
  ChevronLeft,
} from "lucide-react";

// Sample documentation data structure
const sampleDocumentation = [
  {
    id: "getting-started-latex",
    title: "Getting Started with LaTeX",
    content:
      "LaTeX is a high-quality typesetting system, widely used for technical and scientific documentation. Unlike word processors like Microsoft Word or Google Docs, LaTeX focuses on content rather than appearance, making it ideal for structured documents such as research papers, theses, and books.",
    sections: [
      {
        subheading: "What is LaTeX?",
        paragraph:
          "LaTeX is a document preparation system based on TeX. It allows authors to define content using plain text markup, which is then compiled into beautifully formatted documents (PDF, DVI, etc.). It is particularly popular in academia, especially for mathematics, physics, and computer science.",
      },
      {
        subheading: "Why use LaTeX vs Word/Google Docs?",
        paragraph:
          "Unlike Word or Google Docs, which rely on manual formatting, LaTeX separates content from style. This makes it easier to maintain consistency across long or complex documents. Key advantages include:",
        code: `- Professional quality typesetting\n- Superior handling of mathematical equations\n- Easy bibliography and citation management\n- Automation of table of contents, references, and indexes\n- More control for researchers and publishers`,
      },
      {
        subheading: "First Document Structure",
        paragraph:
          "A basic LaTeX document starts with a class declaration, followed by a preamble (packages, settings), then the main document body. Here is the minimal structure:",
        code: `\\documentclass{article}\n\\begin{document}\nHello, world! This is my first LaTeX document.\n\\end{document}`,
      },
    ],
  },
  {
    id: "document-structure",
    title: "Document Structure in LaTeX",
    content:
      "LaTeX documents follow a well-defined structure that makes it easy to organize content in a professional way. Understanding document classes, the preamble, title pages, sections, and page setup is essential for creating polished documents.",
    sections: [
      {
        subheading: "Document Classes",
        paragraph:
          "Every LaTeX file starts by defining a document class, which sets the overall style and layout of the document. Different classes are suited for different types of documents:",
        code: `\\documentclass{article}   % For short articles, papers, assignments\n\\documentclass{report}    % For reports or theses\n\\documentclass{book}      % For full-length books\n\\documentclass{letter}    % For writing letters\n\\documentclass{beamer}    % For creating presentations`,
      },
      {
        subheading: "The Preamble",
        paragraph:
          "The preamble is the section before \\begin{document}. Here you load packages, set document options, and define custom commands. Packages extend LaTeX functionality, for example to handle images, mathematics, or page formatting.",
        code: `\\documentclass{article}\n\n% Load packages\n\\usepackage{amsmath}     % For advanced math\n\\usepackage{graphicx}    % For including images\n\\usepackage{geometry}    % For page layout and margins\n\n% Custom settings\n\\geometry{margin=1in}`,
      },
      {
        subheading: "Title Page",
        paragraph:
          "You can create a title page using the built-in commands \\title, \\author, and \\date. The command \\maketitle generates the formatted title at the start of the document.",
        code: `\\title{My First LaTeX Document}\n\\author{Prashant Patil}\n\\date{September 2025}\n\n\\begin{document}\n\\maketitle\n\nHello, this is the introduction.\n\\end{document}`,
      },
      {
        subheading: "Sections and Hierarchy",
        paragraph:
          "LaTeX provides a structured way to organize documents into chapters, sections, and smaller subdivisions. The available commands depend on the chosen document class (e.g., \\chapter is not available in article class).",
        code: `\\part{Part Title}\n\\chapter{Chapter Title}\n\\section{Section Title}\n\\subsection{Subsection Title}\n\\subsubsection{Sub-subsection Title}\n\\paragraph{Paragraph Heading}`,
      },
      {
        subheading: "Page Setup",
        paragraph:
          "LaTeX allows fine control over page layout. You can adjust margins using the geometry package, and customize page numbering styles with \\pagenumbering.",
        code: `% Example of page setup\n\\usepackage{geometry}\n\\geometry{top=1in, bottom=1in, left=1.25in, right=1.25in}\n\n% Page numbering styles\n\\pagenumbering{arabic}   % 1, 2, 3 ...\n\\pagenumbering{roman}    % i, ii, iii ...\n\\pagenumbering{gobble}   % Suppress page numbers`,
      },
    ],
  },
  {
    id: "text-formatting",
    title: "Text Formatting in LaTeX",
    content:
      "LaTeX provides powerful commands to format text, making documents more readable and professional. You can control font styles, sizes, lists, and even handle special characters with ease.",
    sections: [
      {
        subheading: "Font Styles",
        paragraph:
          "LaTeX allows you to emphasize text using bold, italics, or underlining. These commands are useful for highlighting keywords, section titles, or important notes.",
        code: `\\textbf{This is bold text}\n\\textit{This is italic text}\n\\underline{This is underlined text}`,
      },
      {
        subheading: "Font Sizes",
        paragraph:
          "You can change the size of text in LaTeX using predefined size commands. These range from very small to very large. Size changes affect only the text enclosed within the command.",
        code: `\\tiny{Tiny text}\n\\small{Small text}\n\\large{Large text}\n\\Huge{Huge text}`,
      },
      {
        subheading: "Lists",
        paragraph:
          "LaTeX supports three main types of lists: unordered (bulleted), ordered (numbered), and descriptive. These structures help organize information clearly.",
        code: `% Unordered list\n\\begin{itemize}\n  \\item First item\n  \\item Second item\n\\end{itemize}\n\n% Ordered list\n\\begin{enumerate}\n  \\item First step\n  \\item Second step\n\\end{enumerate}\n\n% Description list\n\\begin{description}\n  \\item[Apple] A fruit that is sweet and crunchy.\n  \\item[Banana] A fruit that is soft and sweet.\n\\end{description}`,
      },
      {
        subheading: "Special Characters",
        paragraph:
          "Some characters have special meanings in LaTeX (like %, $, &, etc.) and cannot be typed directly. To display them as symbols, you must escape them with a backslash.",
        code: `\\%   % Prints a percent sign\n\\$   % Prints a dollar sign\n\\#   % Prints a hash symbol\n\\&   % Prints an ampersand`,
      },
    ],
  },
  {
    id: "mathematics",
    title: "Mathematics in LaTeX",
    content:
      "One of the main reasons LaTeX is so popular is its ability to typeset high-quality mathematical expressions. From simple equations to complex theorems, LaTeX provides powerful tools for presenting math professionally.",
    sections: [
      {
        subheading: "Inline vs Display Math",
        paragraph:
          "You can insert math in two ways: inline (within text) or display mode (separate on its own line). Inline math is enclosed in $...$, while display math is written using \\[...\\] for better visibility.",
        code: `This is inline math: $a^2 + b^2 = c^2$\n\nThis is display math:\n\\[ a^2 + b^2 = c^2 \\]`,
      },
      {
        subheading: "Common Symbols",
        paragraph:
          "LaTeX includes built-in commands for Greek letters, fractions, and square roots. These are essential for writing formulas clearly.",
        code: `\\alpha, \\beta, \\gamma, \\pi        % Greek letters\n\\frac{a}{b}                        % Fraction (a/b)\n\\sqrt{x}                           % Square root\n\\sqrt[n]{x}                        % n-th root`,
      },
      {
        subheading: "Exponents and Subscripts",
        paragraph:
          "Superscripts (exponents) are written using the caret ^, and subscripts use the underscore _. Curly braces { } group multiple characters together.",
        code: `x^2          % x squared\na_{ij}       % a with subscript i and j\nx^{10}       % x to the power of 10\ny_{n+1}      % subscript with expression`,
      },
      {
        subheading: "Equations",
        paragraph:
          "LaTeX can format single equations with numbering using the equation environment. For multiple equations, the align and multline environments from amsmath are very useful.",
        code: `% Numbered equation\n\\begin{equation}\nE = mc^2\n\\end{equation}\n\n% Multiple equations aligned\n\\begin{align}\na &= b + c \\\\\n  &= d + e\n\\end{align}\n\n% Long equation split across lines\n\\begin{multline}\na + b + c + d + e + f + g \\\\\n+ h + i + j + k\n\\end{multline}`,
      },
      {
        subheading: "Matrices and Cases",
        paragraph:
          "Matrices can be created with different brackets (bmatrix for square, pmatrix for round). The cases environment is useful for piecewise functions.",
        code: `% Matrix examples\n\\begin{bmatrix}\n1 & 2 \\\\\n3 & 4\n\\end{bmatrix}\n\n\\begin{pmatrix}\na & b \\\\\nc & d\n\\end{pmatrix}\n\n% Piecewise cases\nf(x) = \\begin{cases}\nx^2 & x > 0 \\\\\n0 & x \\leq 0\n\\end{cases}`,
      },
      {
        subheading: "Theorems and Proofs",
        paragraph:
          "Using the amsthm package, you can define theorem-like environments such as Theorem, Lemma, or Proof. This is very useful in academic writing.",
        code: `\\usepackage{amsthm}\n\n% Define a theorem environment\n\\newtheorem{theorem}{Theorem}\n\n\\begin{document}\n\\begin{theorem}\nIf $n$ is even, then $n^2$ is even.\n\\end{theorem}\n\n\\begin{proof}\nLet $n = 2k$. Then $n^2 = (2k)^2 = 4k^2 = 2(2k^2)$, which is even.\n\\end{proof}\n\\end{document}`,
      },
    ],
  },
  {
    id: "tables-and-figures",
    title: "Tables and Figures in LaTeX",
    content:
      "Tables and figures are essential for presenting data and illustrations in academic and professional documents. LaTeX provides environments for creating structured tables, inserting images, and referencing them consistently.",
    sections: [
      {
        subheading: "Basic Tables (tabular)",
        paragraph:
          "The tabular environment is used to create tables. You specify column alignment using l (left), c (center), and r (right). Rows are separated by \\\\, and columns by &.",
        code: `\\begin{tabular}{|c|c|c|}\n\\hline\nName & Age & Score \\\\\n\\hline\nAlice & 23 & 85 \\\\\nBob & 21 & 92 \\\\\nCharlie & 24 & 78 \\\\\n\\hline\n\\end{tabular}`,
      },
      {
        subheading: "Borders, Alignment, and Merging Cells",
        paragraph:
          "You can add borders with | in the column definition and \\hline for horizontal lines. The command \\multicolumn merges columns, while multirow requires the multirow package.",
        code: `% Merging and aligning\n\\usepackage{multirow}\n\n\\begin{tabular}{|c|c|c|}\n\\hline\nName & \\multicolumn{2}{c|}{Scores} \\\\\n\\hline\n\\multirow{2}{*}{Alice} & Math & 90 \\\\\n                        & Science & 85 \\\\\n\\hline\nBob & Math & 92 \\\\\n\\hline\n\\end{tabular}`,
      },
      {
        subheading: "Floating Tables and Figures",
        paragraph:
          "The table and figure environments allow LaTeX to place content optimally (called floating). This ensures tables and figures don’t break text flow.",
        code: `% Floating table example\n\\begin{table}[h!]\n\\centering\n\\begin{tabular}{|c|c|}\n\\hline\nItem & Price \\\\\n\\hline\nBook & $10 \\\\\nPen & $2 \\\\\n\\hline\n\\end{tabular}\n\\caption{Price List}\n\\label{tab:price}\n\\end{table}`,
      },
      {
        subheading: "Captions and Labels",
        paragraph:
          "Captions describe tables/figures, while labels allow you to reference them later with \\ref. This ensures numbering updates automatically.",
        code: `As shown in Table~\\ref{tab:price}, books are more expensive than pens.\n\n% Similar for figures\n\\begin{figure}[h!]\n\\centering\n\\includegraphics[width=0.4\\textwidth]{example-image}\n\\caption{Sample Image}\n\\label{fig:sample}\n\\end{figure}\n\nSee Figure~\\ref{fig:sample} for an example.`,
      },
      {
        subheading: "Inserting Images",
        paragraph:
          "To insert images, you need the graphicx package. You can control the size using width, height, or scaling options.",
        code: `\\usepackage{graphicx}\n\n% Insert image\n\\begin{figure}[h!]\n\\centering\n\\includegraphics[width=0.6\\textwidth]{myimage.png}\n\\caption{An example image}\n\\label{fig:myimage}\n\\end{figure}`,
      },
    ],
  },
  {
    id: "cross-referencing",
    title: "Cross-Referencing in LaTeX",
    content:
      "Cross-referencing is one of LaTeXs strongest features. It lets you link sections, equations, tables, and figures consistently. When the numbering changes, references update automatically. With the hyperref package, you can even create clickable links in PDFs.",
    sections: [
      {
        subheading: "Labels and References",
        paragraph:
          "The \\label command assigns a unique identifier to sections, figures, tables, or equations. You can then use \\ref to reference the number and \\pageref to reference the page number where it appears.",
        code: "% Example with section reference\n\\section{Introduction}\n\\label{sec:intro}\n\nAs discussed in Section~\\ref{sec:intro} on page~\\pageref{sec:intro}, LaTeX makes referencing easy.",
      },
      {
        subheading: "Hyperlinks with hyperref",
        paragraph:
          "The hyperref package turns references and citations into clickable links in the PDF. It also adds support for external URLs and email links.",
        code: "\\usepackage{hyperref}\n\nClick here for \\href{https://www.latexwriter.com}{LaTeX Project}. \n\nEmail me at \\href{mailto:example@email.com}{example@email.com}.",
      },
      {
        subheading: "Customizing Links",
        paragraph:
          "You can customize link colors and set PDF metadata using hyperref options. This makes your document more professional and reader-friendly.",
        code: "\\usepackage[colorlinks=true, linkcolor=blue, citecolor=red, urlcolor=magenta]{hyperref}\n\n% Set PDF metadata\n\\hypersetup{\n  pdftitle={My LaTeX Document},\n  pdfauthor={Prashant Patil},\n  pdfsubject={LaTeX Documentation},\n  pdfkeywords={LaTeX, cross-referencing, hyperref}\n}",
      },
    ],
  },
  {
    id: "bibliography-citations",
    title: "Bibliography and Citations in LaTeX",
    content:
      "Citations and bibliographies are essential for academic and research writing. LaTeX provides multiple ways to manage references: manually, with BibTeX, or with BibLaTeX+Biber. Reference managers like Zotero or Mendeley can make the process even easier.",
    sections: [
      {
        subheading: "Manual Bibliography (thebibliography)",
        paragraph:
          "The simplest way to add references is with the thebibliography environment. Each reference is defined manually with a citation key. This approach is fine for short documents but not recommended for large projects.",
        code: `\\begin{thebibliography}{9}\n\n\\bibitem{einstein} A. Einstein, \\textit{Relativity: The Special and the General Theory}, 1920.\n\n\\bibitem{knuth} D. Knuth, \\textit{The TeXbook}, Addison-Wesley, 1984.\n\n\\end{thebibliography}\n\nAs explained by Einstein~\\cite{einstein}, relativity changed physics.`,
      },
      {
        subheading: "BibTeX Basics",
        paragraph:
          "BibTeX is the classic way to manage references in LaTeX. References are stored in a separate .bib file, and LaTeX automatically formats them according to the chosen bibliography style.",
        code: `% In your LaTeX file\n\\bibliographystyle{plain}\n\\bibliography{references}\n\n% In references.bib\n@book{knuth1984,\n  author    = {Donald E. Knuth},\n  title     = {The TeXbook},\n  year      = {1984},\n  publisher = {Addison-Wesley}\n}`,
      },
      {
        subheading: "Citation Styles",
        paragraph:
          "BibTeX supports different bibliography styles for formatting references. Some common ones include:",
        code: `plain   % Default numeric citations\nieee    % IEEE style (numbered)\napa     % APA style (author-year)\nacm     % ACM reference style\nabbrv   % Abbreviated author names`,
      },
      {
        subheading: "Using Citations with BibTeX",
        paragraph:
          "In your document, use \\cite{key} to reference an entry from your .bib file. The style is controlled by \\bibliographystyle, and the bibliography list is generated by \\bibliography.",
        code: `Einstein’s theory is foundational~\\cite{einstein1905}.\n\n% At the end of the document\n\\bibliographystyle{ieee}\n\\bibliography{references}`,
      },
      {
        subheading: "BibLaTeX + Biber (Modern Approach)",
        paragraph:
          "BibLaTeX is a modern alternative to BibTeX, offering more flexibility and advanced citation styles. It works with the Biber backend and is now preferred for most academic work.",
        code: `\\usepackage[backend=biber, style=apa]{biblatex}\n\\addbibresource{references.bib}\n\nEinstein’s paper~\\cite{einstein1905} is groundbreaking.\n\n% At the end of the document\n\\printbibliography`,
      },
      {
        subheading: "Managing References with Zotero/Mendeley",
        paragraph:
          "Reference managers like Zotero and Mendeley help collect, organize, and export bibliographic data. You can export your library as a .bib file and use it directly in LaTeX, making reference management seamless.",
        code: `% Example workflow:\n1. Collect references in Zotero/Mendeley.\n2. Export library as references.bib.\n3. Add references.bib to your project.\n4. Use \\cite{key} in your LaTeX file.\n5. Compile with BibTeX or Biber.`,
      },
    ],
  },
  {
    id: "packages-formatting",
    title: "Packages for Formatting in LaTeX",
    content:
      "LaTeX packages extend the core functionality and give you more control over formatting. Some commonly used packages help with page layout, headers, colors, section styling, and list customization.",
    sections: [
      {
        subheading: "geometry – Page Layout",
        paragraph:
          "The geometry package allows you to adjust page margins, paper size, and overall layout with simple commands. It is much easier than manually tweaking dimensions.",
        code: `\\usepackage[a4paper, margin=1in]{geometry}\n\n% Custom margins\n\\geometry{top=2cm, bottom=2.5cm, left=3cm, right=3cm}`,
      },
      {
        subheading: "fancyhdr – Headers & Footers",
        paragraph:
          "The fancyhdr package provides control over headers and footers. You can add custom text, page numbers, or even images like logos.",
        code: `\\usepackage{fancyhdr}\n\\pagestyle{fancy}\n\n% Clear defaults\n\\fancyhead{}\n\\fancyfoot{}\n\n% Custom header and footer\n\\fancyhead[L]{My Document}\n\\fancyhead[R]{\\today}\n\\fancyfoot[C]{\\thepage}`,
      },
      {
        subheading: "titlesec – Custom Section Formatting",
        paragraph:
          "The titlesec package lets you change how section titles look. You can modify font, size, spacing, and alignment of section headings.",
        code: `\\usepackage{titlesec}\n\n% Change section style\n\\titleformat{\\section}{\\Large\\bfseries\\color{blue}}{\\thesection}{1em}{}`,
      },
      {
        subheading: "xcolor – Colors",
        paragraph:
          "The xcolor package provides predefined and custom colors for text, tables, and backgrounds. It is often used with other packages like tcolorbox or beamer.",
        code: `\\usepackage{xcolor}\n\n% Apply colors\n\\textcolor{red}{This text is red.}\n\\colorbox{yellow}{Highlighted text}\n\n% Define custom colors\n\\definecolor{myblue}{RGB}{30, 60, 200}\n\\textcolor{myblue}{Custom Blue}`,
      },
      {
        subheading: "tcolorbox – Colored Boxes",
        paragraph:
          "The tcolorbox package creates colored boxes that are useful for highlighting notes, examples, or theorems. It supports borders, shading, and titles.",
        code: `\\usepackage{tcolorbox}\n\n\\begin{tcolorbox}[colback=blue!5!white, colframe=blue!75!black, title=Example]\nThis is a highlighted example inside a colored box.\n\\end{tcolorbox}`,
      },
      {
        subheading: "enumitem – Advanced List Formatting",
        paragraph:
          "The enumitem package allows customization of list environments like itemize, enumerate, and description. You can control spacing, numbering, and labels.",
        code: `\\usepackage{enumitem}\n\n% Custom bullet points\n\\begin{itemize}[label=\\textbullet, left=1cm]\n  \\item First item\n  \\item Second item\n\\end{itemize}\n\n% Custom numbering style\n\\begin{enumerate}[label=Step~\\arabic*:, wide=0pt]\n  \\item Install LaTeX\n  \\item Write document\n\\end{enumerate}`,
      },
    ],
  },
  {
    id: "advanced-math-science",
    title: "Advanced Math & Science Writing in LaTeX",
    content:
      "For academic and scientific documents, LaTeX provides powerful packages for mathematics, physics, chemistry, and technical diagrams. These tools ensure professional-quality formatting and make complex notation easier to manage.",
    sections: [
      {
        subheading: "AMS Packages (amsmath, amssymb, mathtools)",
        paragraph:
          "The American Mathematical Society (AMS) provides essential packages for advanced mathematics. amsmath improves equation formatting, amssymb adds extra mathematical symbols, and mathtools extends amsmath with additional features like aligned equations and fixing spacing issues.",
        code: `\\usepackage{amsmath, amssymb, mathtools}\n\n% Examples:\n% Split equation across lines\n\\begin{align}\na + b &= c + d \\\\\n      &= e + f\n\\end{align}\n\n% Using extra symbols\n\\mathbb{R}, \\mathbb{N}, \\leqslant, \\geqslant`,
      },
      {
        subheading: "Physics Symbols (physics package)",
        paragraph:
          "The physics package simplifies writing common physics notations such as derivatives, vectors, bras and kets (quantum mechanics), and operators. It saves time and ensures consistency.",
        code: `\\usepackage{physics}\n\n% Derivatives\n\\dv{y}{x}, \\pdv{f}{x}\n\n% Vectors\n\\vec{E}, \\vb{F}\n\n% Quantum notation\n\\bra{\\psi}, \\ket{\\phi}, \\braket{\\psi}{\\phi}`,
      },
      {
        subheading: "Chemical Formulas (mhchem)",
        paragraph:
          "The mhchem package is designed for chemistry. It allows you to typeset chemical reactions, molecular formulas, and isotopes easily without worrying about formatting.",
        code: `\\usepackage{mhchem}\n\n% Chemical formulas\n\\ce{H2O}, \\ce{CO2}, \\ce{NaCl}\n\n% Chemical reactions\n\\ce{2H2 + O2 -> 2H2O}\n\n% Isotopes\n\\ce{^{14}C}`,
      },
      {
        subheading: "Units (siunitx)",
        paragraph:
          "The siunitx package standardizes the formatting of physical quantities and SI units. It ensures that numbers and units are consistently styled across the document. It also handles spacing and unit alignment automatically.",
        code: `\\usepackage{siunitx}\n\n% Numbers with units\n\\SI{9.81}{m/s^2}\n\\SI{3e8}{m/s}\n\n% Tables with units\n\\begin{tabular}{c c}\nQuantity & Value \\\\\n\\hline\nSpeed of light & \\SI{3e8}{m/s} \\\\\nGravitational acceleration & \\SI{9.81}{m/s^2} \\\\\n\\end{tabular}`,
      },
      {
        subheading: "TikZ & PGFPlots for Diagrams and Plots",
        paragraph:
          "TikZ is a powerful drawing package for creating diagrams, flowcharts, and geometric figures directly within LaTeX. PGFPlots builds on TikZ to produce high-quality plots of mathematical functions and scientific data.",
        code: `\\usepackage{tikz}\n\\usetikzlibrary{arrows}\n\n% Simple diagram\n\\begin{tikzpicture}\n  \\draw[->] (0,0) -- (3,0) node[right]{x};\n  \\draw[->] (0,0) -- (0,3) node[above]{y};\n  \\draw (0,0) -- (2,2);\n\\end{tikzpicture}\n\n\\usepackage{pgfplots}\n\\begin{tikzpicture}\n  \\begin{axis}[\n    xlabel=$x$, ylabel={$f(x)$},\n    grid=both\n  ]\n  \\addplot[smooth, domain=-2:2]{x^2};\n  \\end{axis}\n\\end{tikzpicture}`,
      },
    ],
  },
  {
    id: "beamer-presentations",
    title: "Presentations with Beamer",
    content:
      "The Beamer document class allows you to create professional slide presentations directly in LaTeX. It supports themes, colors, overlays, animations, and integration with graphics, tables, and math.",
    sections: [
      {
        subheading: "Beamer Document Class",
        paragraph:
          "To start a presentation, use the beamer document class instead of article or report. Beamer automatically sets up slides with proper formatting. You can also define a title, author, and date.",
        code: `\\documentclass{beamer}\n\n\\title{My Presentation}\n\\author{Prashant Patil}\n\\date{\\\\today}\n\n\\begin{document}\n\\frame{\\titlepage}\n\\end{document}`,
      },
      {
        subheading: "Frames",
        paragraph:
          "Slides in Beamer are called frames. Each frame is created with the frame environment. You can include text, lists, images, equations, and more inside frames.",
        code: `\\begin{frame}{Introduction}\n  Welcome to my presentation! \\\\\n  \\begin{itemize}\n    \\item Point 1\n    \\item Point 2\n    \\item Point 3\n  \\end{itemize}\n\\end{frame}`,
      },
      {
        subheading: "Themes & Color Schemes",
        paragraph:
          "Beamer comes with built-in themes for layout and color schemes for styling. You can combine them for a professional look. Examples include Madrid, Warsaw, Berlin, and CambridgeUS.",
        code: `\\usetheme{Madrid}\n\\usecolortheme{dolphin}\n\n% Example slide with theme\n\\begin{frame}{Styled Slide}\n  This slide uses the Madrid theme and dolphin color scheme.\n\\end{frame}`,
      },
      {
        subheading: "Overlays & Animations",
        paragraph:
          "Overlays allow you to reveal content step by step. You can use \\pause to display list items gradually or overlay specifications like <1-> for finer control.",
        code: `\\begin{frame}{Step-by-Step}\n  \\begin{itemize}\n    \\item First point \\pause\n    \\item Second point \\pause\n    \\item Third point\n  \\end{itemize}\n\n  % Using overlays\n  \\begin{enumerate}\n    \\item<1-> Visible from slide 1\n    \\item<2-> Visible from slide 2\n  \\end{enumerate}\n\\end{frame}`,
      },
      {
        subheading: "Including Graphics, Tables, and Math",
        paragraph:
          "Beamer integrates smoothly with figures, tables, and mathematical notation. You can use the same environments as in LaTeX documents.",
        code: `\\begin{frame}{Math & Graphics}\n  % Equation\n  The quadratic formula: \\\\\n  \\[ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\]\n\n  % Image\n  \\includegraphics[width=0.5\\textwidth]{example-image}\n\n  % Table\n  \\begin{tabular}{l c}\n    Quantity & Value \\\\\n    \\hline\n    Speed of light & $3 \\times 10^8$ m/s \\\\\n    Gravity & 9.81 m/s$^2$ \\\\\n  \\end{tabular}\n\\end{frame}`,
      },
    ],
  },
  {
    id: "customizations",
    title: "Customizations in LaTeX",
    content:
      "LaTeX is highly customizable. You can define your own commands, create custom environments, or even modify existing commands. This flexibility allows you to streamline repetitive tasks, enhance readability, and design unique layouts.",
    sections: [
      {
        subheading: "Defining New Commands",
        paragraph:
          "The \\newcommand macro lets you create shortcuts for frequently used expressions or formatting. You can also define arguments to make them more flexible.",
        code: `% Simple new command\n\\newcommand{\\R}{\\mathbb{R}} % Shortcut for real numbers\n\n% Command with arguments\n\\newcommand{\\vect}[1]{\\mathbf{#1}}\n\n% Usage\nLet $x \\in \\R$ and $\\vect{v}$ be a vector.`,
      },
      {
        subheading: "Creating Custom Environments",
        paragraph:
          "With \\newenvironment, you can create new environments for structuring repeated content. These can be used for examples, notes, or custom blocks.",
        code: `% Define environment\n\\newenvironment{note}{\\begin{quote}\\itshape}{\\end{quote}}\n\n% Usage\n\\begin{note}\nThis is a custom note environment.\n\\end{note}`,
      },
      {
        subheading: "Redefining Commands",
        paragraph:
          "The \\renewcommand macro allows you to redefine existing LaTeX commands. Use it carefully to avoid conflicts with package-defined commands.",
        code: `% Change the appearance of section titles\n\\renewcommand{\\thesection}{\\Roman{section}}\n\n% Sections will now be numbered I, II, III...`,
      },
      {
        subheading: "Custom Title Pages",
        paragraph:
          "Instead of using the default \\maketitle, you can design your own title page with text, images, and formatting for a personalized look.",
        code: `\\begin{titlepage}\n  \\centering\n  {\\Huge\\bfseries My Project Report \\\\[1cm]}\n  {\\Large Prashant Patil \\\\[0.5cm]}\n  {\\large \\today}\n\n  \\vfill\n  {\\includegraphics[width=0.3\\textwidth]{logo.png}}\n\\end{titlepage}`,
      },
      {
        subheading: "Multi-Column Layout",
        paragraph:
          "The multicol package allows you to create text in multiple columns, similar to newspapers. You can specify the number of columns and LaTeX will handle the layout.",
        code: `\\usepackage{multicol}\n\n\\begin{multicols}{2}\nThis text is in the first column. \nWhen it reaches the end of the page, it continues in the second column automatically.\n\\end{multicols}`,
      },
    ],
  },
  {
    id: "large-projects",
    title: "Working with Large Projects",
    content:
      "When writing large documents like theses, books, or research papers, LaTeX provides tools to manage structure, references, indexes, and glossaries. These features help keep the document organized and easy to navigate.",
    sections: [
      {
        subheading: "Splitting Documents",
        paragraph:
          "Instead of writing everything in one file, you can split a large project into smaller files for each chapter or section. Use \\input for lightweight inclusion and \\include for larger sections (which also allows selective compilation with \\includeonly).",
        code: `% Main file: main.tex\n\\documentclass{report}\n\n\\begin{document}\n\\include{chapters/introduction}\n\\include{chapters/methodology}\n\\include{chapters/results}\n\\end{document}\n\n% File: chapters/introduction.tex\n\\chapter{Introduction}\nThis is the introduction.`,
      },
      {
        subheading: "Table of Contents",
        paragraph:
          "LaTeX can automatically generate a table of contents (TOC) based on sectioning commands. You simply insert \\tableofcontents where you want it to appear.",
        code: `\\begin{document}\n\\tableofcontents\n\\chapter{Introduction}\n\\section{Background}\n\\section{Motivation}\n\\chapter{Conclusion}\n\\end{document}`,
      },
      {
        subheading: "List of Figures and Tables",
        paragraph:
          "Similar to the TOC, you can generate a list of figures and a list of tables automatically. Captions are used to create entries in these lists.",
        code: `\\begin{document}\n\\listoffigures\n\\listoftables\n\n\\begin{figure}[h]\n  \\centering\n  \\includegraphics[width=0.5\\textwidth]{example-image}\n  \\caption{An example figure}\n\\end{figure}\n\n\\begin{table}[h]\n  \\centering\n  \\begin{tabular}{c c}\n    A & B \\\\\n    1 & 2 \\\\\n  \\end{tabular}\n  \\caption{An example table}\n\\end{table}\n\\end{document}`,
      },
      {
        subheading: "Index Creation",
        paragraph:
          "An index helps readers quickly locate topics. To use indexing, load the makeidx package, mark entries with \\index, and generate the index with \\printindex. You will need to run `makeindex` as an extra compilation step.",
        code: `\\usepackage{makeidx}\n\\makeindex\n\n\\begin{document}\nThis is a sample text.\\index{sample}\nAnother word to index.\\index{word}\n\n\\printindex\n\\end{document}`,
      },
      {
        subheading: "Glossaries",
        paragraph:
          "The glossaries package lets you define terms and acronyms, and automatically generate a glossary section. Like indexing, it requires extra compilation (using `makeglossaries`).",
        code: `\\usepackage[acronym]{glossaries}\n\\makeglossaries\n\n% Define entries\n\\newglossaryentry{latex}{name=LaTeX, description={A typesetting system for high-quality documents}}\n\\newacronym{api}{API}{Application Programming Interface}\n\n\\begin{document}\nWe use \\gls{latex} for documentation. The \\gls{api} is important for developers.\n\n\\printglossaries\n\\end{document}`,
      },
    ],
  },
  {
    id: "graphics-design",
    title: "Graphics and Advanced Design",
    content:
      "LaTeX is not just for text—it also supports powerful tools for creating diagrams, flowcharts, plots, and even including external documents. Packages like TikZ, PGFPlots, and pdfpages make LaTeX a complete design environment for technical and scientific documents.",
    sections: [
      {
        subheading: "Drawing Diagrams with TikZ",
        paragraph:
          "The TikZ package allows you to draw high-quality vector graphics directly in LaTeX. You can create shapes, arrows, and custom diagrams. It integrates perfectly with LaTeX math and text.",
        code: `\\usepackage{tikz}\n\n\\begin{document}\n\\begin{tikzpicture}\n  \\draw (0,0) -- (2,0) -- (2,2) -- (0,2) -- cycle; % Square\n  \\draw[->, thick] (0,0) -- (2,2); % Diagonal arrow\n  \\node at (1,1) {Center};\n\\end{tikzpicture}\n\\end{document}`,
      },
      {
        subheading: "Flowcharts, Graphs, and Mind Maps",
        paragraph:
          "TikZ libraries (such as positioning, arrows, and mindmap) allow you to draw flowcharts, network graphs, and even mind maps. These are especially useful for presentations and research documentation.",
        code: `\\usetikzlibrary{arrows.meta, positioning, mindmap}\n\n% Example Flowchart\n\\begin{tikzpicture}[node distance=2cm, every node/.style={rectangle, draw, rounded corners}]\n  \\node (start) {Start};\n  \\node[right of=start] (process) {Process};\n  \\node[right of=process] (end) {End};\n  \\draw[->] (start) -- (process);\n  \\draw[->] (process) -- (end);\n\\end{tikzpicture}`,
      },
      {
        subheading: "PGFPlots for Mathematical Plots",
        paragraph:
          "PGFPlots builds on TikZ to create high-quality scientific plots. You can draw functions, bar charts, 3D plots, and more with publication-ready precision.",
        code: `\\usepackage{pgfplots}\n\\pgfplotsset{compat=1.18}\n\n\\begin{document}\n\\begin{tikzpicture}\n  \\begin{axis}[\n    xlabel=$x$, ylabel={$f(x)$},\n    grid=both\n  ]\n    \\addplot[blue, thick] {sin(deg(x))};\n    \\addplot[red, dashed] {cos(deg(x))};\n    \\legend{sin(x), cos(x)}\n  \\end{axis}\n\\end{tikzpicture}\n\\end{document}`,
      },
      {
        subheading: "Including External PDFs",
        paragraph:
          "Sometimes you want to insert entire PDF pages (like research papers, certificates, or figures) into your LaTeX project. The pdfpages package makes this simple.",
        code: `\\usepackage{pdfpages}\n\n\\begin{document}\n% Insert a single page\n\\includepdf[pages=1]{sample.pdf}\n\n% Insert multiple pages\n\\includepdf[pages=1-3]{chapter.pdf}\n\\end{document}`,
      },
    ],
  },
  {
    id: "articles-reports-thesis",
    title: "Writing Articles, Reports & Thesis",
    content:
      "LaTeX is widely used for academic and professional writing. It offers ready-to-use templates for journals, conference papers, and university theses. With LaTeX, you can meet strict formatting requirements for margins, citations, and document structure.",
    sections: [
      {
        subheading: "IEEE/ACM Journal Templates",
        paragraph:
          "Many publishers like IEEE and ACM provide official LaTeX templates for submissions. These templates ensure your paper meets strict formatting requirements for fonts, spacing, citations, and references.",
        code: `% Example IEEE template\n\\documentclass[conference]{IEEEtran}\n\\begin{document}\n\\title{My Research Paper}\n\\author{Prashant Patil}\n\\maketitle\n\n\\begin{abstract}\nThis is the abstract section.\n\\end{abstract}\n\n\\section{Introduction}\nYour introduction goes here.\n\\end{document}`,
      },
      {
        subheading: "University Thesis Templates",
        paragraph:
          "Most universities provide LaTeX templates for theses and dissertations. These usually define margins, chapter structure, bibliography style, and sometimes even title page formatting. Always check your university guidelines.",
        code: `% Example thesis setup\n\\documentclass[12pt]{report}\n\\usepackage{geometry}\n\\geometry{a4paper, margin=1in}\n\n\\begin{document}\n\\title{My Thesis Title}\n\\author{Prashant Patil}\n\\date{\\today}\n\\maketitle\n\n\\chapter{Introduction}\nThis is the first chapter.\n\\end{document}`,
      },
      {
        subheading: "Formatting Requirements",
        paragraph:
          "Academic institutions and publishers often require specific formatting rules. These include margin sizes, line spacing, citation styles (APA, IEEE, ACM), and bibliography formats. Packages like geometry, setspace, and biblatex are commonly used to meet these requirements.",
        code: `% Margins and spacing\n\\usepackage{geometry}\n\\geometry{margin=1in}\n\n\\usepackage{setspace}\n\\doublespacing\n\n% APA citations with biblatex\n\\usepackage[style=apa]{biblatex}\n\\addbibresource{references.bib}`,
      },
      {
        subheading: "Cover Page, Acknowledgments & Appendices",
        paragraph:
          "LaTeX supports custom front matter and back matter. You can design cover pages, add acknowledgments, and include appendices for supplementary material.",
        code: `% Custom cover page\n\\begin{titlepage}\n  \\centering\n  {\\Huge Thesis Title \\\\[1cm]}\n  {\\Large Author: Prashant Patil \\\\[0.5cm]}\n  {\\large Supervisor: Dr. XYZ \\\\[1cm]}\n  {\\today}\n\\end{titlepage}\n\n% Acknowledgments\n\\chapter*{Acknowledgments}\nI would like to thank...\n\n% Appendices\n\\appendix\n\\chapter{Survey Questions}\nHere are the survey details...`,
      },
    ],
  },

  {
    id: "latexwriter-effects",
    title: " LaTeXWriter Effects – Enhancing the Writing Experience",
    content:
      "LaTeXWriter Effects are designed to make writing in LaTeX smoother, faster, and more interactive. Instead of waiting for full compilation, users can benefit from live previews, intelligent cross-referencing, and debugging assistance. These effects help both beginners and advanced users create professional documents with ease.",
    sections: [
      {
        subheading: "Instant Formatting Preview",
        paragraph:
          "Normally, LaTeX requires compilation to see how equations, tables, or references look. With LaTeXWriter Effects, you get live previews of equations, symbols, and document sections as you type. This reduces compile-test cycles and saves valuable time.",
      },
      {
        subheading: "Smart Cross-Referencing",
        paragraph:
          "LaTeXWriter Effects highlight references and allow you to hover over them to see what they point to. This prevents broken references and improves navigation in large documents.",
      },
      {
        subheading: "Interactive Bibliography Management",
        paragraph:
          "Instead of switching between .bib files and your document, LaTeXWriter integrates references directly. You can search citations from Zotero, Mendeley, or BibTeX and insert them with one click. Citation styles (IEEE, APA, ACM) can be previewed before compiling.",
      },
      {
        subheading: "Error Highlighting & Suggestions",
        paragraph:
          "Errors in LaTeX like 'Missing }' or 'Undefined control sequence' can be cryptic. LaTeXWriter Effects shows errors inline with explanations and possible fixes, similar to how coding IDEs highlight mistakes.",
      },
      {
        subheading: "Enhanced Visual Design",
        paragraph:
          "Effects allow for theming (light/dark mode, syntax highlighting). Code blocks like equations, tables, and TikZ diagrams are color-coded for readability. This improves focus and reduces eye strain during long sessions.",
      },
    ],
  },
];

const LatexDocumentationPage = ({ documentation = sampleDocumentation }) => {const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState(
    documentation[0]?.id || "" // show first one by default
  );

  // Filter docs
  const filteredDocs = documentation.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.sections?.some(
        (section) =>
          section.subheading
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          section.paragraph?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const activeIndex = filteredDocs.findIndex((d) => d.id === activeSection);
  const prevDoc = activeIndex > 0 ? filteredDocs[activeIndex - 1] : null;
  const nextDoc =
    activeIndex < filteredDocs.length - 1
      ? filteredDocs[activeIndex + 1]
      : null;

  // Render code block
  const renderCode = (code) =>
    code && (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mt-3">
        <code>{code}</code>
      </pre>
    );

  // Render subsections
  const renderSubsections = (subsections) =>
    subsections && (
      <div className="ml-6 space-y-3">
        {subsections.map((sub, i) => (
          <div key={i} className="border-l-2 border-gray-200 pl-4">
            <h5 className="font-semibold text-gray-800">{sub.name}</h5>
            <p className="text-gray-600 text-sm mt-1">{sub.description}</p>
            {sub.parameters && (
              <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                <span className="font-medium">Parameters:</span>{" "}
                {sub.parameters}
              </div>
            )}
            {sub.solution && (
              <div className="mt-2 p-2 bg-green-50 border-l-4 border-green-400 rounded text-sm">
                <span className="font-medium text-green-800">Solution:</span>
                <p className="text-green-700 mt-1">{sub.solution}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );

  // Render active section
  const renderActiveSection = () => {
    const doc = filteredDocs.find((d) => d.id === activeSection);
    if (!doc) return null;

    return (
      <div id={doc.id} className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <FileText className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">{doc.title}</h2>
        </div>
        <p className="text-gray-700 mb-6">{doc.content}</p>

        {doc.sections?.map((section, index) => (
          <div key={index} className="mb-6 border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {section.subheading}
            </h3>
            <p className="text-gray-700 mb-3">{section.paragraph}</p>
            {renderCode(section.code)}
            {renderSubsections(section.subsections)}
          </div>
        ))}

        {/* Prev/Next Navigation */}
        <div className="flex justify-between mt-8">
          {prevDoc ? (
            <button
              onClick={() => setActiveSection(prevDoc.id)}
              className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              {prevDoc.title}
            </button>
          ) : (
            <span />
          )}
          {nextDoc && (
            <button
              onClick={() => setActiveSection(nextDoc.id)}
              className="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700"
            >
              {nextDoc.title}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Latex Documentation
          </h1>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-1/4 bg-white p-4 rounded-lg shadow-md h-fit">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Table of Contents
          </h2>
          <nav className="flex flex-col gap-2">
            {filteredDocs.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setActiveSection(doc.id)}
                className={`text-left p-2 rounded-lg transition-colors ${
                  activeSection === doc.id
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                {doc.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="md:w-3/4">{renderActiveSection()}</main>
      </div>
    </div>
  );
};

export default LatexDocumentationPage;
